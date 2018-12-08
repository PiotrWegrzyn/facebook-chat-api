var express = require('express');
var router = express.Router();

const fs = require("fs");
const login = require("facebook-chat-api");

router.get('/listen', function(req, res, next) {

    login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
        console.log(JSON.parse(fs.readFileSync('appstate.json', 'utf8')))
        if(err) return console.error(err);

        api.setOptions({listenEvents: true});

        var stopListening = api.listen((err, event) => {
            if(err) return console.error(err);

            switch(event.type) {
                case "message":
                    if(event.body === '/stop') {
                        api.sendMessage("Goodbye…", event.threadID);
                        return stopListening();
                    }
                    if(event.body === '/echo') {
                        api.sendMessage("echo", event.threadID);
                    }
                    if(event.body === '/emoji') {
                        api.changeThreadEmoji("💯", event.threadID, (err) => {
                            if(err) return console.error(err);
                        });
                    }
                    if(event.body === '/color') {

                        api.changeThreadColor("#ffc300", event.threadID, (err) => {
                            if (err) return console.error(err);
                        });
                    }
                    if(event.body === '/count') {
                        api.getThreadInfo(event.body.threadID,(err, info) => {
                            if(err) return console.error(err);
                            console.log(threadID +"\n"+ event.threadID);
                            api.sendMessage("Amount of messages:" + info.message.count() , event.threadID);
                        });
                    }
                    if(event.body === '/colornull') {
                        console.log(event.threadID);
                        api.changeThreadColor(null, event.threadID, (err) => {
                            if(err) return console.error(err);
                        });
                    }
                    if(event.body === '/friends') {
                        console.log(event.threadID);
                        api.getFriendsList((err, data) => {
                            if(err) return console.error(err);
                            str ='';
                            for(var i =0 ; i < data.length; i ++){
                                str += data[i].firstName + data[i].fullName + data[i].alternateName+data[i].firstName + data[i].gender+ data[i].isBirthday+"\n";
                            }
                            api.sendMessage("Amount of friends:" + data.length + "\n "+ str , event.threadID);
                        })
                    }
                    if(event.body === '/bday') {
                        console.log(event.threadID);
                        api.getFriendsList((err, data) => {
                            if(err) return console.error(err);
                            str ='';
                            for(var i =0 ; i < data.length; i ++){
                                if(data[i].isBirthday)str += data[i].firstName + data[i].fullName + data[i].gender+ data[i].isBirthday+"\n";
                            }
                            api.sendMessage("Amount of friends:" + data.length + "\n "+ str , event.threadID);
                        })
                    }
                    if(event.body === '/mcount') {
                        console.log(event.threadID);
                        api.getThreadInfo(event.threadID, (err, info) => {
                            if(err) return console.error(err);
                            api.sendMessage("Amount of messages:" + info["messageCount"]  , event.threadID);

                        });
                    }
                    if(event.body === '/uinfo') {
                        console.log(event.threadID);
                        api.getUserInfo([event.threadID], (err, info) => {
                            if(err) return console.error(err);
                            console.log(info);
                            api.sendMessage(JSON.stringify(info[event.threadID]), event.threadID);
                            //api.sendMessage(info[event.threadID].firstName + info[event.threadID].fullName + info[event.threadID].searchTokens + info[event.threadID].isFriend + info[event.threadID].profileUrl, event.threadID);
                        });
                    }
                    if(event.body === '/ourpics') {
                        console.log(event.threadID);
                        api.getThreadPictures(event.threadID, 0, 10, (err, pics) => {
                            api.sendMessage(JSON.stringify(pics), event.threadID);
                         });
                    }

                    if( event.body.substr(0,7).toUpperCase()=== '/search'.toUpperCase()) {
                        console.log("Searching for: " + event.body.substr(8,event.body.length));
                        api.getUserID(event.body.substr(8,event.body.length), (err, data) => {
                            console.log("geting user data");
                            if(err) return console.error(err);

                            // Send the message to the best match (best by Facebook's criteria)
                            var userID = data[0].userID;
                            console.log(userID +"\n"+ event.threadID);
                            //api.sendMessage("His id is:" + threadID, event.threadID);
                            api.getUserInfo(userID, (err, info) => {
                                if(err) return console.error(err);
                                api.sendMessage(JSON.stringify(info[userID]), event.threadID);
                            });
                        });
                    }
                    break;
                case "event":
                    console.log(event);
                    break;
            }
        });
    });
    res.render('index', { title: 'Express' });
});



router.get('/chybaTy', function(req, res, next) {


    login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
        if (err) return console.error(err);

        api.setOptions({listenEvents: true});

        var stopListening = api.listen((err, event) => {
            if (err) return console.error(err);

            switch (event.type) {
                case "message":
                    if (event.body === '/stop') {
                        api.sendMessage("Goodbye...", event.threadID);
                        return stopListening();
                    }
                    api.markAsRead(event.threadID, (err) => {
                        if (err) console.log(err);
                    });
                    api.sendMessage("Chyba ty.", event.threadID);
                    break;
                case "event":
                    console.log(event);
                    break;
            }
        });
    });
});


router.get('/echo', function(req, res, next) {


    login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
        if (err) return console.error(err);

        api.setOptions({listenEvents: true});

        var stopListening = api.listen((err, event) => {
            if (err) return console.error(err);

            switch (event.type) {
                case "message":
                    if (event.body === '/stop') {
                        api.sendMessage("Goodbye...", event.threadID);
                        return stopListening();
                    }
                    api.markAsRead(event.threadID, (err) => {
                        if (err) console.log(err);
                    });
                    api.sendMessage("Peter bot:" + event.body, event.threadID);
                    break;
                case "event":
                    console.log(event);
                    break;
            }
        });
    });
});



module.exports = router;
