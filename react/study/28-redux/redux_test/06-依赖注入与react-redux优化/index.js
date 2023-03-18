import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'
import {Provider} from 'react-redux'//依赖注入，使得所有的容器组件都有store了
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


//react-redux可以自动检测了状态变化了，不用自己写检测状态了