'use strict';

const xlsx = require('xlsx');

/**
 * @class XlsxUtils
 */
class XlsxUtils {
	/**
	 * Method to convert array buffer to binary string
	 * @param arrayBuffer
	 * @returns {String} bstr
	 */
	static convertArrayBufferToBString(arrayBuffer) {
		if (!(arrayBuffer instanceof Buffer)) {
			return null;
		}

		const data = new Uint8Array(arrayBuffer);
		return this.convertUint8ArrayToBString(data);
	}

	/**
	 * Method to convert Uint8Array to binary string
	 * @param uint8array
	 * @returns {String} bstr
	 */
	static convertUint8ArrayToBString(uint8array) {
		if (!(uint8array instanceof Uint8Array)) {
			return null;
		}

		return uint8array.reduce((result, c) => (result + String.fromCharCode(c)), '');
	}

	/**
	 * Method to parse xlsx binary string to array
	 * @param {String} bstr - The converted xlsx file in binary string format
	 * @param {Array} defaultHeader - The expected header to be seen. This will affect all sheets.
	 *                                For more specific configuration, use headerObj.
	 *                                If empty array or null, we'll use the original header
	 * @param {Object} headerObj - More specific header for each sheets.
	 *                             Fall back to defaultHeader if not specified
	 * @returns {Array} data - An array of objects
	 */
	static parseToJson(bstr, defaultHeader = [], headerObj = {}) {
		try {
			const workbook = xlsx.read(bstr, { type: 'binary' });

			const defaultOptions = (defaultHeader && defaultHeader.length)
				? { header: defaultHeader, range: 1 } : {};

			let data = {};
			workbook.SheetNames.forEach(name => {
				const header = headerObj[name];
				const options = (header && header.length) ? { header, range: 1 } : defaultOptions;

				// merge all sheets
				data[name] = xlsx.utils.sheet_to_json(workbook.Sheets[name], options)
					.filter(o => delete o.undefined);
			});
			return data;
		} catch (e) {
			throw new Error('Unsupported file');
		}
	}
}

module.exports = XlsxUtils;
