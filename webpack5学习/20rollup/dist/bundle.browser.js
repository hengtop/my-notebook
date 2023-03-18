(function (exports) {
  'use strict';

  const message = "hello rollup";
  console.log(message);

  exports.message = message;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}));
