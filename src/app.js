const express = require('express');
const bodyParser = require('body-parser');
const async = require('async');
const dbMigrateAPI = require('./db-migrate-api');
const logger = require('./logger')('WorkscopeApp');

const PORT = process.env.PORT || 8000;
// Load environment values
require('./env');

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Secure ALL THE THINGS!!!
app.use(require('helmet')({}));
// Enforce UAA
app.use(require('./enforcer'));

const runDBMigrations = (callback) => {
	dbMigrateAPI.run((err) => {
		if (err) {
			logger.error(err.originalErr);
			callback(err);
		}
		callback(null, 'success');
	});
};

async.waterfall([
	// 1. Run DB Migrations
	runDBMigrations
], (err, result) => {
	if (err) {
		throw err.originalErr;
	} else {
		const workscopeManager = require('./workscope-manager');
		const inspectionInstructionsManager = require('./inspection-instructions-manager');
		// importing data handlers
		app.use('/api/v1/healthinstructions', inspectionInstructionsManager);
		app.use('/api/v1', workscopeManager.workscopeRouter);
		// launch express
		app.listen(PORT, () => {
			console.log('Workscope Data Service listening on port ' + PORT + '!');
		});
	}
});

module.exports = app;
