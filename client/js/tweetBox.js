Template.tweetBox.helpers({
  // tweetbox getters
  charCount: function() {
    return 140 - Session.get('numChars');
  },

  charClass: function() {
    if (Session.get('numChars') > 140) {
      return 'errCharCount';
    } else {
      return 'charCount';
    }
  },

  disableButton: function() {
    // can't click tweet button if too long/short/not logged in
    if (Session.get('numChars') <= 0 ||
        Session.get('numChars') > 140 ||
        !Meteor.user()) {
      return 'disabled';
    }
  }
});

// event listener
Template.tweetBox.events({
  'input #tweetText': function(){
    Session.set('numChars', $('#tweetText').val().length);
  },

  // client side insert of data into db
  'click button': function() {
    var tweet = $('#tweetText').val();
    $('#tweetText').val("");
    Session.set('numChars', 0);
    // if logged in as an authenticated user, insert data (including username), into mongodb
    Meteor.call('insertTweet', tweet);
    console.error('tweet added on client side submit -', tweet);
    // insertTweet is the server side function call
  }
});

Template.tweetBox.onRendered(function () {
  Session.set('numChars', 0);
});
