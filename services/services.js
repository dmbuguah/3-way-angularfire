angular.module('firebaseDemo').factory('broadcastFactory', function($firebase,FIREBASE_URL) {
  return {
    getBroadcast: function(key) {
      return $firebase(new Firebase(FIREBASE_URL + '/' + key));
    },
    getAllBroadcasts: function() {
      return $firebase(new Firebase(FIREBASE_URL));
    }
  };
});