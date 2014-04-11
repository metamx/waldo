
waldoApp.directive('wlCountChart', function() {
  return {
    restrict: 'E',
    replace: false,
    scope: true,
    template: '<svg id="count-graph"></svg>',
    link: function (scope, element, attrs) {
      scope.$watchCollection('searchResults', constructGraph);

      constructGraph();

      function constructBarData() {
        return scope.searchResults.data.map(function(event) {
          return Math.floor((new Date(event.timestamp)).getTime() / 1000);
        });
      }

      function constructGraph() {
        if (scope.searchResults.data.length === 0) return;

        // heavily borrows from http://bl.ocks.org/mbostock/3048450
        var values = constructBarData();

        // A formatter for counts.
        var formatCount = d3.format(',.0f');

        var margin = {top: 0, right: 0, bottom: 30, left: 0},
          width = 1140 - margin.left - margin.right,
          height = 200 - margin.top - margin.bottom;

        var x = d3.scale.linear()
          .domain([d3.min(values), d3.max(values)])
          .range([0, width]);

        // Generate a histogram using ten uniformly-spaced bins.
        var data = d3.layout.histogram()
          .bins(x.ticks(10))
          (values);

        var y = d3.scale.linear()
          .domain([0, d3.max(data, function(d) { return d.y; })])
          .range([height, 0]);

        var xAxis = d3.svg.axis()
          .scale(x)
          .ticks(5)
          .tickFormat(function(timestamp) {
            return (new Date(timestamp * 1000)).toLocaleString();
          })
          .orient('bottom');

        var svg = d3.select('#count-graph')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var bar = svg.selectAll('.bar')
          .data(data)
          .enter().append('g')
          .attr('class', 'bar')
          .attr('transform', function(d) { return 'translate(' + x(d.x) + ', ' + y(d.y) + ')'; });

        bar.append('rect')
          .attr('x', 1)
          .attr('width', width / 10)
          .attr('height', function(d) { return height - y(d.y); });

        bar.append('text')
          .attr('dy', '.75em')
          .attr('y', 6)
          .attr('x', x(data[0].dx) / 2)
          .attr('text-anchor', 'middle')
          .text(function(d) { return formatCount(d.y); });

        svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0, ' + height + ')')
          .call(xAxis);
      }
    }
  };
});
