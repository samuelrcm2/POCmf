import React from 'react';
import logo from './logo.svg';
import './App.css';
import api from "./Axios";

const dados = () => {
  api.get('/materials/getAllMaterials').then((response) => {
    if(response.status == 200)
      console.log(response)
  }
  )
}

function App() {
  return (
    <div className="App">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <button onClick={() => dados()}> TESTE </button>
    </div>
  );
}

export default App;
