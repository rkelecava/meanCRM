var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	first: String,
	last: String,
	email: String,
	title: String,
	phoneNumber: String,
	phoneExt: String,
	username: {type: String, lowercase: true, unique: true},
	roles: {type: [String], default: 'guest' },
	isSiteAdmin: {type: Boolean, default: false},
	salt: String,
	hash: String
});

UserSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(16).toString('hex');

	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

	return this.hash === hash;
};

UserSchema.methods.generateJWT = function () {

	// set expiration to 2 days
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 1);

	/* jwt needs to be signed with a secret key.  This is best set in an environment variable,
	but we can fake this in our test environment by setting the environment variable in 
	env.js and calling it if there is no system environment variable found.  Make sure to add env.js
	to the .gitignore file */
	return jwt.sign({
		_id: this._id,
		name: this.first+' '+this.last,
		jobTitle: this.jobTitle,
		phoneNumber: this.phoneNumber,
		phoneExt: this.phoneExt,
		email: this.email,
		username: this.username,
		roles: this.roles,
		isSiteAdmin: this.isSiteAdmin,
		exp: parseInt(exp.getTime() / 1000),
	}, process.env.JWT_SECRET);
};

mongoose.model('User', UserSchema);