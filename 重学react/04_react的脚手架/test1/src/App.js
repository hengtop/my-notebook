import React from "react";
import CustomContextShareHook from "./context共享";
import ScrollPosition from "./scrollPosition";
import LocalStore from "./localStore";
//自定义hook,将一些公共的代码封装带一个函数中,自定义hook必须以use开头
function useLoggingLife(name) {
  React.useEffect(() => {
    console.log(`${name}组件创建出来`);
    return () => {
      console.log(`${name}销毁了`);
    };
  }, [name]);
}

function CustomHookDemo01() {
  useLoggingLife("CustomHookDemo01");
  return (
    <div>
      <h2>CustomHookDemo01</h2>
      <Home></Home>
      <About></About>
    </div>
  );
}

function Home() {
  useLoggingLife("Home");
  return <h2>home</h2>;
}

function About() {
  useLoggingLife("About");
  return <h2>about</h2>;
}
export const UserContext = React.createContext();
export const TokenContext = React.createContext();

function App() {
  const [show, setShow] = React.useState(true);
  return (
    <div className="App">
      你好
      {show && <CustomHookDemo01></CustomHookDemo01>}
      <UserContext.Provider value={{ name: "zhangsan", age: 19 }}>
        <TokenContext.Provider value="abckdfhafh">
          <CustomContextShareHook></CustomContextShareHook>
        </TokenContext.Provider>
      </UserContext.Provider>
      <ScrollPosition></ScrollPosition>
      <LocalStore></LocalStore>
      <button onClick={(e) => setShow(!show)}>切换</button>
    </div>
  );
}

export default App;
