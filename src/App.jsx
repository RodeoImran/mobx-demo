import React from 'react';
import './App.scss';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './Components/Header.jsx';
import Main from './Components/Main.jsx'

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Header/>
      <Main />
    </div>
  );
}

export default App;
