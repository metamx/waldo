
waldoApp.directive('wlTabular', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: true,
    templateUrl: '/templates/wl_tabular.html',
    link: function (scope, element, attrs) {
      scope.$watchCollection('searchResults', constructGraph);

      constructGraph();

      function constructBarData() {

      }

      function constructGraph() {
        var barData = constructBarData();
      }
    }
  };
});
