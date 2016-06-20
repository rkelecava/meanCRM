var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

var User = mongoose.model('User');

router.get('/', function(req, res, next) {
	// Query db using mongoose find method
	User.find( function (err, users) {
		// Return any errors
		if (err) { return next(err); }
		// If there are no errors, return the list of users
		return res.json(users);
	});
});

router.get('/adminUserExists', function(req, res, next) {
	// Query db using mongoose find method
	User.findOne({roles: 'admin'}, function (err, users) {
		// Return any errors
		if (err) { return next(err); }

		if (users === null) { return res.send(false); } else { return res.send(true); }
	});
});

router.post('/', function (req, res, next) {
	// Check for required fields
	if (!req.body.username || req.body.username === '') {
		return res.status(400).json({
			message: 'You must enter a valid username'
		});
	}

	if (!req.body.password || req.body.password === '') {
		return res.status(400).json({
			message: 'You must enter a valid password'
		});
	}

	if (!req.body.email || req.body.email === '') {
		return res.status(400).json({
			message: 'You must enter a valid e-mail address'
		});
	}

	// Define a new user model
	var user = new User();

	// Set username = username from form
	user.username = req.body.username;

	// Set password = encrypt password from form using setPassword method defined in User schema
	user.setPassword(req.body.password);

	// Set first = first from form
	user.first = req.body.first;

	// Set last = last from form
	user.last = req.body.last;

	// Set jobTitle = jobTitle from form
	user.title = req.body.title;

	// Set phoneNumber = phoneNumber from form
	user.phoneNumber = req.body.phone;

	// Set phoneExt = phoneExt from form
	user.phoneExt = req.body.phoneExt;

	// Set email = email from form
	user.email = req.body.email;

	user.isSiteAdmin = req.body.isSiteAdmin;

	// Add role from form to user roles array
	if (req.body.role) { user.roles.push(req.body.role); }

	// Save user to db using mongoose save method
	user.save(function (err) {
		// Return any errors
		if (err) { return next(err); }

		/* If no errors, generate a new JWT(jsonwebtoken) for the
		newly added user using the generateJWT method defined in the User Schema */
		return res.json({token: user.generateJWT()});
	});
});




module.exports = router;
