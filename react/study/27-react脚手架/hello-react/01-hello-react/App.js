
import React from 'react';
import Hello from './components/hello/hello';
import Welcome from './components/welcome/welcome'
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Hello />
        <Welcome />
      </div>
    )
  }
}

//export default App;