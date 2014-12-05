angular.module('starter.services', ['ngResource',])



.factory('Photo', 
	function($http) {

		var Photo = {};
		var urlBase = 'http://udkk7ed3fff5.darenhart.koding.io:3000/api/photo/';

		Photo.get =  function(id) {
			id = id || '';
			return $http.get(urlBase + id);
		};

		Photo.save = function(path) {
			function convertImgToBase64(url, callback, outputFormat){
				var canvas = document.createElement('CANVAS');
				var ctx = canvas.getContext('2d');
				var img = new Image;
				img.crossOrigin = 'Anonymous';
				img.onload = function(){
					canvas.height = img.height;
					canvas.width = img.width;
					ctx.drawImage(img,0,0);
					var dataURL = canvas.toDataURL(outputFormat || 'image/png');
					callback.call(this, dataURL);
					// Clean up
					canvas = null; 
				};
				img.src = url;
			}
			convertImgToBase64(path, function(base64img){
				$http.post(urlBase, {img:base64img}).success(function (data) {

				});
			});
		}

		return Photo;
	}
)

.factory('Camera', ['$q', 'Photo', function($q, Photo) {
  return {
    newPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
		// send image to server
		Photo.save(result);

        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
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
