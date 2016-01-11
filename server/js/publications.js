// terminal

// with autopublish removed, need to define what data should be available to users of the application
// 'tweets' becomes the name of the published data, which is basically all data from Tweets collection
Meteor.publish('tweets', function(){
  // this would return all tweets...
  return Tweets.find();

  // if (this.userId){
  //   var username = Meteor.users.findOne({_id: this.userId}).username;
  //   var currentFollowings = UserUtils.findFollowings(username);
  //   console.log('publish - ', currentFollowings);
  //   return Tweets.find({user: { $in: currentFollowings}});
  // }
  // but want tweets from only those people you are following...
  // if (this.userId) {
  //   console.log('in publish');
  //   var username = Meteor.users.findOne({_id: this.userId}).username;
  //   var currentFollowings = UserUtils.findFollowings(username);
  //   console.log('1 tweets - ', Tweets.find({user: { $in: currentFollowings }}));
  //   return Tweets.find({user: { $in: currentFollowings }});
  // }
});