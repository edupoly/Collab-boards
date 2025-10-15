import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from './services/userSlice';
import { useGetProfileQuery, useLazyGetProfileQuery } from './services/userApi';

function App() {
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isloading } = useGetProfileQuery(localStorage.getItem('token'))

  useEffect(() => {
    const recall = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        console.log("Token found:", token);
        let user = await trigger(token)
        dispatch(setUser(user?.data?.user));
        console.log(data?.user);
        
        // You can optionally validate or set user context here
      } else {
        console.log("No token found, redirecting to login.");
        navigate('/login');
      }
    }
    recall()
  }, []);

  return (
    <Outlet></Outlet>
  )
}

export default App
