// subscribe to publishing of tweets that was set up in server file
Template.tweetFeed.onCreated(function(){
  this.subscribe('tweets');
});