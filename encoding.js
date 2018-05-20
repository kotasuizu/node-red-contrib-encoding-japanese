/**
 * Copyright (c) 2018 Kota Suizu
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 **/

module.exports = function(RED) {
  "use strict";
  var encoding = require('encoding-japanese');

  // EncodingJapanese NodeIO処理
  function EncodingJapanese(n) {
    RED.nodes.createNode(this, n);

    this.fromencode = n.fromencode;
    this.toencode = n.toencode;

    var node = this;
    this.on('input', function(msg) {
      var encodeStr = encoding.convert(msg.payload, {
        to: node.toencode, // to_encoding
        from: node.fromencode // from_encoding
      });
      var result = encoding.codeToString( encodeStr );
      msg.payload = result;
      node.send(msg);
      node.log(RED._('Succeeded to convert String.'));
    });
  }
  RED.nodes.registerType("Encoding-Japanese", EncodingJapanese);

}
