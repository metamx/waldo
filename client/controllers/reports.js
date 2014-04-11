
waldoApp.controller('reportsController', function($scope, wlReport) {
  $scope.Report = wlReport;
  console.log('report size: ' + $scope.Report.reportCollection.length);
});
