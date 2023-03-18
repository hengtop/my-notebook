import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
//检测redux的状态是否改变，改变了就重新渲染下
store.subscribe(() => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
});



