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
  console.error('in the subscribe');
  // this.subscribe('tweets');

  // allows for reactive join that updates your twiiter feed as you follow new users
  if (Meteor.user()) {
    this.subscribe('tweets', Meteor.user().username);
    this.subscribe('ownTweets', Meteor.user().username);
  }
});