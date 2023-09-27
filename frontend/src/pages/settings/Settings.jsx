import React from 'react';
import { MainLayout } from '../../layout';
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

          console.log(user);

        } catch (error) {
          console.error(error); // Handle error response
        }
      })();
    }
  }, [isAuth]);

  return (
    <MainLayout>
      <div className="app__settings">
        <h1>Edit Profile</h1>
        <p>Click here to change your Profile details</p>
        {isAuth ? (
          user.user_type === "retailer" ? (
            <Link to="/customersettings">
              <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img' />
              <p className='login_name'>{user.user}</p>
            </Link>
          ) : user.user_type === "customer" ? (
            <Link to="/retailersettings">
              <img src={user.profile_picture ? user.profile_picture : images.dp} alt="dp" className='login_img' />
              <p className='login_name'>{user.user}</p>
            </Link>
          ) : null // This will render nothing if user_type is neither "retailer" nor "customer"
        ) : null // This will render nothing if user is not authenticated
        }
      </div>
    </MainLayout>
  )
}

export default Settings