
var SERVER = 'http://ec2-54-200-114-157.us-west-2.compute.amazonaws.com:3001';
//var SERVER = 'http://localhost:3000';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
})

.controller('UserNewCtrl', function($scope, $http, $location) {
  $scope.user = {};

  $scope.save = function() {
    $http.post(SERVER+'/api/user', $scope.user).success(function(data) {
      $scope.user = {};
      $location.path('/app/home');
    });
  };	


})

.controller('UserLoginCtrl', function($scope, $http) {
  $scope.user = {};

  $scope.login = function() {
    $http.post(SERVER+'/api/user', $scope.user).success(function(data) {
      $scope.user = {};
    });
  };	

})

.controller('NewCtrl', function($scope, $http, $location, $ionicLoading, Camera) {
  $scope.item = {};

  $scope.save = function() {
    $ionicLoading.show();

    $http.post(SERVER+'/api/item', $scope.item).success(function(data) {
      $ionicLoading.hide();

      $scope.item = {};
      $location.path('/app/items');
    });
  };

	$scope.newPhoto = function() {
		Camera.newPicture().then(function(imageURI) {
      console.log(imageURI);
		  $scope.item.img = imageURI;
		}, function(err) {
		  console.log(err);
		});
	};

  $scope.newPhoto();
})	

.controller('ItemsCtrl', function($scope, $http, $ionicLoading) {
  $scope.items = {};

  $ionicLoading.show();

  $http.get(SERVER+'/api/item').success(function(data) {
    $ionicLoading.hide();
    $scope.items = data;
  });
})

.controller('ItemCtrl', function($scope, $http, $location) {
  var parms = $location.path();
  var itemId = parms.replace(/^.*[\\\/]/, '')
  $scope.item = {};

  $http.get(SERVER+'/api/item/'+itemId).success(function(data) {
    $scope.item = data;
  });
});
