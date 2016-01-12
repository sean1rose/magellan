Template.followUsers.helpers({
  // getters
  'foundUser': function(){
    return Session.get('foundUser');
  },

  'recommendedUsers': function(){
    if (Meteor.user()) {
      var currentFollowings = UserUtils.findFollowings(Meteor.user().username);

      var recUsers = Meteor.users.find({
        username: {
          $nin: currentFollowings
        }
      }, {
        fields: { 'username': 1 },
        limit: 5
      }).fetch();

      return recUsers;
    }
    // return Session.get('recommendedUsers');
  },

  'currentFollowings': function(){
    return UserUtils.findFollowings(Meteor.user().username);
    // return Session.get('currentFollowings');
  }
});

Template.followUsers.events({
  'submit form': function(event){
    // by using form element in html, can access form values via the event argument; here we're grabbing value from searchUser id
    var searchUser = event.target.searchUser.value;
    // findUser and foundUser will be defined on server side
    var foundUser = Meteor.call('findUser', searchUser, function(err, res){
      if (res) Session.set('foundUser', res);
    });
    $('#searchUser').val("");
    // return false to prevent page refresh
    return false;
  },

  // click on html element w/ id 'follow'...
  'click #follow': function(){
    // calling server-defined method directly in the client
    Meteor.call('followUser', Session.get('foundUser').username);
  },

  // listen for click event on followRec id (use this to refer to context in for-loop iteration)
  'click #followRec': function(event){
    Meteor.call('followUser', this.username);
  }
});

// As page renders, make call to recommendUsers server method to get a list of potential follow candidates
Template.followUsers.onCreated(function(){
  if (Meteor.user()){
    this.subscribe('users', Meteor.user().username);
    this.subscribe('followings', Meteor.user().username);
  }
})

Template.followUsers.onRendered(function(){
  Meteor.call('recommendUsers', function(err, res){
    Session.set('recommendedUsers', res);
  });
});
