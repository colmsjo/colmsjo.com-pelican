// Generated by IcedCoffeeScript 1.7.1-c
(function() {
  var SignatureEngine, burn, processor;

  burn = require('./burner').burn;

  processor = require('./processor');

  SignatureEngine = require('./sigeng').SignatureEngine;

  exports.box = burn;

  exports.unbox = processor.do_message;

}).call(this);
