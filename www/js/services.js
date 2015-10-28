angular.module('starter.services', [])

.factory('Camera', ['$q', function($q) {
  return {
    newPicture: function(options) {
      var q = $q.defer();
      navigator.camera.getPicture(function(imageData) {
        var imageBase64 = 'data:image/png;base64,'+imageData;
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
    }
  }
}]);


