import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from './services/userSlice';
import { useGetProfileQuery, useLazyGetProfileQuery } from './services/userApi';


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = localStorage.getItem('token');
  const  {data,isLoading}= useGetProfileQuery(token)
  // console.log(xyz);
  useEffect(() => {
    // console.log(data);
    if(!token){
        navigate('/login');
        return;
    }
    if(isLoading){return};
    if(data){
      dispatch(setUser(data?.user));
    }
    else{
      navigate('/login')
    }
    

  }, [token,isLoading,data]);

  return (
    <Outlet></Outlet>
  )
}

export default App
