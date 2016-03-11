angular.module('firebaseDemo')

.controller('BroadcastController', function($scope, broadcastFactory) {
  $scope.isEditable = false;
  $scope.broadcastName = '';
  $scope.isButtonEnabled = function() {
    return ($scope.broadcastName === 'undefined') || ($scope.broadcastName.length < 1);
  };
  $scope.startBroadcast = function() {
    $scope.isEditable = true;
    $scope.broadcastFromFireBase = broadcastFactory.getBroadcast($scope.broadcastName);
    $scope.broadcastFromFireBase.$set('');
    $scope.broadcastFromFireBase.$bind($scope, 'broadcast');
  };
})

.controller('BroadcastViewerController', function($scope, broadcastFactory) {
  $scope.dropdownMessage = 'Retrieving Broadcasts...';
  $scope.broadcasts = broadcastFactory.getAllBroadcasts();
  $scope.broadcastSelected = function() {
    $scope.broadcast = broadcastFactory.getBroadcast($scope.broadcastToView);
  }
  $scope.broadcasts.$on('loaded', function() {
    $scope.dropdownMessage = 'Select a broadcast';
  });
})

.factory('broadcastFactory', function($firebase,FIREBASE_URL) {
  return {
    getBroadcast: function(key) {
      return $firebase(new Firebase(FIREBASE_URL + '/' + key));
    },
    getAllBroadcasts: function() {
      return $firebase(new Firebase(FIREBASE_URL));
    }
  };
});