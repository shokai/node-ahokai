
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/node_ahokai', function(err){
  if(err){
    console.error(err);
    process.exit(1);
  }
});

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var TweetSchema = new Schema({
  user_id: {type: Number},
  status_id: {type: Number, unique: true},
  text: {type: String},
  created_at: {type: Date, default: Date.now}
});

var Tweet = mongoose.model('Tweet', TweetSchema);

Tweet.find_by_id = function(id){
  return this.find({'_id':id});
};