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

  }, [pageReloaded]);


  return (
    <MainLayout>
      <Header />
      <div className='uploadprod-landing'>
        <div style={{display:'flex', justifyContent:'center', padding:'20px' }}>
        <div style={{border:'1px solid', width:'400px', borderRadius:'30px', paddingLeft:'10px'}}>
        {user.user_type === "retailer" ? (
          <div className='app__uploadprod' style={{display:'flex', justifyContent:'center',fontFamily: 'var(--font-family)' }}>
            <Link to="/productupload">
              <img src={images.upload} alt="dp" className='app__uploadprod-img' style={{ margin: '2rem', marginLeft: '9.8rem' }} />
              <h1 style={{ marginLeft: '1.6rem' }}>Upload your Product</h1>
              <p  >Click here to upload the details of your product</p>
            </Link>
          </div>
        ) : null}
        </div>
        </div>
        <Category />
      </div>
    </MainLayout>
  );
};

export default Landing;