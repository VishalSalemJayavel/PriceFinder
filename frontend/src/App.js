import React from 'react';
import './App.css';
import featured from "./featured.js";
import { Link } from 'react-router-dom';

import {Navbar, Header, Featured} from './components';

const App = () => {
  const featuredCards = featured.map((item) => {
    return (
      <Featured 
        key={item.id}
        item={item}
      />
    )
  });


  return (
    <div data-test="test" >
    <Navbar />
    <Header />
    <Link to= '/products'>{featuredCards}</Link>
    </div>
  )
}

export default App
