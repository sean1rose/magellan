// chrome console

Template.tweetFeed.helpers({
  'tweetMessage': function() {
    return Tweets.find({}, {
      sort: {timestamp: -1}, 
      limit: 10 
    });
  }
});

// client subscription to server publishing of tweets
Template.tweetFeed.onCreated(function() {
  // allows for reactive join that updates your twiter feed as you follow new users
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
  }
});