'use strict';
const express = require('express');
const workscopeRouter = express.Router();
const logger = require('./logger')('WorkscopeManager');
const dbQueries = require('./database-queries');
const _ = require('lodash');

const handleError = (err, res) => {
	logger.error('Error', err, err.stack);
	if (res) {
		if (err.status || err.statusCode) {
			logger.error('Setting status', err.status || err.statusCode);
			res.status(err.status || err.statusCode);
		} else {
			res.status(500);
		}
		res.json({ errorMessage: err.message });
	}
};

const handleGetResponse = (res, workscopesFromDB) => {
	_.forEach(workscopesFromDB.models, (workscope) => {
		workscope.attributes.links = workscope.attributes.links
			? workscope.attributes.links.data : [];
		workscope.attributes.maintenance_reference = workscope.attributes.maintenance_reference
			? workscope.attributes.maintenance_reference.data : [];
	});
	const result = {
		workscopes: workscopesFromDB || []
	};
	if (!result.workscopes.length) {
		res.status(204).json(result);
	} else {
		res.status(200).json(result);
	}
};

const getWorkscopes = (req, res, next) => {
	if (req.params.id) {
		dbQueries.fetchWorkscopes({ id: req.params.id })
			.then((workscopes) => {
				handleGetResponse(res, workscopes);
			}).catch((err) => {
				handleError(err, res);
			});
	} else if (req.query.esn) {
		dbQueries.fetchWorkscopes({ esn: req.query.esn })
			.then((workscopes) => {
				handleGetResponse(res, workscopes);
			}).catch((err) => {
				handleError(err, res);
			});
	} else {
		dbQueries.fetchWorkscopes()
			.then((workscopes) => {
				handleGetResponse(res, workscopes);
			}).catch((err) => {
				handleError(err, res);
			});
	}
};

const createWorkscope = (req, res, next) => {
	let workscopeRequest = req.body;
	workscopeRequest.id = undefined;
	workscopeRequest.version = 1;
	workscopeRequest.created_by = req.userName || '';
	workscopeRequest.last_modified_by = req.userName || '';

	dbQueries.postNewWorkscope(workscopeRequest)
		.then((workscope) => {
			res.json(workscope);
		}).catch((err) => {
			handleError(err, res);
		});
};

const setWorkscopeFromDB = (workscopeFromDB, workscopeRequest) => {
	workscopeFromDB.title = workscopeRequest.title;
	if (workscopeRequest.engine_details) {
		workscopeFromDB.engine_details = workscopeRequest.engine_details;
	}
	if (workscopeRequest.health_instructions) {
		workscopeFromDB.health_instructions = workscopeRequest.health_instructions;
	}
	if (workscopeRequest.links) {
		workscopeFromDB.links = { data: workscopeRequest.links };
	}
	if (workscopeRequest.engine_modules) {
		workscopeFromDB.engine_modules = workscopeRequest.engine_modules;
	}
	if (workscopeRequest.maintenance_reference) {
		let refLen = workscopeRequest.maintenance_reference.length;
		let ref = workscopeRequest.maintenance_reference;
		if (refLen > 0 && ref[refLen - 1].maintenanceTrackingReference === '' &&
			ref[refLen - 1].id === '' && ref[refLen - 1].revision === '') {
			ref.pop();
		}
		workscopeFromDB.maintenance_reference = { data: workscopeRequest.maintenance_reference };
	}
	workscopeFromDB.status = workscopeRequest.status;
};

const updateWorkscope = (req, res, next) => {
	try {
		const workscopeRequest = req.body;
		let errors = [];
		if (req.params.id.toString() !== workscopeRequest.id.toString()) {
			errors.push('Workscope Resouce Id not matching with the Id in request body.');
		}
		// validate the mandatory input is present
		if (!workscopeRequest.version || !workscopeRequest.esn) {
			errors.push('Workscope version and esn must be provided.');
		}
		if (errors.length > 0) {
			let err = new Error(errors.join());
			err.status = 400;
			handleError(err, res);
		} else {
			// verify a workscope entry exists
			const criteria = {
				esn: workscopeRequest.esn,
				id: workscopeRequest.id,
				version: workscopeRequest.version
			};

			dbQueries.fetchWorkscopes(criteria).then((workscopes) => {
				// If exists update
				if (workscopes && workscopes.length > 0) {
					let workscopeFromDB = workscopes.models[0].attributes;
					setWorkscopeFromDB(workscopeFromDB, workscopeRequest);
					workscopeFromDB.last_modified_by = req.userName;
					dbQueries.updateWorkscope(workscopeFromDB)
					.then((workscope) => {
						res.json(workscope);
					})
					.catch((err) => {
						handleError(err, res);
					});
				} else {
					// If no entry with the given criteria throw validation error
					let err =
						new Error('No workscope to update for the given id, version and esn.');
					err.status = 400;
					handleError(err, res);
				}
			}).catch((err) => {
				handleError(err, res);
			});
		}
	} catch (err) {
		handleError(err, res);
	}
};

workscopeRouter.get(['/workscope', '/workscope/:id'], getWorkscopes);
workscopeRouter.post('/workscope', createWorkscope);
workscopeRouter.put('/workscope/:id', updateWorkscope);

module.exports = {
	workscopeRouter: workscopeRouter,
	setWorkscopeFromDB: setWorkscopeFromDB
};
