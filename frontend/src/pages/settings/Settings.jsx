import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../constants';
import './settings.css';

const Settings = () => {
  const [isAuth, setIsAuth] = useState(false);

  const [user, setUser] = useState({
    user: "",
    user_type: "",
    profile_picture: null,
  });

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
      (async () => {
        try {
          const { data } = await axios.get('userdetails/',
            { headers: { 'Content-Type': 'application/json' } },
            { withCredentials: true });

          console.log(data); // Handle success response

          setUser({
            user: data['name'],
            user_type: data['user_type'],
            profile_picture: data['profile_picture'],
          })

        } catch (error) {
          console.error(error); // Handle error response
        }
      })();
    }
  }, [isAuth]);

  return (
    <div className="app__settings">
      {isAuth ? (
        user.user_type === "retailer" ? (
          <>
            <Link to="/dashboard/">
              <h1>Dashboard</h1>
            </Link>
            <Link to="/retailersettings">
              <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img' />
              <p className='login_name'>{user.user}</p>
            </Link>
          </>
        ) : user.user_type === "customer" ? (
          <Link to="/customersettings">
            <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img' />
            <p className='login_name'>{user.user}</p>
          </Link>
        ) : null // This will render nothing if user_type is neither "retailer" nor "customer"
      ) : null // This will render nothing if user is not authenticated
      }
    </div>
  )
}

export default Settings