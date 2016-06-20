var mongoose = require('mongoose');
var crypto = require('crypto');

var serverInfoSchema = new mongoose.Schema({
	smtpServer: String,
	smtpUsername: String,
	smtpPassword: String
});

serverInfoSchema.methods.encrypt = function (password) {
  var cipher = crypto.createCipher('aes-256-ctr', process.env['JWT_SECRET']);
  var crypted = cipher.update(password,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
};

serverInfoSchema.methods.decrypt = function () {
  var decipher = crypto.createDecipher('aes-256-ctr', process.env['JWT_SECRET']);
  var dec = decipher.update(this.smtpPw,'hex','utf8');
  dec += decipher.final('utf8');
  return dec;
};

mongoose.model('ServerInfo', serverInfoSchema);