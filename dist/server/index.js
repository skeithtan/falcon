"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.get("/", function (request, response) {
    response.send("Hello, World!");
});

app.listen(_config2.default.server.port, function () {
    console.info("Server listening at port " + _config2.default.server.port);
});