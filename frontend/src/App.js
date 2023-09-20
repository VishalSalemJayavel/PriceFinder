import React from 'react';
import './App.css';
import featured from "./featured.js";


import { Navbar, Header, Category } from './components';

const App = () => {
  const CategoryCards = featured.map((item) => {
    return (
      <Category
        key={item.id}
        item={item}
      />
    )
  });


  return (
    <div data-test="test" >
      <Navbar />
      <Header />
      {CategoryCards}
    </div>
  )
}

export default App
