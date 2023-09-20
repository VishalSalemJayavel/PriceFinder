import React, { useState, useEffect } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { images } from '../../constants';
import './navbar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Menu = () => (
  <>
    <p><a href="#Home">Home</a></p>
    <p><a href="#best_seller">Best Seller</a></p>
    <p><a href="#fresh_veg">Fresh Vegetable</a></p>
    <p><a href="#diary">Diary</a></p>
    <p><a href="#about">About</a></p>
  </>
)
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({
    user: "",
    email: "",
    user_type: ""
  });

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
      (async () => {
        try {
          const { data } = await axios.get('userdetails/',
            { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } },
            { withCredentials: true });

          console.log(data); // Handle success response

          setUser({
            user: data['name'],
            email: data['email'],
            user_type: data['user_type']
          })

        } catch (error) {
          console.error(error); // Handle error response
        }
      })();
    }
  }, [isAuth]);

  console.log(user);

  return (
    <div className='gpt3__navbar'>
      <div className='gpt3__navbar-links'>
        <div className='gpt3__navbar-links_logo'>
          <img src={images.logo} alt='logo' />
        </div>
        <div className='gpt3__navbar-links_container'>
          <Menu />
        </div>
      </div>
      <div className='gpt3__navbar-search'>
        <input
          className='app__navbar-search'
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className='gpt3__navbar-sign'>
        {isAuth ? <Link to='/logout'><p>Sign Out</p></Link> : <Link to='/login'><p>Sign in</p></Link>}
        {isAuth ? (
          user.user_type === "retailer" ? (
            <Link to="/dashboard"><p>{user.user}</p></Link>
          ) : user.user_type === "customer" ? (
            <Link to="/customersettings"><p>{user.user}</p></Link>
          ) : null // This will render nothing if user_type is neither "retailer" nor "customer"
        ) : (
          <Link to="/signup">
            <button type="button">Sign up</button>
          </Link>
        )}
      </div>
      <div className='gpt3__navbar-menu'>
        {toggleMenu
          ? <RiCloseLine color='black' size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color='black' size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='gpt3__navbar-menu_container scale-up-center'>
            <div className='gpt3__navbar-menu_contanier-links'>
              <Menu />
              <div className='gpt3__navbar-menu_container-links-sign'>
                <p>Sign in</p>
                <button type='button'>Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar

