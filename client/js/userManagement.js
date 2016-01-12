Template.userManagement.events({
  // listen for clicks on signup button
  'click #signup': function() {
    var user = {
      username: $('#signup-username').val(),
      password: $('#signup-password').val(),
      profile: {
        fullname: $('#signup-fullname').val()
      }
    };

    // made available via accounts-ui package
    Accounts.createUser(user, function (error) {
      if(error) alert(error);
    });
  },

  'click #login': function() {
    var username = $('#login-username').val();
    var password = $('#login-password').val();

    // Attempt to login user
    Meteor.loginWithPassword(username, password, function(error) {
      if(error) alert(error);
    });
  },

  'click #logout': function() {
    Meteor.logout();
  }
});

Template.userManagement.helpers({
  'tweets': function(){
    if (Meteor.user()){
      return Tweets.find({ user: Meteor.user().username }).count();
    }
  },

  'following': function(){
    if (Meteor.user()){
      return Relationships.find({ follower: Meteor.user().username }).count();
    }
  },

  'followers': function(){
    if (Meteor.user()){
      return Relationships.find({ following: Meteor.user.username }).count();
    }
  }
});

Template.followUsers.onCreated(function(){
  if (Meteor.user()){
    this.subscribe('followings', Meteor.user().username);
    this.subscribe('followers', Meteor.user().username);
    this.subscribe('tweets', Meteor.user().username);
  }
});
