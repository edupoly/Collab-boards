import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCreateboardMutation, useGettodolistQuery, useLazyGettodolistQuery } from "../services/boardapi";

function Slidebar(){
     const [change,setchange]  = useState()
     const {isLoading,data} = useGettodolistQuery()
    const [createfn]=useCreateboardMutation()
    const iref= useRef()
    const [lazyfn]=useLazyGettodolistQuery()
    async function createboard(){
         await  createfn({title:iref.current.value,todolist:[]})
         iref.current.value=''
         lazyfn()
       }
       function colorchange(p){
        setchange(p)
        lazyfn()
             
       }
    return(
        <div >
            <div className="m-2 my-4">
              <button type="button" className="btn btn-light d-flex justify-content-between align-items-center" style={{height:'50px',width:'200px'}} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
              <b> ADD NEW BOARD</b>  <i className="bi bi-plus-circle ms-auto fs-4"></i></button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
             <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header bg-primary text-light">
             <b className="modal-title fs-5 fw-bold" id="exampleModalLabel">Create New Board</b>
                <i className="bi bi-x-lg fs-4 ms-auto" data-bs-dismiss="modal" aria-label="Close"></i>

             {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                </div>
             <div className="modal-body">
             <form>
            <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">TITLE:</label>
            <input type="text" className="form-control" id="recipient-name" ref={iref}   />
             </div>
             
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary"  data-bs-dismiss="modal" onClick={()=>createboard()}>Create board</button>
        </div>
         </div>
        </div>
          </div>
          <ul>
          {
            !isLoading && data?.map((f,i)=>{
                return (
                   <Link key={i} className="shadow" style={{textDecoration:"none",fontSize:'20px',color:'white',  }}   to={`/todos/${f.id}`}>
                  <li className=" m-2 rounded fw-bold" style={{background:change==f.id ?'blue':'',listStyle:'none'}} onClick={()=>{colorchange(f.id)}} >{f.title.toUpperCase()}</li></Link> 
                )
            })
          }
          </ul>
        </div>
       
    )
}

export default Slidebar