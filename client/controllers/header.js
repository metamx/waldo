
waldoApp.controller('headerController', function($scope, $location) {
  $scope.getNavClass = function(path) {
    if ($location.path() === path) {
      return 'active'
    } else {
      return ''
    }
  };
});
