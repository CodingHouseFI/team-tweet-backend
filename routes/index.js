var express = require('express');
var router = express.Router();

import Twitter from 'twitter';

router.get('/', function(req, res, next) {
  let { accessTokenKey, accessTokenSecret, tweetText } = req.query;

  var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
  });

  let { callback } = req.query;

  client.post("statuses/update", { status: tweetText }, function(err, tweet) {
    if (err) {
      console.log(err);
      res.status(500).send("Something wrong happened");
      return;
    }
    res.send(`${callback}({ "response": "ok" })`);
  });

});

module.exports = router;
