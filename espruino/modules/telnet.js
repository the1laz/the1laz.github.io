exports.createServer = function(callback) {
  require("net").createServer(function (connection) {
    connection.pipe(LoopbackA);
    LoopbackA.pipe(connection);
    LoopbackB.setConsole();
    callback();
  }).listen(23);
};

