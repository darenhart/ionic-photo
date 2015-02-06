angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
	$scope.online = navigator.onLine;
	$scope.plat = navigator.platform;

})

.controller('FriendsCtrl', function($scope, $http, Friends) {
 	$scope.friends = Friends.query();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('FotosCtrl', function($scope, Camera, Photo) {

	$scope.order = '-_id';

	Photo.get().success(function(data) {
		$scope.photos = data;
	});

	$scope.newPhoto = function() {
		Camera.newPicture().then(function(imageURI) {
		  $scope.photos.push({img:imageURI});
		}, function(err) {
		  console.err(err);
		});
	}

})

.controller('FotoDetailCtrl', function($scope, $stateParams, Photo) {
	Photo.get($stateParams.fotoId).success(function(data) {
		$scope.photo = data; 
	});
})
;
