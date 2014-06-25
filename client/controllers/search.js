
waldoApp.controller('searchController', function($scope, $http, wlSearchData, wlSearchState) {
  $scope.search = function() {
    $http.post('/search?', { filter: $scope.searchQuery }).then(function(result) {
      wlSearchState.state = 'displaying';
      wlSearchData.data = result.data.events;
      wlSearchState.expandedRow = null;
    }, function(reason) {
      wlSearchState.state = 'displaying';
      alert('Search request failed, displaying previous data.');
    });
    wlSearchState.state = 'loading';
  };
});
