
require('./models');
var mongoose = require('mongoose');
var _ = require('underscore');
var conf = require(__dirname+'/../config');

var Tweet = mongoose.model('Tweet');

exports.crawl = function(callback){
  var Twitter = require('ntwitter');
  var twitter = new Twitter(conf);
  console.log('page 1');
  twitter.getUserTimeline({page: 1}, function(err, res){
    if(err){
      console.error('error');
      console.error(err);
      process.exit(1);
    }
    else{
      _.each(res, function(i){
        console.log('@'+i.user.screen_name+' '+i.text);
        var tweet = new Tweet({
          user_id : i.user.id,
          status_id : i.id,
          text : i.text
        });
        tweet.save(function(err){
          if(err){
            if(err.err.match(/duplicate key/i)){
              console.log('tweet already stored.');
            }
            else{
              console.error(err);
            }
          }
        });
      });
    }
  });  
};
