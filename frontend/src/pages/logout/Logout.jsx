import React, { useEffect, useState } from 'react';
import './logout.css';
import axios from 'axios';

const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await
          axios.post('logout/', {
            refresh_token: localStorage.getItem('refresh_token')
          }, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('access_token')}` } },
            { withCredentials: true });
        console.log(data); // Handle success response
        localStorage.clear();
        axios.defaults.headers.common['Authorization'] = null;
        window.location.href = '/'
      } catch (e) {
        console.log('logout not working', e)
      }
    })();
  }, []);

  return (
    <div className="app__logout">
      <h1>You have been successfully Logged out</h1>
    </div>
  )
}

export default Logout