/**
 * Created by 212426224 on 9/18/16.
 */
'use strict';
const models = require('./database-models');
const logger = require('./logger')('DatabaseQueries');

const getAllWorkscopes = () => {
	return new Promise((resolve, reject) => {
		new models.Workscope()
			.fetchAll({ withRelated: ['WorkscopeAudit'] })
			.then((workscopes) => {
				resolve(workscopes);
			})
			.catch((err) => {
				logger.error('Workscope fetchall failed', err);
				reject(err);
			});
	});
};

const getWorkscopesByGivenCriteria = (criteria) => {
	return new Promise((resolve, reject) => {
		new models.Workscope()
			.where(criteria)
			.fetchAll({ withRelated: ['WorkscopeAudit'] })
			.then((workscopes) => {
				resolve(workscopes);
			})
			.catch((err) => {
				logger.error('Workscope fetch by criteria failed', err);
				reject(err);
			});
	});
};

const queries = {
	fetchWorkscopes(criteria) {
		if (criteria) {
			return getWorkscopesByGivenCriteria(criteria);
		} else {
			return getAllWorkscopes();
		}
	},
	postNewWorkscope(workscope) {
		return new Promise((resolve, reject) => {
			new models.Workscope(workscope)
				.save()
				.then((workscopes) => {
					resolve(workscopes);
				})
				.catch((err) => {
					logger.error('Workscope creation failed', err);
					reject(err);
				});
		});
	},
	updateWorkscope(workscope) {
		return new Promise((resolve, reject) => {
			new models.Workscope()
				.where({ id: workscope.id, version: workscope.version })
				.save(workscope, { patch: true })
				.then((workscopes) => {
					// Bookshelf save wasn't returning all fields as response.
					// Need to do a fetch after the save
					resolve(workscopes
						? workscopes
							.clear()
							.set({ id: workscope.id, version: workscope.version })
							.fetch()
						: workscopes);
				})
				.catch((err) => {
					logger.error('Workscope save failed', err);
					reject(err);
				});
		});
	},
	getInstructionsTemplate(criteria) {
		return new Promise((resolve, reject) => {
			let model = new models.InspectionInstructions();
			let qb = model.query();
			if (criteria) qb.where(criteria);
			model.fetchAll()
				.then((inspectionInstructions) => {
					resolve(inspectionInstructions);
				})
				.catch((err) => {
					logger.error('Inspection instructions fetch failed');
					reject(err);
				});
		});
	},
	postNewInstructionsTemplate(instructionsTemplate) {
		return new Promise((resolve, reject) => {
			new models.InspectionInstructions(instructionsTemplate)
				.save()
				.then((instructionsTemplate) => {
					resolve(instructionsTemplate);
				})
				.catch((err) => {
					logger.error('Inspection instructions creation failed', err);
					reject(err);
				});
		});
	},
	updateInspectionInstructions(instructionsTemplate) {
		return new Promise((resolve, reject) => {
			new models.InspectionInstructions()
				.where({ id: instructionsTemplate.id })
				.save(instructionsTemplate, { patch: true })
				.then((instructionsTemplate) => {
					resolve(instructionsTemplate);
				})
				.catch((err) => {
					logger.error('Inspection instructions save failed', err);
					reject(err);
				});
		});
	}
};

module.exports = queries;
