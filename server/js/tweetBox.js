Meteor.methods({
  //data insertion of a tweet on the client side to server side
  insertTweet: function(tweet) {
    if (Meteor.user()) {
      Tweets.insert({
        message: tweet,
        user: Meteor.user().username,
        timestamp: new Date()
      });
      console.error('insert tweet - ', tweet);
    }
  }
});
