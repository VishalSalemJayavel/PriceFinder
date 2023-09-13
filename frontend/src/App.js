import React from 'react';
import './App.css';
import featured from "./featured.js";
import { Link } from 'react-router-dom';

import {Navbar, Header, Category} from './components';

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
    <div>
    <Link to= '/products'>{CategoryCards}</Link>
    </div>
    </div>
  )
}

export default App
