import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { images } from '../../constants';
import './navbar.css';

const Menu = () => (
  <>
    <p><a href="/">Home</a></p>
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
    user_type: "",
    profile_picture: null,
  });

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
      (async () => {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
          const { data } = await axios.get('userdetails/',
            { headers: { 'Content-Type': 'application/json' }, 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
            { withCredentials: true });
          setUser({
            user: data['name'], 
            email: data['email'],
            user_type: data['user_type'],
            profile_picture: data['profile_picture'],
          });

        } catch (error) {
          console.error(error); // Handle error response
        }
      })();
    }
  }, [isAuth]);


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

            <Link to="/settings" className='app_login-after'>

              <p className='login_name'>{user.user}</p>
              <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img' />

            </Link>

          ) : user.user_type === "customer" ? (

            <Link to="/settings" className='app_login-after'>

              <p className='login_name'>{user.user}</p>
              <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img' />
            </Link>

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
          <div className='gpt3__navbar-menu_container slide-bottom'>
            <div className='gpt3__navbar-menu_contanier-links'>

              <div className='gpt3__navbar-menu_container-links-sign'>


                {isAuth ? (
                  user.user_type === "retailer" ? (
                    <Link to="/dashboard" >
                      <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img' />
                      <p className='login_name'>{user.user}</p>
                    </Link>
                  ) : user.user_type === "customer" ? (
                    <Link to="/customersettings">
                      <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img' />
                      <p className='login_name'>{user.user}</p>
                    </Link>
                  ) : null // This will render nothing if user_type is neither "retailer" nor "customer"
                ) : (
                  <Link to="/signup">
                    <button type="button">Sign up</button>
                  </Link>
                )}
              </div>
              <Menu />
              {isAuth ? <Link to='/logout'><p>Sign Out</p></Link> : <Link to='/login'><p>Sign in</p></Link>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar

