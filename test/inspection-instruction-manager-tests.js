'use strict';

const request = require('supertest');
const chai = require('chai');
const app = require('./mocked-app');

const expect = chai.expect;
var tracker = require('mock-knex').getTracker();

describe('Inspection instructions manager', () => {
	beforeEach(() => {
		tracker.install();
	});

	afterEach(() => {
		tracker.uninstall();
	});

	describe('When queried for inspection instructions by engine family', (query, step) => {
		const expectedResponse = require('./expected-responses/health-instrctions-GE90.json');
		before(() => {
			tracker.on('query', (query, step) => {
				[
					() => {
						expect(query.sql).to.equal(
							'select "engine_inspection_instructions_template".* ' +
							'from "engine_inspection_instructions_template"' +
							' where "engine_family" = ?');
						query.response(expectedResponse);
					}
				][step - 1]();
			});
		});
		it('Should return inspection instructions associated with the engine family',
			(done) => {
				request(app)
					.get('/api/v1/healthinstructions?engineFamily=GE90')
					.set('Accept', 'application/json')
					.expect('Content-Type', /json/)
					.expect(200)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							expect(res.body).to.eql(expectedResponse);
							done();
						}
					});
			}
		);
	});

	describe('When queried for inspection instructions by engine family and engine model',
		(query, step) => {
			const expectedResponse = require('./expected-responses/health-instrctions-GE90.json');
			before(() => {
				tracker.on('query', (query, step) => {
					[
						() => {
							expect(query.sql).to.equal(
								'select "engine_inspection_instructions_template".* ' +
								'from "engine_inspection_instructions_template"' +
								' where "engine_family" = ? and "engine_model" = ?');
							query.response(expectedResponse);
						}
					][step - 1]();
				});
			});
			it('Should return inspection instructions associated with the ' +
				'engine family and engine model', (done) => {
				request(app)
					.get('/api/v1/healthinstructions?engineFamily=CFM56&engineModel=3B')
					.set('Accept', 'application/json')
					.expect('Content-Type', /json/)
					.expect(200)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							expect(res.body).to.eql(expectedResponse);
							done();
						}
					});
			}
			);
		});

	describe('When queried for inspection instructions without engine family or engine model',
		(query, step) => {
			const expectedResponse = require('./expected-responses/health-instrctions-GE90.json');
			before(() => {
				tracker.on('query', (query, step) => {
					[
						() => {
							expect(query.sql).to.equal(
								'select "engine_inspection_instructions_template".* ' +
								'from "engine_inspection_instructions_template"');
							query.response(expectedResponse);
						}
					][step - 1]();
				});
			});
			it('Should return all available health instructions',
				(done) => {
					request(app)
						.get('/api/v1/healthinstructions')
						.set('Accept', 'application/json')
						.expect('Content-Type', /json/)
						.expect(200)
						.end((err, res) => {
							if (err) {
								done(err);
							} else {
								expect(res.body).to.eql(expectedResponse);
								done();
							}
						});
				}
			);
		});

	describe('When I add new health instructions template without engine family/model/series',
		() => {
			it('should provided proper error message',
				(done) => {
					const PostRequestBody = require('./test-inputs/health-instructions-post-request-body.json');
					request(app)
						.post('/api/v1/healthinstructions')
						.send(PostRequestBody)
						.set('Content-Type', 'application/json')
						.expect(400)
						.end((err, res) => {
							if (err) {
								done(err);
							} else {
								expect(res.body).to.eql({
									errorMessage: 'Engine family/model/series should be ' +
									'specified for inspection instructions template'
								});
								done();
							}
						});
				});
		});

	describe('When I add new health instructions template with already existing ' +
		'engine family/model/series combination', (query, step) => {
		const expectedResponse = require('./expected-responses/health-instrctions-GE90.json');
		before(() => {
			tracker.on('query', (query, step) => {
				[
					() => {
						expect(query.sql).to.equal(
							'select "engine_inspection_instructions_template".* ' +
							'from "engine_inspection_instructions_template"' +
							' where "engine_family" = ?');
						query.response(expectedResponse);
					}
				][step - 1]();
			});
		});
		it('should provided proper error message',
			(done) => {
				const PostRequestBody = require('./test-inputs/duplicate-health-instructions-post-request-body.json');
				request(app)
					.post('/api/v1/healthinstructions')
					.send(PostRequestBody)
					.set('Content-Type', 'application/json')
					.expect(400)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							expect(res.body).to.eql({
								errorMessage: 'Inspection instructions template already ' +
								'exists for specified engine family/engine model'
							});
							done();
						}
					});
			});
	});

	describe('When I update existing health instructions template that does not ' +
		'exist for the specified engine family/model', (query, step) => {
		before(() => {
			tracker.on('query', (query, step) => {
				[
					() => {
						expect(query.sql).to.equal(
							'select "engine_inspection_instructions_template".* ' +
							'from "engine_inspection_instructions_template"' +
							' where "engine_family" = ?');
						query.response([]);
					}
				][step - 1]();
			});
		});
		it('should provided proper error message',
			(done) => {
				const PostRequestBody = require('./test-inputs/update-health-instructions-post-request-body.json');
				request(app)
					.put('/api/v1/healthinstructions/13')
					.send(PostRequestBody)
					.set('Content-Type', 'application/json')
					.expect(400)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							expect(res.body).to.eql({
								errorMessage: 'Inspection instructions template does not ' +
								'exist for specified engine family/engine model'
							});
							done();
						}
					});
			});
	});

	describe('When I update existing health instructions template where id in ' +
		'request body does not match id in request param', (query, step) => {
		it('should provided proper error message',
			(done) => {
				const PostRequestBody = require('./test-inputs/update-health-instructions-post-request-body.json');
				request(app)
					.put('/api/v1/healthinstructions/14')
					.send(PostRequestBody)
					.set('Content-Type', 'application/json')
					.expect(400)
					.end((err, res) => {
						if (err) {
							done(err);
						} else {
							expect(res.body).to.eql({
								errorMessage: 'Instructions template Id not matching with ' +
								'the Id in request body.'
							});
							done();
						}
					});
			});
	});
});
