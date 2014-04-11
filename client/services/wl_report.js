
waldoApp.factory('wlReport', function() {
  function Report(options) {
    this.name = options.name;
    this.data = options.data;
    this.type = options.type;
  }

  var reportCollection = [];

  return {
    Report: Report,
    reportCollection: reportCollection
  };
});
