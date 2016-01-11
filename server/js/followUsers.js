Meteor.methods({
  'findUser': function(username){
    // mongodb call to find the username, argument stems originally from client call Meteor.call('findUser')...
    return Meteor.users.findOne({
      username: username
    }, {
      fields: {'username': 1}
    });
  },

  'followUser': function(username){
    console.error('server side follow user');
    Relationships.insert({
      follower: Meteor.user().username,
      following: username
    });
  },

  'recommendUsers': function(){
    if (Meteor.user()){
      // returns list of users already following
      var currentFollowings = UserUtils.findFollowings(Meteor.user().username);

      var recUsers = Meteor.users.find({
        username: {
          $nin: currentFollowings
        }
      }, {
        fields: {'username': 1},
        limit: 5
      }).fetch();

      console.error('server side - ', recUsers);
      return recUsers;
    }
  },

  'currentFollowings': function(){
    console.error('currentFollowings in server ! - ', UserUtils.findFollowings(Meteor.user().username));
    return UserUtils.findFollowings(Meteor.user().username);
  }

});
