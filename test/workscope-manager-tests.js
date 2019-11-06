'use strict';

const request = require('supertest');
const chai = require('chai');
const sinon = require('sinon');
const bPromise = require('bluebird');
const app = require('./mocked-app');
const dbQueries = require('../src/database-queries');
const wsManager = require('../src/workscope-manager');

const expect = chai.expect;
var tracker = require('mock-knex').getTracker();

describe('Workscope Manager', () => {
	beforeEach(() => {
		tracker.install();
	});

	afterEach(() => {
		tracker.uninstall();
	});

	describe('When queried for workscopes by workscope id', (query, step) => {
		before(() => {
			tracker.on('query', (query, step) => {
				[
					() => {
						expect(query.sql).to.equal(
							'select "workscope".* from "workscope"' +
							' where "id" = ?');
						query.response(
							[
								{
									id: '1',
									version: '1',
									esn: '123456',
									title: 'workscope title1',
									engine_details: null,
									health_instructions: {
										health: 'yay'
									},
									engine_modules: {
										family: 'GE90',
										hierarchy: {}
									},
									links: {
										data: []
									},
									maintenance_reference: {
										data: []
									},
									status: 'DRAFT',
									created_by: 'Divya',
									created_date: '2016-09-22T18:07:36.011Z',
									last_modified_by: 'Divya',
									last_modified_date: '2016-09-22T18:07:36.011Z'
								}
							]);
					},
					() => {
						expect(query.sql).to.equal(
							'select "workscope_audit".* from "workscope_audit"' +
							' where "workscope_audit"."workscope_id" in (?)');
						query.response(
							[
								{
									id: '1',
									workscope_id: '1',
									workscope_version: '1',
									user_action: 'PUT',
									modified_by: 'Ben',
									modified_date: '2016-09-22T18:07:36.060Z'
								}
							]);
					}
				][step - 1]();
			});
		});
		it('Should return workscopes associated with the id',
			(done) => {
				const expectedResponse = require('./expected-responses/workscope-by-id.json');

				request(app)
					.get('/api/v1/workscope/1')
					.set('Accept', 'application/json')
					.expect('Content-Type', /json/)
					.expect(200)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							let actualResponse = res.body;
							expect(actualResponse).to.eql(expectedResponse);
							done();
						}
					});
			}
		);
	});

	describe('When queried for workscopes by ESN', () => {
		before(() => {
			tracker.on('query', (query, step) => {
				[
					() => {
						expect(query.sql).to.equal(
							'select "workscope".* from "workscope"' +
							' where "esn" = ?');
						query.response(
							[
								{
									id: '1',
									version: '1',
									esn: '123456',
									title: 'workscope title1',
									engine_details: null,
									health_instructions: {
										health: 'yay'
									},
									engine_modules: {
										family: 'GE90',
										hierarchy: {}
									},
									links: null,
									status: 'DRAFT',
									created_by: 'Divya',
									created_date: '2016-09-22T18:07:36.011Z',
									last_modified_by: 'Divya',
									last_modified_date: '2016-09-22T18:07:36.011Z'
								}
							]);
					},
					() => {
						expect(query.sql).to.equal(
							'select "workscope_audit".* from "workscope_audit"' +
							' where "workscope_audit"."workscope_id" in (?)');
						query.response(
							[
								{
									id: '1',
									workscope_id: '1',
									workscope_version: '1',
									user_action: 'PUT',
									modified_by: 'Ben',
									modified_date: '2016-09-22T18:07:36.060Z'
								}
							]);
					}
				][step - 1]();
			});
		});
		it('Should return all wokscopes associated with the ESN',
			(done) => {
				const expectedResponse = require('./expected-responses/workscopes-by-esn.json');
				request(app)
					.get('/api/v1/workscope?esn=123456')
					.set('Accept', 'application/json')
					.expect('Content-Type', /json/)
					.expect(200)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							let actualResponse = res.body;
							expect(actualResponse).to.eql(expectedResponse);
							done();
						}
					});
			}
		);
	});

	describe('When I add new workscopes', () => {
		it('workscope id and version should be ignored if provided',
			(done) => {
				const PostRequestBody = require('./test-inputs/post-request-body.json');
				const expectedResponse = require('./mock-responses/new-workscope.json');
				let expectedRequestBody = require('./test-inputs/expected-post-request-body.json');
				let stub = sinon.stub(dbQueries, 'postNewWorkscope');
				stub.withArgs(sinon.match(expectedRequestBody)).returns(
					bPromise.resolve(
						require('./mock-responses/new-workscope.json')));
				request(app)
					.post('/api/v1/workscope')
					.send(PostRequestBody)
					.set('Content-Type', 'application/json')
					.expect(200)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							let actualResponse = res.body;
							expect(actualResponse).to.eql(expectedResponse);
							done();
						}
					});
			});
	});

	describe('When I update existing workscope with no ESN', () => {
		it('should give proper error message',
			(done) => {
				const PutRequestBody = require('./test-inputs/put-validation-error-request-body.json');
				request(app)
					.put('/api/v1/workscope/10')
					.send(PutRequestBody)
					.set('Content-Type', 'application/json')
					.expect(400)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							expect(res.body).to.eql({
								errorMessage: 'Workscope Resouce Id not matching with the Id' +
								' in request body.,Workscope version and esn must be provided.'
							});
							done();
						}
					});
			});
	});

	describe('When updating workscope that doesn\'t exist', () => {
		before(() => {
			tracker.on('query', (query, step) => {
				[
					() => {
						expect(query.sql).to.equal(
							'select "workscope".* from "workscope"' +
							' where "esn" = ? and "id" = ? and "version" = ?');
						query.response(
							[]);
					}
				][step - 1]();
			});
		});
		it('should give proper validation error message',
			(done) => {
				const Put2RequestBody = require('./test-inputs/put-request-body.json');
				request(app)
					.put('/api/v1/workscope/1')
					.send(Put2RequestBody)
					.set('Content-Type', 'application/json')
					.expect(400)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							expect(res.body).to.eql({
								errorMessage:
									'No workscope to update for the given id, version and esn.'
							});
							done();
						}
					});
			});
	});

	describe('when updating an existing workscope', () => {
		before(() => {
			tracker.on('query', (query, step) => {
				[
					() => {
						expect(query.sql).to.equal(
							'select "workscope".* from "workscope"' +
							' where "esn" = ? and "id" = ? and "version" = ?');
						query.response(
							[
								{
									id: '1',
									version: '1',
									esn: '123456',
									title: 'workscope title1',
									engine_details: null,
									health_instructions: {
										health: 'yay'
									},
									engine_modules: {
										family: 'GE90',
										hierarchy: {}
									},
									links: null,
									status: 'DRAFT',
									created_by: 'Divya',
									created_date: '2016-09-22T18:07:36.011Z',
									last_modified_by: 'Divya',
									last_modified_date: '2016-09-22T18:07:36.011Z'
								}
							]);
					},
					() => {
						expect(query.sql).to.equal(
							'select "workscope_audit".* from "workscope_audit"' +
							' where "workscope_audit"."workscope_id" in (?)');
						query.response(
							[
								{
									id: '1',
									workscope_id: '1',
									workscope_version: '1',
									user_action: 'PUT',
									modified_by: 'Ben',
									modified_date: '2016-09-22T18:07:36.060Z'
								}
							]);
					},
					() => {
						expect(query.sql).to.equal(
							'update "workscope" set "created_by" = ?, "created_date" = ?, ' +
							'"engine_details" = ?, ' +
							'"engine_modules" = ?, ' +
							'"esn" = ?, ' +
							'"health_instructions" = ?, ' +
							'"id" = ?, ' +
							'"last_modified_date" = ?, ' +
							'"links" = ?, ' +
							'"maintenance_reference" = ?, ' +
							'"title" = ?, "version" = ? ' +
							'where "id" = ? and "version" = ? and "id" = ?');
						query.response(
							[
								{
									id: 1,
									version: 1,
									esn: '12345',
									title: 'workscope title4'
								}
							]);
					},
					() => {
						expect(query.sql).to.equal(
							'insert into "workscope_audit" ' +
							'("modified_by", "modified_date", "user_action", ' +
							'"workscope_id", "workscope_version") ' +
							'values (DEFAULT, ?, ?, ?, ?) returning "id"');
						query.response(
							[
								{
									id: '1',
									workscope_id: '1',
									workscope_version: '1',
									user_action: 'PUT',
									modified_by: 'Ben',
									modified_date: '2016-09-22T18:07:36.060Z'
								}
							]);
					},
					() => {
						expect(query.sql).to.equal(
							'select "workscope".* from "workscope" where ' +
							'"workscope"."id" = ? and ' +
							'"workscope"."version" = ? limit ?');
						query.response(
							[
								{
									id: '1',
									version: '1',
									esn: '123456',
									title: 'workscope title1',
									engine_details: null,
									health_instructions: {
										health: 'yay'
									},
									engine_modules: {
										family: 'GE90',
										hierarchy: {}
									},
									links: null,
									maintenance_reference: {
										data: [
											{
												maintenanceTrackingReference: 'ABC',
												id: '123',
												revision: '123'
											},
											{
												maintenanceTrackingReference: '',
												id: '',
												revision: ''
											}
										]
									},
									status: 'DRAFT',
									created_by: 'Divya',
									created_date: '2016-09-22T18:07:36.011Z',
									last_modified_by: 'Divya',
									last_modified_date: '2016-09-22T18:07:36.011Z'
								}
							]);
					}
				][step - 1]();
			});
		});
		it('workscope should be updated and audit entry should be created',
			(done) => {
				const PutRequestBody = require('./test-inputs/put-request-body.json');
				request(app)
					.put('/api/v1/workscope/1')
					.send(PutRequestBody)
					.set('Content-Type', 'application/json')
					.expect(200)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							done();
						}
					});
			});
	});

	describe('When I modify a workscope field', () => {
		it('should not update maintenance references with empty rows',
			() => {
				const workscopeFromDB = {
				};
				const workscopeRequest = {
					id: '1',
					version: '1',
					esn: '12345',
					title: 'workscope title3',
					maintenance_reference: [
						{
							maintenanceTrackingReference: 'Booster',
							id: '1234',
							revision: '123'
						},
						{
							maintenanceTrackingReference: 'AGB',
							id: '1235',
							revision: '124'
						},
						{
							maintenanceTrackingReference: '',
							id: '',
							revision: ''
						}
					],
					health_instructions: {
						testHealth: 'test'
					},
					engine_modules: {
						family: 'GE90',
						hierarchy: {}
					}
				};
				wsManager.setWorkscopeFromDB(workscopeFromDB, workscopeRequest);
				expect(workscopeFromDB.maintenance_reference.data.length).to.equal(2);
			});
	});
});
