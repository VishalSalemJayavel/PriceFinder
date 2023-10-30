import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { images } from '../../constants';
import './retailerdashboard.css';

const RetailerDashboard = () => {
  const [isAuth, setIsAuth] = useState(false);

  const [user, setUser] = useState({
    user: "",
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
            profile_picture: data['profile_picture'],
          })

        } catch (error) {
          console.error(error); // Handle error response
        }
      })();
    }
  }, [isAuth]);

  return (
    <div>
      <h1>Retailer Dashboard</h1>
      <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img' />
      <p className='login_name'>{user.user}</p>
      <p>Welcome to your dashboard</p>
    </div>
  )
}

export default RetailerDashboard