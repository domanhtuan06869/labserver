dbPassword = 'mongodb+srv://dmt:'+ encodeURIComponent('manhtuan') + '@test-fjodz.mongodb.net/user?retryWrites=true&w=majority';
uri = "mongodb+srv://dmt:manhtuan@test-fjodz.mongodb.net/test?retryWrites=true&w=majority";
module.exports = {
    mongoURI: dbPassword,
    Uri:uri
};
