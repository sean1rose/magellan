// chrome console

Template.tweetFeed.helpers({
  'tweetMessage': function() {
    return Tweets.find({}, { sort: {timestamp: -1}, limit: 10 });
  }
});

Template.tweetFeed.onCreated(function() {
  console.error('in the subscribe');
  this.subscribe('tweets');
  // if (Meteor.user()) {
  //   this.subscribe('tweets', Meteor.user().username);
  //   this.subscribe('ownTweets', Meteor.user().username);
  // }
});