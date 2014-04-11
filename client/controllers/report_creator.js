
waldoApp.controller('reportCreatorController', function($scope, wlSearchData, wlSearchState) {
  $scope.chartTypes = [
    { name: 'table' }
  ];

  $scope.chartType = $scope.chartTypes[0];

  $scope.emptyList = function() {
    return (wlSearchState.state === 'displaying' && wlSearchData.data.length === 0);
  }

  $scope.loading = function() {
    return wlSearchState.state === 'loading';
  }
});
