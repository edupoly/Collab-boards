import React from "react";
import { Link } from "react-router-dom";
import { useDeleteboardMutation, useLazyGettodolistQuery } from "../services/boardapi";
function Cardtodolist({todos}){
   console.log("toooooo",todos)
  const [deletefn]=useDeleteboardMutation()
     const [lazyfn] =useLazyGettodolistQuery()
 async function deleteobj(){
    console.log(todos.id)
   await  deletefn(todos.id)
   lazyfn().then((r)=>{
      console.log(r)

   })
  }
    return(
      
        <div className="card shadow-lg" style={{background:"#ececec"}}
         >
             <div className="d-flex justify-content-between  card-header bg-primary">
                <b style={{color:"white"}}  > {todos.title?.toUpperCase()}</b> 
                 <i className="bi bi-trash3  text-warning" onClick={()=>deleteobj()}></i>
             </div >
                <div className="card-body cardBody p-0">
                <h5 className="card-title m-2" >TOTAL: {todos.todolist.length}</h5>
                <div className="px-4" style={{height:'150px',overflow:'auto'}} >
                  {
                     todos.todolist?.map((s)=>{
                        return (
                           <h5 key={s?.task} className="border border-1 rounded p-2 ps-4 text-truncate" title={s?.task.toUpperCase()} style={{background:'white'}}  >{s?.task.toUpperCase()}</h5>
                        )
                     })
                  }
                   </div>
                </div>
                <div className="p-3">
            <Link to={`/todos/${todos.id}`} className="btn btn-outline-primary" style={{width:'300px'}}>Go to todolists</Link>
                </div>
       </div>
    )
}
export default Cardtodolist