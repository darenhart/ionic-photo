angular.module('starter.services', ['ngResource',])


// send and get photo to the server
.factory('Photo', 
	function($http) {

		var Photo = {};
		var urlBase = 'http://udkk7ed3fff5.darenhart.koding.io:3000/api/photo/';

		Photo.get =  function(id) {
			id = id || '';
			return $http.get(urlBase + id);
		};

		// send photo to the server
		Photo.save = function(imageBase64) {
			$http.post(urlBase, {img:imageBase64}).success(function (data) {
			});
			return;
		}

		return Photo;
	}
)

// open camera, take a photo and send to the server
.factory('Camera', ['$q', 'Photo', function($q, Photo) {
  return {
    newPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(imageData) {
        var imageBase64 = 'data:image/png;base64,'+imageData;
		// send image to server
		Photo.save(imageBase64);
        q.resolve(imageBase64);
      }, function(err) {
        q.reject(err);
      }, {
		  quality:40,
		  targetWidth:150,
		  targetHeight:150,
		  destinationType: Camera.DestinationType.DATA_URL
	  });
      
      return q.promise;
    },
	getPictures: function() {
 		console.log('getting pictures');

	}
  }
}])


.factory('Friends', ['$resource', 
  function($resource) {
    return $resource('http://udkk7ed3fff5.darenhart.koding.io:3000/api/contact/', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
