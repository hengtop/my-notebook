class Debounce {
  // 普通版本
  v1(fn, delay = 500) {
    let time = null;
    return function (...args) {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
  // 第一次行动立即执行
  v2(fn, delay = 500, immediate = false) {
    let time = null;
    let invokeTime = null;
    let isInvoke = false;
    return function (...args) {
      if (time || invokeTime) {
        clearTimeout(time);
        clearTimeout(invokeTime);
      }
      if (immediate && !isInvoke) {
        fn.apply(this, args);
        isInvoke = true;
      } else {
        time = setTimeout(() => {
          fn.apply(this, args);
          isInvoke = false;
        }, delay);
      }
      if (immediate) {
        invokeTime = setTimeout(() => {
          isInvoke = false;
        }, delay);
      }
    };
  }
  // 添加取消功能
  v3(fn, delay = 500, immediate = false) {
    let time = null;
    let invokeTime = null;
    let isInvoke = false;
    function _debounce(...args) {
      if (time || invokeTime) {
        clearTimeout(time);
        clearTimeout(invokeTime);
      }
      if (immediate && !isInvoke) {
        fn.apply(this, args);
        isInvoke = true;
      } else {
        time = setTimeout(() => {
          fn.apply(this, args);
          isInvoke = false;
        }, delay);
      }
      invokeTime = setTimeout(() => {
        isInvoke = false;
      }, delay);
    }

    _debounce.cancel = function () {
      if (time || invokeTime) {
        clearTimeout(time);
        clearTimeout(invokeTime);
        time = null;
        isInvoke = false;
      }
    };
    return _debounce;
  }
  // 添加返回功能 当然还可以使用promise来实现返回功能
  v4(fn, delay = 500, immediate = false, callback) {
    let time = null;
    let invokeTime = null;
    let isInvoke = false;
    let res = null;
    function _debounce(...args) {
      if (time || invokeTime) {
        clearTimeout(time);
        clearTimeout(invokeTime);
      }
      if (immediate && !isInvoke) {
        res = fn.apply(this, args);
        callback(res);
        isInvoke = true;
      } else {
        time = setTimeout(() => {
          res = fn.apply(this, args);
          callback(res);
          isInvoke = false;
        }, delay);
      }
      invokeTime = setTimeout(() => {
        isInvoke = false;
      }, delay);
    }

    _debounce.cancel = function () {
      if (time || invokeTime) {
        clearTimeout(time);
        clearTimeout(invokeTime);
        time = null;
        isInvoke = false;
      }
    };
    return _debounce;
  }
}

export { Debounce };
