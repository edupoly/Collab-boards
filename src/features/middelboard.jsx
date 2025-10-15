import { Link, Outlet } from "react-router-dom";
import Slidebar from "./slidebar";
import './style.css'
import Sidebar from "../component/Sidebar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetProfileQuery } from "../services/userApi";

function Middelboard() {
  const { data, isloading } = useGetProfileQuery(localStorage.getItem('token'))
  const userDetails = useSelector((state) => state.user);


  useEffect(()=>{
    console.log("userDetails",userDetails);
    
  },[userDetails])
    return (
        <div className="mainDiv">
            <div className="bg-secondary d-flex justify-content-between align-items-center px-3 text-light " style={{ background: "linear-gradient(135deg, rgb(30, 60, 114) 0%, rgb(42, 82, 152) 100%)" }}>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h1 className="m-0 mb-0 p-2 fw-bold text-light " >ALL BOARDS</h1>
                </Link>
                <i className="bi bi-list fs-3 d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
                <div className="d-flex gap-3">
                    <span>Hi, <h4 className="text-capitalize">{userDetails?.username}</h4></span>
                    <Link className="btn btn-info text-light fw-semibold" to={'/login'}>Login</Link>
                    <Link className="btn btn-success text-light fw-semibold" to={'/signup'}>Signup</Link>
                </div>
            </div>
            <div className="m-0 d-flex">
                <div className=" d-none d-lg-flex" style={{ background: 'rgb(48 91 159)', width: '220px' }}>
                    <Sidebar />
                </div>
                <div className="offcanvas offcanvas-start" style={{ background: 'rgb(48 91 159)', width: '240px' }} tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header text-light d-flex justify-content-between">
                        <h4 className="offcanvas-title" id="offcanvasExampleLabel">ALL BOARDS</h4>
                        <i className="bi bi-x-lg fw-bolder" data-bs-dismiss="offcanvas" aria-label="Close"></i>
                    </div>
                    <div className="offcanvas-body">
                        <div className="d-flex d-lg-none" data-bs-dismiss="offcanvas" aria-label="Close">
                            <Sidebar />
                        </div>
                    </div>
                </div>
                <div className="w-100">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}
export default Middelboard