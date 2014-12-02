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
	$scope.photos = [];

	var photos = Camera.getPictures();

	$scope.newPhoto = function() {
		Camera.newPicture().then(function(imageURI) {
		  $scope.photos.push(imageURI);
		  Photo.save(imageURI);
		}, function(err) {
		  console.err(err);
		}, {
		  quality: 40,
		  targetWidth: 320,
		  targetHeight: 320,
		  saveToPhotoAlbum: false
		});
	}

});
