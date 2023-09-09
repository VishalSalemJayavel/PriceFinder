import React from 'react';
import './App.css';

import data from "./data.js";

import {Navbar, Header, Featured} from './components';

const App = () => {
  const cards = data.map((item) => {
    return (
      <Featured 
        key={item.id}
        item={item}
      />
    )
  });


  return (
    <div data-test="test" className="dfgdfgdfgdfg">
    <Navbar />
    <Header />
    {cards}
    </div>
  )
}

export default App
