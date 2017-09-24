var TwitterPackage = require('twitter');

var _ = require('lodash');
var moment = require('moment');
var json2csv = require('json2csv');
var fs = require('fs');

var secret = {
    consumer_key: '4YKuG8bT9QWTJppawbdO6rPgF',
    consumer_secret: 'H2qqp03wC0PkLvXtKybpDoZo2y2GI1QiqAeGM7dwamfjZOe3yp',
    access_token_key: '911875705406984192-Ifww7vIRVROwXSFxlkday7lCF68beu6',
    access_token_secret: 'VgyoypyaG39p0jDe4JEFHW3H3qtSNm9RtPTBGYbCl7dkc'
}

var Twitter = new TwitterPackage(secret);


//Format Time and other var

var allArbnbTweets = [];
var max_Id = undefined;


var params = {
    q: 'airbnb',
    max_id: max_Id,
    count: 100
};

// Save file fn

function saveToCsvFile(name, twittes) {
    
    
    var csv = json2csv({
        data: twittes
    });

    fs.writeFile(name, csv, function(error) {
        if (error) {
            console.log(error);
        }
        console.log('file saved: ' + name);
    });
}

// Get Twittes and then filter them 24 hours back, save to the file


Twitter.get('search/tweets', params, function(error, tweet, response) {
    if (error) {
        console.log(error);
    }
    //  console.log(tweet);  // Tweet body.
    //  console.log(response);  // Raw response object.

    var dateTo = moment().valueOf();
    var dateFrom = moment().subtract(1, 'd').valueOf();
    var twittesInRange = [];
    var allValues = [];

    _.forEach(tweet, function(value, key) {
 
        _.forEach(value, function(value) {
            
            
            allValues.push(value);
            
            var twitCreated = moment.utc(value['created_at']).valueOf();
            
            
            
            if (twitCreated > dateFrom && twitCreated < dateTo) {

                twittesInRange.push(value);

            }


        });


    });

    console.log('Twittes in last 24 hours', twittesInRange.length);
    console.log('All Twittes from Twitter', allValues.length);

    saveToCsvFile('twittes_about_aribnb.csv', twittesInRange);

});