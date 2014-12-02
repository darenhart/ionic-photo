angular.module('starter.services', ['ngResource'])

.factory('Photo', ['$resource', 
  function($resource) {
    return $resource('http://udkk7ed3fff5.darenhart.koding.io:3000/api/contact/get', {}, {
      query: {method:'GET', isArray:true}
    });
  }])

.factory('Camera', ['$q', function($q) {
  return {
    newPicture: function(options) {
		console.log(Friends.query());
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
		// send image to server
	
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

		convertImgToBase64(result, function(base64img){
			$http.post('http://udkk7ed3fff5.darenhart.koding.io:3000/api/contact/get');

			console.log(base64img);
		});


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
    return $resource('http://udkk7ed3fff5.darenhart.koding.io:3000/api/contact/get', {}, {
      query: {method:'GET', isArray:true}
    });
  }]);
