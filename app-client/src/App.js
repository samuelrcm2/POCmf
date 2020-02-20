import React from 'react';
import logo from './logo.svg';
import './App.css';
import api from "./Axios";

function App() {
  return (
    <div className="App">
      <button onClick={api.get('/materials/getAllMaterials')}> TESTE </button>
    </div>
  );
}

export default App;
