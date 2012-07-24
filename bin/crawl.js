
var Ahokai = require('../lib/ahokai');
var ahokai = new Ahokai.Bot();
var mongoose = require('mongoose');

var crawl = function(page, callback){
  console.log('[page:'+page+']');
  ahokai.crawl({page: page}, function(err, tweet){
    if(err){
      if(err.match(/duplicate/i)){
        console.error(tweet.text+' => '+err);
      }
      else{
        console.error(err);
      }
    }
    else{
      console.log(tweet.text+' => saved!');
    }
  }, callback);
};

var page = 1;
var on_complete = function(){
  if(page < 10){
    setTimeout(function(){
      crawl(page+=1, on_complete);
    }, 2000);
  }
  else{
    mongoose.disconnect();
  }
};
crawl(page, on_complete);
