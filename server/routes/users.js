var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

var User = mongoose.model('User');

/****************************/
/* Middleware */
/*****************************/

// Middleware to check for authenticated JWT and get the payload
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});

// Middleware to check if a user has admin permissions
var checkAdmin = function (req, res, next) {

	/* Loop through the user roles from the JWT payload 
	if 'admin' role is found, continuing moving forward.
		If not, return error w/ status 401 */
	for (var i=0; i<req.payload.roles.length; i++) {
		if (req.payload.roles[i]=='admin') {
			return next();
		}
	}

	var err = new Error('You do not have the required permissions to access this route');
	err.status = 401;
	return next(err);
};

// Middleware to check if a user has user permissions
var checkUser = function (req, res, next) {

	/* Loop through the user roles from the JWT payload 
	if 'user' or 'admin' role is found, continuing moving forward.
		If not, return error w/ status 401 */
	for (var i=0; i<req.payload.roles.length; i++) {
		if (req.payload.roles[i]=='admin' || req.payload.roles[i]=='user') {
			return next();
		}
	}

	var err = new Error('You do not have the required permissions to access this route');
	err.status = 401;
	return next(err);
};

/************************/
/* End of Middleware */
/************************/


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


/*****************************************
/* Middleware to PRELOAD "User" Object.
Define a new route parameter for :user */
/******************************************/
router.param('user', function (req, res, next, id) {

	// Define a new query to search for user by ID
	var query = User.findById(id);

	// Execute the query
	query.exec(function (err, user) {
		// Return any errors
		if (err) { return next(err); }
		// If no user is found with given ID, return error
		if (!user) { return next(new Error('can\'t find user')); }

		// If no errors, set req.user = to user from db
		req.user = user;
		return next();
	});
});

/*********************************/
/* GET a single user by _id */
/*********************************/
router.get('/:user', auth, checkAdmin, function (req, res, next) {

	// Return the user from the route parameter
	return res.json(req.user);
});

/************************/
/* GET a user's roles */
/*******************************/
router.get('/:user/roles', function (req, res, next) {

	// Return the user from the route parameter
	return res.json(req.user.roles);
});


/**************************/
/* DELETE a user */
/**************************/
router.delete('/:user', auth, checkAdmin, function (req, res, next) {

	// Remove user using mongoose remove method
	req.user.remove(function (err, user) {
		// Return any errors
		if (err) { return next(err); }

		return res.json({});

	});
});


/************************/
/* Route to login a user */
/**************************/
router.post('/login', function (req, res, next) {
	if (!req.body.username || !req.body.password) {
		return res.status(400).json({
			message: 'Please fill out all required fields'
		});
	}

	passport.authenticate('local', function (err, user, info) {
		if (err) { return next(err); }

		if (user) {
			return res.json({
				token: user.generateJWT()
			});
		} else {
			return res.status(401).json(info);
		}
	})(req, res, next);
});





module.exports = router;
