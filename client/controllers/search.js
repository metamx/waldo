
waldoApp.controller('searchController', function($scope, $http, wlSearchData, wlSearchState) {
  $scope.search = function() {
    var searchQuery = $scope.searchQuery;
    var querystring = searchQueryToQuerystring(searchQuery);

    $http.post('/search?' + querystring).then(function(result) {
      wlSearchState.state = 'displaying';
      wlSearchData.data = result.data.events;
      wlSearchState.expandedRow = null;
    }, function(reason) {
      wlSearchState.state = 'displaying';
      alert('Search request failed, displaying previous data.');
    });
    wlSearchState.state = 'loading';
  };

  function searchQueryToQuerystring(query) {
    if (!query) return '';
    return query.split(' ').join('&');
  }
});
