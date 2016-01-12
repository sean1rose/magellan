// terminal

Meteor.publishComposite('tweets', function(username){
  return {
    // watches for changes in the Relationships db
    find: function(){
      // returns a reactive cursor for a list of relationships, which is passed to each of the child's find() function
      return Relationships.find({follower: username});
    },
    children: [{
      find: function(relationship){
        // the child will then query for Tweets associated w/ each user passed into it
        return Tweets.find({user: relationship.following});
      }
    }]
  }
});

// want to see own tweets
Meteor.publish('ownTweets', function(username){
  return Tweets.find({user: username});
});

// List of all usernames
Meteor.publish('users', function(username){
  return Meteor.users.find({}, {
    fields: { 'username': 1 },
    limit: 100
  });
});

// list of all usernames the current user is following
Meteor.publish('followings', function(username){
  return Relationships.find({ follower: username });
});

Meteor.publish('followers', function(username){
  return Relationships.find( { following: username });
})