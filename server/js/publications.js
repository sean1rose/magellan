// with autopublish removed, need to define what data should be available to users of the application
// 'tweets' becomes the name of the published data, which is basically all data from Tweets collection
Meteor.publish('tweets', function(){
  // this would return all tweets...
  // return Tweets.find();

  // but want tweets from only those people you are following...
  if (this.userId){
    // Find user w/ a particular name/userid, assign to var
    var username = Meteor.users.findOne({_id: this.userId}).username;
    var currentFollowings = UserUtils.findFollowings(username);
    // find all documents in users collection where the user field matches currentFollowings...
    return Tweets.find({user: { $in: currentFollowings}});
  }
})