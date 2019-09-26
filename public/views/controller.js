angular.module('app', [])
  .controller('Controller', function($scope, $http,) {
    var ctrl = this;
    ctrl.response = "";
    ctrl.getDataFromServer = function() {
        $http({
            method: 'GET',
            url: 'http://localhost:3000/search?key='+$scope.bus+''
        }).then(function successCallback(response) {
            ctrl.response = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    };

    

    ctrl.generatepdf = function() {
    };
  });