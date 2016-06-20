var mongoose = require('mongoose');


var companyInfoSchema = new mongoose.Schema({
	name: {type: String, unique: true},
	address1: String,
	address2: String,
	city: String,
	state: String,
	zip: String,
	phone: String
});

mongoose.model('CompanyInfo', companyInfoSchema);