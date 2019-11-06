'use strict';

const express = require('express');
const inspectionInstructionsRouter = express.Router();
const logger = require('./logger')('InspectionInstructionsManager');
const databaseQueries = require('./database-queries');

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

const getInstructionsTemplate = (req, res, next) => {
	try {
		// if no criteria is specified, returns all instruction templates
		let criteria = {};
		if (req.query.engineFamily) criteria.engine_family = req.query.engineFamily;
		if (req.query.engineModel) criteria.engine_model = req.query.engineModel;
		databaseQueries.getInstructionsTemplate(criteria)
			.then((inspectionInstructions) => {
				res.json(inspectionInstructions || []);
			})
			.catch((err) => {
				handleError(err, res);
			});
	} catch (err) {
		handleError(err);
	}
};

const addInstructionsTemplate = (req, res, next) => {
	try {
		let instructionTemplate = req.body;
		// atleast engine family should be specified
		if (!instructionTemplate.engine_family && !instructionTemplate.engine_model &&
			!instructionTemplate.engine_series) {
			let err = new Error('Engine family/model/series should be specified for ' +
				'inspection instructions template');
			err.status = 400;
			handleError(err, res);
			return;
		}
		let criteria = {};
		if (instructionTemplate.engine_family) {
			criteria.engine_family = instructionTemplate.engine_family;
		}
		if (instructionTemplate.engine_model) {
			criteria.engine_model = instructionTemplate.engine_model;
		}
		if (instructionTemplate.engine_series) {
			criteria.engine_series = instructionTemplate.engine_series;
		}
		// check if instruction template with the given criteria exists
		databaseQueries.getInstructionsTemplate(criteria)
			.then((inspectionInstructions) => {
				if (inspectionInstructions && inspectionInstructions.length > 0) {
					// if exists, return error
					let err = new Error('Inspection instructions template already ' +
						'exists for specified engine family/engine model');
					err.status = 400;
					handleError(err, res);
				} else {
					// if does not exists, insert new record
					instructionTemplate.id = undefined;
					instructionTemplate.created_by = req.userName || '';
					instructionTemplate.last_modified_by = req.userName || '';
					databaseQueries.postNewInstructionsTemplate(instructionTemplate)
						.then((inspectionInstructions) => {
							res.json(inspectionInstructions || []);
						})
						.catch((err) => {
							handleError(err, res);
						});
				}
			})
			.catch((err) => {
				handleError(err, res);
			});
	} catch (err) {
		handleError(err);
	}
};

const updateInstructionsTemplate = (req, res, next) => {
	try {
		let instructionTemplate = req.body;
		if (!instructionTemplate.id ||
			(req.params.id.toString() !== instructionTemplate.id.toString())) {
			let err = new Error('Instructions template Id not matching ' +
				'with the Id in request body.');
			err.status = 400;
			handleError(err, res);
		} else {
			let criteria = {};
			if (instructionTemplate.engine_family) {
				criteria.engine_family = instructionTemplate.engine_family;
			}
			if (instructionTemplate.engine_model) {
				criteria.engine_model = instructionTemplate.engine_model;
			}
			if (instructionTemplate.engine_series) {
				criteria.engine_series = instructionTemplate.engine_series;
			}
			// check if instruction template with the given criteria exists
			databaseQueries.getInstructionsTemplate(criteria)
				.then((inspectionInstructions) => {
					if (inspectionInstructions && inspectionInstructions.length > 0) {
						// if exists, then update the record
						instructionTemplate.last_modified_by = req.userName || '';
						databaseQueries.updateInspectionInstructions(instructionTemplate)
							.then((inspectionInstructions) => {
								res.json(inspectionInstructions || []);
							})
							.catch((err) => {
								handleError(err, res);
							});
					} else {
						// if it does not exists, then throw error
						let err = new Error('Inspection instructions template does not exist ' +
							'for specified engine family/engine model');
						err.status = 400;
						handleError(err, res);
					}
				})
				.catch((err) => {
					handleError(err, res);
				});
		}
	} catch (err) {
		handleError(err);
	}
};

inspectionInstructionsRouter.get('/', getInstructionsTemplate);
inspectionInstructionsRouter.post('/', addInstructionsTemplate);
inspectionInstructionsRouter.put('/:id', updateInstructionsTemplate);
module.exports = inspectionInstructionsRouter;
