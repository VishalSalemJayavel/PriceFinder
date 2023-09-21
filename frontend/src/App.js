import React from 'react';
import './App.css';

import { Navbar, Header, Category } from './components';

const App = () => {

  return (
    <div data-test="test" >
      <Navbar />
      <Header />
      <Category />
    </div>
  )
}

export default App
