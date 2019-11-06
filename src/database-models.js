/* eslint prefer-rest-params: 0 */
/* Ignoring this lint rule because this library has problems
	when we use lambda style function definitions.
*/
/**
 * Created by 212426224 on 9/18/16.
 */
'use strict';
const knexConfig = require('./knex-config');
const bookshelf = require('bookshelf')(knexConfig);

const Workscope = bookshelf.Model.extend({
	tableName: 'workscope',
	hasTimestamps: ['created_date', 'last_modified_date'],
	WorkscopeAudit: function () {
		return this.hasMany(WorkscopeAudit);
	},
	constructor: function () {
		bookshelf.Model.apply(this, arguments);
		this.on('saved', function (model, attrs, options) {
			const action = (this.attributes.created_date === this.attributes.last_modified_date)
				? 'Create' : 'Update';
			new WorkscopeAudit({ workscope_id: this.id,
				workscope_version: this.attributes.version,
				user_action: action,
				modified_by: this.attributes.last_modified_by
			}).save();
		});
	}
});

const WorkscopeAudit = bookshelf.Model.extend({
	tableName: 'workscope_audit',
	hasTimestamps: ['modified_date'],
	Workscope: function () {
		return this.belongsTo(Workscope);
	}
});

const InspectionInstructions = bookshelf.Model.extend({
	tableName: 'engine_inspection_instructions_template',
	hasTimestamps: ['created_date', 'last_modified_date']
});

module.exports = {
	Workscope: Workscope,
	WorkscopeAudit: WorkscopeAudit,
	InspectionInstructions: InspectionInstructions
};
