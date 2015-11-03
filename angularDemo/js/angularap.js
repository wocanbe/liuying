'use strict';

var stuServices = angular.module('stuServices', ['ngResource']);

stuServices.factory('stus', ['$resource',//注册服务
  function($resource){
    return $resource('stu/:sid.json', {}, {
      query: {method:'GET', params:{sid:'stus'}, isArray:true}
    });
  }
]);

var stuCtrls = angular.module('stuCtrls', []);

stuCtrls.controller('stuListCtrl', [
  '$scope', 
  'stus',//使用的服务
  function($scope, stus) {
      $scope.stus = stus.query();
      $scope.orderProp = 'sid';
  }
]);

stuCtrls.controller('stuDetailCtrl', ['$scope', '$routeParams', 'stus',
function($scope, $routeParams, stus) {
    $scope.stus = stus.get(
        {sid: $routeParams.sid},//设置sid作为json文件名，sid来自路由设置
        function(stu) {$scope.stu = stu;}//获取数据成功后的回调函数
    );
}]);

var stu_admin= angular.module('stu_admin',['ngRoute','stuServices','stuCtrls']);
stu_admin.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/stus', {
        templateUrl: 'partials/list.html',
        controller: 'stuListCtrl'
      }).
      when('/stu/:sid', {
        templateUrl: 'partials/detail.html',
        controller: 'stuDetailCtrl'
      }).
      otherwise({
        redirectTo: '/stus'
      });
  }
]);