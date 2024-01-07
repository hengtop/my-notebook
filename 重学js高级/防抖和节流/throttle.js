class Throttle {
  v1(fn, interval) {
    let start = 0;
    function _throttle(...args) {
      const end = new Date().getTime();
      if (end - start > interval) {
        fn.apply(this, args);
        start = end;
      }
    }

    return _throttle;
  }

  // 第一次不执行
  v2(fn, interval, options = { leading: true }) {
    let start = 0;
    const { leading } = options;
    function _throttle(...args) {
      const end = new Date().getTime();
      if (!leading && !start) start = new Date().getTime();
      if (end - start > interval) {
        fn.apply(this, args);
        start = end;
      }
    }

    return _throttle;
  }
  // 最后一次执行
  v3(fn, interval, options = { leading: true, trailing: false }) {
    let start = 0;
    let timer = null;
    const { leading, trailing } = options;
    function _throttle(...args) {
      const end = new Date().getTime();
      if (!leading && !start) start = new Date().getTime();
      const remainTime = interval - (end - start);
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        fn.apply(this, args);
        start = end;

        // 当事件触发的时候不需要加定时器
        return;
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          // 初始化
          timer = null;
          // 这里需要根据第一次是否执行来设置时间，否则会导致执行两次的问题
          start = leading ? new Date().getTime() : 0;
          fn.apply(this, args);
        }, remainTime);
      }
    }

    return _throttle;
  }
  // 取消功能
  v4(fn, interval, options = { leading: true, trailing: false }) {
    let start = 0;
    let timer = null;
    const { leading, trailing } = options;
    function _throttle(...args) {
      const end = new Date().getTime();
      if (!leading && !start) start = new Date().getTime();
      const remainTime = interval - (end - start);
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        fn.apply(this, args);
        start = end;

        // 当事件触发的时候不需要加定时器
        return;
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          // 初始化
          timer = null;
          // 这里需要根据第一次是否执行来设置时间，否则会导致执行两次的问题
          start = leading ? new Date().getTime() : 0;
          fn.apply(this, args);
        }, remainTime);
      }
    }

    _throttle.cancel = function () {
      if (timer) clearTimeout(timer);
      timer = null;
      start = 0;
    };

    return _throttle;
  }
  // 返回值
  v5(fn, interval, options = { leading: true, trailing: false, callback }) {
    let start = 0;
    let timer = null;
    let res = null;
    const { leading, trailing, callback } = options;
    function _throttle(...args) {
      const end = new Date().getTime();
      if (!leading && !start) start = new Date().getTime();
      const remainTime = interval - (end - start);
      if (remainTime <= 0) {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        res = fn.apply(this, args);
        start = end;
        callback(res);

        // 当事件触发的时候不需要加定时器
        return;
      }

      if (trailing && !timer) {
        timer = setTimeout(() => {
          // 初始化
          timer = null;
          // 这里需要根据第一次是否执行来设置时间，否则会导致执行两次的问题
          start = leading ? new Date().getTime() : 0;
          res = fn.apply(this, args);
          callback(res);
        }, remainTime);
      }
    }

    _throttle.cancel = function () {
      if (timer) clearTimeout(timer);
      timer = null;
      start = 0;
    };

    return _throttle;
  }
}

export { Throttle };
