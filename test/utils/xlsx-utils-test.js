'use strict';

const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');
const _ = require('lodash');
const XlsxParser = require('../../src/utils/xlsx-utils');

const getXlsxAsBinaryString = (filename) => {
	let templateBuffer = fs.readFileSync(filename);
	const data = new Uint8Array(templateBuffer);
	return data.reduce((result, c) => (result + String.fromCharCode(c)), '');
};

let bstr;
const lruHeader = ['control', 'ata', 'cmm', 'serialNumber', 'tsn', 'csn', 'tso', 'cso'];
const getExpectedResult = () => ({
	Accessories: [{
		control: '1',
		ata: '2',
		cmm: '3',
		serialNumber: '4',
		tsn: '5',
		csn: '6',
		tso: '7',
		cso: '8'
	}, {
		control: 'a',
		ata: 'b',
		cmm: 'c',
		serialNumber: 'd',
		tsn: 'e',
		csn: 'f',
		tso: 'g',
		cso: 'h'
	}]
});

describe('xlsx-parser', () => {
	describe('convertArrayBufferToBString', () => {
		it('should return null if argument is not type Buffer', () => {
			const arrayBuffer = [1, 2, 3];
			const data = XlsxParser.convertArrayBufferToBString(arrayBuffer);
			expect(data).to.equal(null);
		});

		it('should convert array buffer to binary string', () => {
			const arrayBuffer = new Buffer([1, 2, 3]);
			const data = XlsxParser.convertArrayBufferToBString(arrayBuffer);
			expect(data).to.equal('\u0001\u0002\u0003');
		});
	});

	describe('convertUint8ArrayToBString', () => {
		it('should return null if argument is not type Uint8Array', () => {
			const uint8array = [4, 5, 6];
			const data = XlsxParser.convertUint8ArrayToBString(uint8array);
			expect(data).to.equal(null);
		});

		it('should convert Uint8Array to binary string', () => {
			const uint8array = new Uint8Array([4, 5, 6]);
			const data = XlsxParser.convertUint8ArrayToBString(uint8array);
			expect(data).to.equal('\u0004\u0005\u0006');
		});
	});

	describe('parseToJson', () => {
		before(() => {
			bstr = getXlsxAsBinaryString('test/test-inputs/LRU+Upload+Template.xlsx');
		});

		it('should return plain object', () => {
			const data = XlsxParser.parseToJson(bstr, lruHeader);
			expect(_.isPlainObject(data)).to.equal(true);
		});

		it('should return an object of sheets', () => {
			const data = XlsxParser.parseToJson(bstr, lruHeader);
			expect(data).to.deep.equal(getExpectedResult());
		});

		it('should ignore the extra headers', () => {
			const header = [...lruHeader, 'some', 'other', 'header'];
			const data = XlsxParser.parseToJson(bstr, header);
			expect(data).to.deep.equal(getExpectedResult());
		});

		it('should ignore extra columns', () => {
			const data = XlsxParser.parseToJson(bstr, ['control', 'ata', 'cmm']);
			expect(data).to.deep.equal({
				Accessories: [{
					control: '1',
					ata: '2',
					cmm: '3'
				}, {
					control: 'a',
					ata: 'b',
					cmm: 'c'
				}]
			});
		});

		it('should combined all sheets', () => {
			const filename = 'test/test-inputs/LRU+Upload+Template+Multi+Sheets.xlsx';
			const bstr = getXlsxAsBinaryString(filename);
			const data = XlsxParser.parseToJson(bstr, lruHeader);
			const expectedResult = Object.assign({}, getExpectedResult(), {
				Sheet1: [{
					control: '11',
					ata: '22',
					cmm: '33',
					serialNumber: '44',
					tsn: '55',
					csn: '66',
					tso: '77',
					cso: '88'
				}]
			});
			expect(data).to.deep.equal(expectedResult);
		});

		it('should combined all sheets including one with lesser column', () => {
			const filename = 'test/test-inputs/LRU+Upload+Template+Multi+Sheets+2.xlsx';
			const bstr = getXlsxAsBinaryString(filename);
			const data = XlsxParser.parseToJson(bstr, lruHeader);
			const expectedResult = Object.assign({}, getExpectedResult(), {
				Sheet1: [{
					control: 'some',
					ata: 'other',
					cmm: 'data'
				}]
			});
			expect(data).to.deep.equal(expectedResult);
		});

		it('should throw an error if file type is not supported', () => {
			const filename = 'test/test-inputs/invalid.xlsx';
			const bstr = getXlsxAsBinaryString(filename);
			const fn = () => {
				XlsxParser.parseToJson(bstr, lruHeader);
			};
			expect(fn).to.throw('Unsupported file');
		});

		it('should use the original header if it is not specified', () => {
			const data = XlsxParser.parseToJson(bstr);
			expect(data).to.deep.equal({
				Accessories: [{
					'Control/ Accessory': '1',
					ATA: '2',
					'CMM\r\n(required)': '3',
					'S/N': '4',
					TSN: '5',
					CSN: '6',
					TSO: '7',
					CSO: '8'
				}, {
					'Control/ Accessory': 'a',
					ATA: 'b',
					'CMM\r\n(required)': 'c',
					'S/N': 'd',
					TSN: 'e',
					CSN: 'f',
					TSO: 'g',
					CSO: 'h'
				}]
			});
		});

		it('should use the more specific headers if defined', () => {
			const headerObj = {
				Accessories: lruHeader,
				Sheet1: ['some', 'other', 'column']
			};
			const filename = 'test/test-inputs/LRU+Upload+Template+Multi+Sheets.xlsx';
			const bstr = getXlsxAsBinaryString(filename);
			const data = XlsxParser.parseToJson(bstr, [], headerObj);
			const expectedResult = Object.assign({}, getExpectedResult(), {
				Sheet1: [{
					some: '11',
					other: '22',
					column: '33'
				}]
			});
			expect(data).to.deep.equal(expectedResult);
		});

		it('should use the default header if the sheet is not defined in ' +
			'the more specific headers', () => {
			const headerObj = {
				Sheet1: ['some', 'other', 'column']
			};
			const filename = 'test/test-inputs/LRU+Upload+Template+Multi+Sheets.xlsx';
			const bstr = getXlsxAsBinaryString(filename);
			const data = XlsxParser.parseToJson(bstr, lruHeader, headerObj);
			const expectedResult = Object.assign({}, getExpectedResult(), {
				Sheet1: [{
					some: '11',
					other: '22',
					column: '33'
				}]
			});
			expect(data).to.deep.equal(expectedResult);
		});
	});
});
