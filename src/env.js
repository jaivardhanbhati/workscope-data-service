'use strict';
const _ = require('lodash');

// Read all the required environment variables for the application

// Data services details
const dataServiceName = process.env.DATA_SERVICE_NAME || 'postgres';
const dataServiceInstanceName = process.env.DATA_STORE_NAME || 'aviation-workscope-postgres';
const vcapServices = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : {};

const dataStoreCreds = _.find(vcapServices[dataServiceName], (s) => {
	return s.name === dataServiceInstanceName;
});

process.env.DATABASE_URL = dataStoreCreds.credentials.uri;
