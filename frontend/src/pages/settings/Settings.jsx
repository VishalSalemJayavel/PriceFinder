import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SideNavbar } from '../../components';
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
      <SideNavbar />

      {isAuth ? (
        user.user_type === "retailer" ? (
          <div className='app__settings-retailer'>

            <div className='app__settings-retailer-dashboard'>
              <Link to="/dashboard/">
                <h1 className='app__settings-dashtit'>Dashboard</h1>
                <img src={images.dashboard} alt='dashboard_img' className='app__settings-dashboard_img' />
                <p className='app__sesttings-dashinfo'>Take Control of Your Workforce with Dashboards</p>
                <p href="/dashboard" className='dashboard-link'>Click Here</p>
                
              </Link>
            </div>

            <div className='app__settings-retailer-upload'>
              <Link to="/productupload">
                <img src={images.upload} alt="dp" className='upload_img-settings' />
                <h1 className='app__settings-uploadtit'>Upload your Product</h1>
                <p className='app__settings-uploadinfo'>Click here to upload the details of your product</p>
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
          <div className='app__settings-customer'>
            <div className='app__settings-customer-profile'>
              <Link to="/customersettings">
                <h1 className='app__settings-protit'>Edit your profile</h1>
                <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img-settings' />
                <p className='app__settings-profileinfo'>Click here to change your details</p>
              </Link>
            </div>
          </div>


        ) : null // This will render nothing if user_type is neither "retailer" nor "customer"
      ) : null // This will render nothing if user is not authenticated
      }
    </div>
  )
}

export default Settings