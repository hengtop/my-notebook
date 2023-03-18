//自定义实现一个简化版的vuex
import Vue from 'vue';
 const Store = function(options = {}) {
  const { state = {}, mutations = {}, getters={} } = options;
  const computed = {};
  const store = this;
  store.getters = {};
  for (let [key, fn] of Object.entries(getters)) {
    computed[key] = function () {
      return fn(store.state, store.getters)
    }
    Object.defineProperty(store.getters, key, {
      get: function () {
        console.log(store)
        return store._vm[key];
      }
    })
  }
  this._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  this._mutations = mutations
}




Store.prototype.commit = function (type, payload) {
  if (this._mutations[type]) {
    this._mutations[type](this.state, payload);
  }
}
//将state挂载到原型上
Object.defineProperties(Store.prototype, {
  state: {
    get() {
      return this._vm._data.$$state
    }
  }
})
export default {Store};


