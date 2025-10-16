import { useEffect, useState } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { setUser } from './services/userSlice';
import { useGetProfileQuery, useLazyGetProfileQuery } from './services/userApi';


function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDetails = useSelector((state) => state.userS?.userInfo);
  const  [getnewData,{data,isLoading}]= useLazyGetProfileQuery()
  // console.log(xyz);
  useEffect(() => {
    // console.log(data);
    if(!userDetails){
      getnewData(localStorage.getItem('token'));
      if(data?.message=='Token valid'){
          dispatch(setUser(data?.user));
      }
      else{
        navigate('/login')
      } 
    }
    

  }, [isLoading]);

  return (
    <Outlet></Outlet>
  )
}

export default App
