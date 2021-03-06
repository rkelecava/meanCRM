var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

/********************************/
/* All Routes for Company Info */
/********************************/
var CompanyInfo = mongoose.model('CompanyInfo');

router.get('/companyInfo', function(req, res, next) {
	// Query db using mongoose find method
	CompanyInfo.find( function (err, companyInfo) {
		// Return any errors
		if (err) { return next(err); }
		// If there are no errors, return the list of setup info
		return res.json(companyInfo);
	});
});

router.post('/companyInfo', function (req, res, next) {
	var companyInfo = new CompanyInfo(req.body);

	companyInfo.save(function (err, companyInfo) {
		if (err) { return next(err); }
		res.json(companyInfo);
	});
});

router.param('companyInfo', function (req, res, next, id) {

	// Define a new query to search for setup by ID
	var query = CompanyInfo.findById(id);

	// Execute the query
	query.exec(function (err, companyInfo) {
		// Return any errors
		if (err) { return next(err); }
		// If no setup is found with given ID, return error
		if (!companyInfo) { return next(new Error('can\'t find any company information')); }

		// If no errors, set req.setup = to setup from db
		req.companyInfo = companyInfo;
		return next();
	});
});

router.get('/companyInfo/:companyInfo', function (req, res, next) {

	// Return the setup from the route parameter
	return res.json(req.companyInfo);
});

router.delete('/companyInfo/:companyInfo', function (req, res, next) {

	// Remove setup using mongoose remove method
	req.companyInfo.remove(function (err, companyInfo) {
		// Return any errors
		if (err) { return next(err); }

		// If no errors, return a message stating that the setup has been removed
		res.json({});
	});
});


router.put('/companyInfo/:companyInfo', function (req, res, next) {

	CompanyInfo.findById(req.companyInfo._id, function (err, companyInfo) {

		if (req.body.name) { companyInfo.name = req.body.name; }
		if (req.body.address1) { companyInfo.address1 = req.body.address1; }
		if (req.body.address2) { companyInfo.address2 = req.body.address2; }
		if (req.body.city) { companyInfo.city = req.body.city; }
		if (req.body.state) { companyInfo.state = req.body.state; }
		if (req.body.zip) { companyInfo.zip = req.body.zip; }
		if (req.body.phone) { companyInfo.phone = req.body.phone; }

		companyInfo.save(function (err) {
			// Return any errors
			if (err) { return next(err); }

			return res.json(companyInfo);
		});
	});
});

/**************************************/
/* End of CompanyInfo Routes */
/***************************************/


/********************************/
/* All Routes for Server Info */
/********************************/
var ServerInfo = mongoose.model('ServerInfo');

router.get('/serverInfo', function(req, res, next) {
	// Query db using mongoose find method
	ServerInfo.find( function (err, serverInfo) {
		// Return any errors
		if (err) { return next(err); }
		// If there are no errors, return the list of setup info
		return res.json(serverInfo);
	});
});

router.post('/serverInfo', function (req, res, next) {
	var serverInfo = new ServerInfo();

	serverInfo.smtpServer = req.body.smtpServer;
	serverInfo.smtpUsername = req.body.smtpUsername;
	serverInfo.smtpPassword = serverInfo.encrypt(req.body.smtpPassword);

	serverInfo.save(function (err, serverInfo) {
		if (err) { return next(err); }
		res.json(serverInfo);
	});
});

router.param('serverInfo', function (req, res, next, id) {

	// Define a new query to search for setup by ID
	var query = ServerInfo.findById(id);

	// Execute the query
	query.exec(function (err, serverInfo) {
		// Return any errors
		if (err) { return next(err); }
		// If no setup is found with given ID, return error
		if (!serverInfo) { return next(new Error('can\'t find any server information')); }

		// If no errors, set req.setup = to setup from db
		req.serverInfo = serverInfo;
		return next();
	});
});

router.get('/serverInfo/:serverInfo', function (req, res, next) {

	// Return the setup from the route parameter
	return res.json(req.serverInfo);
});

router.delete('/serverInfo/:serverInfo', function (req, res, next) {

	// Remove setup using mongoose remove method
	req.serverInfo.remove(function (err, serverInfo) {
		// Return any errors
		if (err) { return next(err); }

		// If no errors, return a message stating that the setup has been removed
		res.json({});
	});
});


router.put('/serverInfo/:serverInfo', function (req, res, next) {

	ServerInfo.findById(req.serverInfo._id, function (err, serverInfo) {

		if (req.body.smtpServer) { serverInfo.smtpServer = req.body.smtpServer; }
		if (req.body.smtpUsername) { serverInfo.smtpUsername = req.body.smtpUsername; }
		if (req.body.smtpPassword) { serverInfo.smtpPassword = serverInfo.encrypt(req.body.smtpPassword); }


		serverInfo.save(function (err) {
			// Return any errors
			if (err) { return next(err); }

			return res.json(serverInfo);
		});
	});
});

/**************************************/
/* End of ServerInfo Routes */
/***************************************/

module.exports = router;