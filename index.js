var onFinished = require('on-finished');

// sets up lyticsServer listening on 5151
// var lyticsServer = require('./server/server');

// set up  socket from host app to 5151
// var socketClient = require('./host/socket');



module.exports = function(options) {


  return function (req, res, next) {
    // namespacing time properties
    req.lyticsStartAt = process.hrtime();
    req.lyticsStartTime = Date.now();
    
    req._remoteAddress = getIp(req);

    onFinished(res, logRequest);
    next();

    function logRequest() {
      var requestData = {
        url: req.url,
        method: req.method,
        requestTime: req.lyticsStartTime,
        duration: getElapsedInMs(req.lyticsStartAt),
        ip: "" + getIp(req),
        body: req.body,
        query: req.query
      };

      socketClient.emit('request:log', requestData);
    }
  }

  function getElapsedInMs(hrTime) {
    var elapsedHrTime = process.hrtime(hrTime);
    return elapsedHrTime[0] * 1e9 + elapsedHrTime[1];
  }

  function getIp(req) {
    return req.ip
      || req._remoteAddress
      || (req.connection && req.connection.remoteAddress)
      || undefined;
  }

}
