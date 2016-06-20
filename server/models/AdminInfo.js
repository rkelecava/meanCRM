var mongoose = require('mongoose');


var adminInfoSchema = new mongoose.Schema({
	first: String,
	last: String,
	title: String,
	email: String,
	phone: String
});

mongoose.model('AdminInfo', adminInfoSchema);