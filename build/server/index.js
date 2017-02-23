'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use('/dist', _express2.default.static('dist'));

app.get('*', function (req, res) {
  res.sendFile(_path2.default.resolve(__dirnamde + '/../../public/index.html'));
});

app.listen(3000, function () {
  console.log('OBowling app listening on dport 3000!');
});

module.exports = app;