import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUser } from './services/userSlice';
import { useGetProfileQuery, useLazyGetProfileQuery } from './services/userApi';


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {data , isLoading} = useGetProfileQuery(localStorage.getItem('token'))
  // console.log(xyz);
  useEffect(() => {
    // console.log(data);
    if(data?.message=='Token valid'){
        dispatch(setUser(data?.user));
    }
    /* else{
      navigate('/login')
    } */

  }, [isLoading]);

  return (
    <Outlet></Outlet>
  )
}

export default App
