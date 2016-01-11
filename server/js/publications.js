// terminal

// with autopublish removed, need to define what data should be available to users of the application
// 'tweets' becomes the name of the published data, which is basically all data from Tweets collection
Meteor.publish('tweets', function(){
  // this would return all tweets...
  // return Tweets.find();

  // but want tweets from only those people you are following...
  if (this.userId){
    var username = Meteor.users.findOne({_id: this.userId}).username;
    var currentFollowings = UserUtils.findFollowings(username);
      // if don't want to add own tweets to list of published tweets, then remove...
    currentFollowings.push(username);
    return Tweets.find({user: { $in: currentFollowings}});
  }
});