'use strict';
const express = require('express');
const bearerToken = require('express-bearer-token');
const predixFastToken = require('predix-fast-token');
const router = express.Router();
const logger = require('./logger')('WorkscopeDataAuthEnforcer');

const trustedIssuers = process.env.TRUSTED_ISSUERS;

// TODO: Add ACS checks here when ready
// Ensure Authorization header has a bearer token
router.all('*', bearerToken(), (req, res, next) => {
	if (req.token) {
		predixFastToken.verify(req.token, trustedIssuers).then((decoded) => {
			req.userName = decoded.grant_type === 'client_credentials'
				? decoded.client_id : decoded.user_name;
			next();
		}).catch((err) => {
			logger.error('Invalid or expired token', err);
			res.status(403).send('Unauthorized');
		});
	} else {
		logger.error('Request has no Authorization header.');
		res.status(401).send('Authentication Required');
	}
});
module.exports = router;
