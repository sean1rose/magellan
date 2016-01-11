// no var delcaration, so it's globally accessible (want it to be accessible in server file)
UserUtils = function() {};

// use this to find all the users a person is following...
UserUtils.findFollowings = function(username) {
  console.error('in user utils - ', username);
  // mongodb find 
  var currentFollowings = Relationships.find({
    follower: username
  }).fetch().map(function(data) {
    return data.following;
  });
  currentFollowings.push(Meteor.user().username);

  // console.error('currentfollowings - ', currentFollowings);
  return currentFollowings;
};
