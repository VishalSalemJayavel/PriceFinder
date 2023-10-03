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
          <div className='app__settings-retailer'>
            <div className='app__settings-retailer-dashboard'>
              <Link to="/dashboard/">
                <h1 className='app__settings-dashtit'>Dashboard</h1>
                <img src={images.dashboard} alt='dashboard_img' className='app__settings-dashboard_img' />
                <p className='app__sesttings-dashinfo'>Take Control of Your Workforce with Dashboards</p>
                <a href="/dashboard" className='dashboard-link'>Click Here</a>
              </Link>
            </div>

            <div className='app__settings-retailer-profile'>
              <Link to="/retailersettings">
                <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img-settings' />
                
                <h1 className='app__settings-protit'>Edit your profile</h1>
                <p className='app__settings-profileinfo'>Click here to change your details</p>
              </Link>
            </div>
          </div>
        ) : user.user_type === "customer" ? (
          <Link to="/customersettings">
            <h1>Edit your profile</h1>
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