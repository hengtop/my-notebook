import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Router1 from "./pages/router1";
import Router2 from "./pages/router2";
import Router2s from "./pages/router2s";
import Test1 from "./pages/test1";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="router1" element={<Router1 />}></Route>
          <Route path="router2" element={<Router2s />}>
            <Route index element={<span>没有</span>} />
            <Route path=":numberId" element={<Router2 />} />
          </Route>
          <Route path="test1" element={<Test1 />}></Route>

          <Route path="*" element={<h2>404</h2>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
