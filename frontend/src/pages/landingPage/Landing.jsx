import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category, Header } from '../../components';
import { images } from '../../constants';
import { MainLayout } from '../../layout';

const Landing = () => {
  const [user, setUser] = useState({
    user_type: "",
  });

  const [pageReloaded, setPageReloaded] = useState(false);


  useEffect(() => {

    if (!pageReloaded) {
      if (localStorage.getItem('access_token') !== null) {

      const fetchData = async () => {
        try {
          const { data } = await axios.get('userdetails/',
            { headers: { 'Content-Type': 'application/json' }, 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
            { withCredentials: true });

          setUser({
            user_type: data['user_type'],
          });

        } catch (error) {
          console.error(error); // Handle error response
        }
      };

      fetchData(); // Fetch data from API
      setPageReloaded(true);
    }
  }

  }, [pageReloaded]);


  return (
    <MainLayout>
      <Header />
      <div>
        {user.user_type === "retailer" ? (
          <div className='app__uploadprod' style={{ display: 'flex', justifyContent: 'center', fontFamily: 'var(--font-family)' }}>
            <Link to="/productupload">
              <img src={images.upload} alt="dp" className='app__uploadprod-img' style={{ margin: '2rem', marginLeft: '8.5rem' }} />
              <h1 style={{ marginLeft: '1rem' }}>Upload your Product</h1>
              <p  >Click here to upload the details of your product</p>
            </Link>
          </div>
        ) : null}
        <Category />
      </div>
    </MainLayout>
  );
};

export default Landing;