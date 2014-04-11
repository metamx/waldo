
waldoApp.controller('reportCreatorController', function($scope, wlReport, wlSearchData, wlSearchState) {
  $scope.chartTypes = ['table'];
  $scope.chartName = 'untitled';
  $scope.chartType = $scope.chartTypes[0];

  $scope.createReport = function() {
    var type = $scope.chartType;
    var name = $scope.chartName;
    var data = wlSearchData.data;

    wlReport.reportCollection.push(
      new wlReport.Report({
        name: name,
        data: data,
        type: type
      })
    );
    alert('report created');
  };

  $scope.emptyList = function() {
    return (wlSearchState.state === 'displaying' && wlSearchData.data.length === 0);
  };

  $scope.loading = function() {
    return wlSearchState.state === 'loading';
  };
});
