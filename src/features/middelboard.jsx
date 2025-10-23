import { Link, Outlet, useNavigate } from "react-router-dom";
import Slidebar from "./slidebar";
import './style.css'
import Sidebar from "../component/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetProfileQuery } from "../services/userApi";
import { clearUser } from "../services/userSlice";

function Middelboard() {
    const userDetails = useSelector((state) => state.userS?.userInfo);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    function logout() {
        localStorage.clear();
        dispatch(clearUser());
        navigate('/login');
    }
    return (
        <div className="mainDiv">
            <div className="bg-secondary d-flex justify-content-between align-items-center px-3 text-light " style={{ background: "linear-gradient(135deg, rgb(30, 60, 114) 0%, rgb(42, 82, 152) 100%)" }}>
                <div className="d-flex align-items-center">
                    <i className="bi bi-list fs-3 d-lg-none" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"></i>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h1 className="m-0 mb-0 p-2 fw-bold text-light " >ALL BOARDS</h1>
                    </Link>
                </div>

                <div className="d-flex gap-3">
                    <span className="d-flex align-items-center gap-2 fs-4">Hi, <h4 className="text-capitalize mb-0">{userDetails?.username}</h4></span>
                    <button className="btn btn-danger fw-semibold" onClick={() => { logout() }}>Logout</button>
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