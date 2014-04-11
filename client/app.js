
var waldoApp = angular.module('waldoApp', ['ngRoute']);

waldoApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/templates/search.html'
  }).when('/reports', {
    templateUrl: '/templates/reports.html',
    controller: 'reportsController'
  }).when('/reports/:id', {
    templateUrl: '/templates/report.html',
    controller: 'reportController'
  }).otherwise({
    redirectTo: '/'
  });
}]);
