
waldoApp.controller('reportsController', function($scope, $routeParams, wlReport) {
  $scope.report = wlReport.reportCollection[$routeParams.id];
  $scope.searchResults = $scope.report;

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
