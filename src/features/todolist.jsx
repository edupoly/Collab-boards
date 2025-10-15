import React, { useRef, useState } from "react";
import Statestodos from "./doing,done,todos";
import './style.css'
import { useAddnewtodosMutation, useGettodosbyidQuery, useLazyGettodosbyidQuery, useUpdatatodolistMutation } from "../services/boardapi";
import { useParams } from "react-router-dom";

function Todolisttodos(){
    const [index,setindex]=useState()
    const [inp,setinp]=useState('')
    const {id}=useParams()
       const{isLoading,data} =useGettodosbyidQuery(id)
      //  console.log("dta",data)
       const [addtodosfn]=useAddnewtodosMutation()
       const [lazytodofn]=useLazyGettodosbyidQuery()
        const [updatefn]=useUpdatatodolistMutation()
     async  function xyz(){
        const tmp=JSON.parse(JSON.stringify(data))
        tmp.todolist.push({task:inp,stats:"todo",id:`t${tmp.todolist.length+1}`})
       await  addtodosfn(tmp)
            lazytodofn(id)
            setinp('')
         
       }
   
       function edit(p,i){
        document.getElementById("d2").value=p
          setindex(i)
       }

    async  function updatetodo(){
      const tmp=JSON.parse(JSON.stringify(data))
      tmp.todolist.splice(index,1,{task:document.getElementById('d2').value,stats:"todo"})
      await  updatefn(tmp)
      lazytodofn(id)

        
      }

    return(
      // <div>
      // <div   className="d-flex " >
      //     <div  className=" card border border-2 m-2 w-25" style={{backgroundImage: "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)"}}>
      //      {   !isLoading && <b className=" card-header text-danger "> {data?.title.toUpperCase()}</b> }
      //           <div className="d-flex m-2" >
      //            <input type="text" onChange={(e)=>setinp(e.target.value)} style={{width:"250px",borderRadius:'5px'}}  /> &nbsp; 
      //            <button className="btn btn-warning " style={{width:'150px'}} onClick={()=>xyz()} >ADD TASKS</button>
      //           </div>
      //           <p className="card-text" >{
      //               !isLoading && data.todolist.map((s,i)=>{
      //                   return(
      //                     <div className=" m-2 d-flex justify-content-even  border border-x" >
                           
      //                    <li   >{s.task?.toUpperCase()}</li>
      //                     <i className="bi bi-pencil-square " data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{edit(s.task,i)}} ></i>
                         
      //                     <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      //                       <div className="modal-dialog">
      //                         <div className="modal-content">
      //                           <div className="modal-header">
      //                             <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
      //                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      //                           </div>
      //                           <div className="modal-body">
      //                             <input type="text"  id="d2" className="w-100" />
      //                           </div>
      //                           <div className="modal-footer">
      //                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      //                             <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={()=>{updatetodo()}}>Save changes</button>
      //                           </div>
      //                         </div>
      //                       </div>
      //                       </div>
      //                     <i  className="bi bi-trash3 text-danger "   onClick={()=>{deletetod(i)}}></i>

                        
      //                    </div>
      //                   )
      //                   })
                      
      //           }</p>
      //        </div>
             
      //          </div>
              
              //  </div>   
              <div className="container vh-100">
                <h1 className="text-center">{data?.title.toUpperCase()}</h1>
                <div className="d-flex m-2 justify-content-center"  >
                <input value={inp} type="text" onChange={(e)=>setinp(e.target.value)} style={{width:"300px",borderRadius:'5px'}}  /> &nbsp; 
                  <button className=" btn btn-primary text-white" style={{width:'150px'}} onClick={()=>xyz()} >ADD TASKS</button>
                </div>
               <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-gap-2 mt-4 mx-auto justify-content-center justify-content-md-center justify-content-lg-center px-2">
               <Statestodos tododata={data} id={id}   type='todo' ></Statestodos>
               <Statestodos tododata={data} id={id}   type='doing'    ></Statestodos>
               <Statestodos tododata={data} id={id} type='done'   ></Statestodos>
              </div>
              </div>


    )
}
export default Todolisttodos