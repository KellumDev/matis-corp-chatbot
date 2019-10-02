import React from 'react';
import logo from './logo.svg';
import Landing from './components/pages/LandingPage'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
     <Landing/>
    </div>
  );
}

export default App;
