Template.followUsers.helpers({
  // getters
  'foundUser': function(){
    return Session.get('foundUser');
  },

  'recommendedUsers': function(){
    return Session.get('recommendedUsers');
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
    // return false to prevent page refresh
    return false;
  },

  // click on html element w/ id 'follow'...
  'click #follow': function(){
    // calling server-defined method directly in the client
    Meteor.call('followUser', Session.get('foundUser').username);
  },

  'click #followRec': function(event) {
    Meteor.call('followUser', this.username);
  }
});

Template.followUsers.onRendered(function () {
  Meteor.call('recommendUsers', function(err, res) {
    Session.set('recommendedUsers', res);
  });
});
