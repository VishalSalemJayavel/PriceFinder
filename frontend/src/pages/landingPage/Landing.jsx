import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category, Header } from '../../components';
import { images } from '../../constants';
import { MainLayout } from '../../layout';

const Landing = () => {
  const [user, setUser] = useState({
    user: "",
    email: "",
    user_type: "",
    profile_picture: null,
  });

  const [pageReloaded, setPageReloaded] = useState(false);

  useEffect(() => {

    if (!pageReloaded) {
      const fetchData = async () => {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          };
          const { data } = await axios.get('userdetails/', { headers, withCredentials: true });

          setUser({
            user: data['name'],
            email: data['email'],
            user_type: data['user_type'],
            profile_picture: data['profile_picture'],
          });

        } catch (error) {
          console.error(error); // Handle error response
        }
      };

      fetchData(); // Fetch data from API
      setPageReloaded(true);
    }

  }, [pageReloaded]);

  // console.log(user)
  // console.log("User Type:", user.user_type);
  // if (user.user_type === "retailer") {
  //   console.log("User is a retailer");
  // }

  return (
    <MainLayout>
      <Header />
      <div>
        {user.user_type === "retailer" ? (
          <div>
            <Link to="/productupload">
              <img src={images.upload} alt="dp" />
              <h1>Upload your Product</h1>
              <p>Click here to upload the details of your product</p>
            </Link>
          </div>
        ) : null}
        <Category />
      </div>
    </MainLayout>
  );
};

export default Landing;