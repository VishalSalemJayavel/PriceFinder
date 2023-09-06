import React, { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { images } from '../../constants';

import'./navbar.css'

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className='app__navbar'>
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>

      <div className='app__navbar-list'>
        <p><a href='#'>Home</a></p>
        <p><a href='#'>Best Seller</a></p>
        <p><a href='#'>Fresh Vegetables</a></p>
        <p><a href='#'>Diary & Milk</a></p>
        <p><a href='#'>About</a></p>
      </div>

      <ul className="app__navbar-links">
        <li className="app__sign_in">
          <img src={images.sign_in} alt="sign_in" />
          <a href='#'>Sign In</a>
        </li>
        
        <li className="app__wishlist">
          <img src={images.wishlist} alt="wishlist" />
          <a href='#'>Wishlist</a>
        </li>
        
      </ul>

      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {['home', 'best seller in your area', 'fresh vegetables', 'dairy & milk', 'about'].map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
