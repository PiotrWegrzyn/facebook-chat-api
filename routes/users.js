var express = require('express');
var router = express.Router();
const fs = require("fs");
const login = require("facebook-chat-api");


/* GET users listing. */
router.get('/login', function(req, res, next) {

    var credentials = {email: "<insert your email here>", password: "<insert your password here>"};

    login(credentials, (err, api) => {
        if(err) return console.error(err);
        fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
    });

    res.send('respond');

});





module.exports = router;
