
waldoApp.controller('chartController', function($scope, wlSearchData, wlSearchState) {
  $scope.searchResults = wlSearchData;

  $scope.emptyList = function() {
    return (wlSearchState.state === 'displaying' && wlSearchData.length === 0);
  }

  $scope.loading = function() {
    return wlSearchState.state === 'loading';
  }

  $scope.getTime = function(event) {
    return new Date(event.timestamp).toLocaleString();
  }

  $scope.expandEvent = function(index) {
    if (wlSearchState.expandedRow === index) {
      wlSearchState.expandedRow = null;
    } else {
      wlSearchState.expandedRow = index;
    }
  }

  $scope.expandedIndex = function(index) {
    return wlSearchState.expandedRow === index;
  }

  $scope.expandedEvent = function(event) {
    var html = [];
    for (var key in event) {
      var val = event[key];
      html.push(key + '=' + val);
    }
    return html.join('\n');
  }
});
