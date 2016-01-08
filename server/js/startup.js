// to ensure that a user does not mistakenly follow the same user twice...
Meteor.startup(function(){
  // Meteor startup runs when server 1st starts up; ensureIndex is a mongodb operation to create an index & insure uniqueness
  Relationships._ensureIndex({follower: 1, following: 1}, {unique: 1});
});