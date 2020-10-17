import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

import Component from './component/component';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Component />
      </div>
    </BrowserRouter>  
  );
}

export default App;
