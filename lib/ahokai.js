
require('./models');
var mongoose = require('mongoose');
var _ = require('underscore');
var utils = require('./utils');
var conf = require(__dirname+'/../config');
var Tweet = mongoose.model('Tweet');
var Twitter = require('ntwitter');

var bot = function(){
  var twitter = new Twitter(conf);

  this.crawl = function(params, callback, on_complete){
    var defaults = {page: 1};
    var params = utils.merge(defaults, params);
    twitter.getUserTimeline(params, function(err, res){
      if(err){
        if(typeof callback === 'function') callback(err, res);
      }
      else{
        var save_tweet = function(tweets, index){
          var tw = tweets[index];
          var tweet = new Tweet({
            user_id: tw.user.id,
            status_id: tw.id,
            text: tw.text,
            tweeted_at: tw.created_at
          });
          tweet.save(function(err){
            if(err && typeof callback === 'function'){
              if(err.err.match(/duplicate key/i)){
                callback('Already stored (Tweet ID duplicated)', tweet);
              }
              else{
                callback(err, tweet);
              }
            }
            else{
              callback(null, tweet);
            }
            if(index < tweets.length-1) save_tweet(tweets, index+1, callback);
            else on_complete();
          });
        };
        save_tweet(res, 0);
      }
    });
  };
};

exports.Bot = bot;
