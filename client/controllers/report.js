
waldoApp.controller('reportController', function($scope, $routeParams, wlReport) {
  $scope.report = wlReport.reportCollection[$routeParams.id];
  $scope.searchResults = $scope.report;

  var searchState = {
    expandedRow: null
  };

  $scope.getTime = function(event) {
    return new Date(event.timestamp).toLocaleString();
  }

  $scope.expandEvent = function(index) {
    if (searchState.expandedRow === index) {
      searchState.expandedRow = null;
    } else {
      searchState.expandedRow = index;
    }
  }

  $scope.expandedIndex = function(index) {
    return searchState.expandedRow === index;
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
