import React, { useRef, useState } from "react";
import Statestodos from "./doing,done,todos";
import './style.css'
import { useAddnewtodosMutation, useGettodosbyidQuery, useLazyGettodosbyidQuery, useUpdatatodolistMutation } from "../services/boardapi";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import { v4 as uuidv4 } from 'uuid';

function Todolisttodos() {
  const [index, setindex] = useState()
  const { id } = useParams()
  const { isLoading, data } = useGettodosbyidQuery(id)
  //  console.log("dta",data)
  const [addtodosfn] = useAddnewtodosMutation()
  const [lazytodofn] = useLazyGettodosbyidQuery()
  const [updatefn] = useUpdatatodolistMutation()
  let taskref = useRef();
  let desref = useRef();
  let priref = useRef();
  let today = new Date();
  let newTaskForm = useFormik({
    initialValues: {
      id: uuidv4(),
      task: "",
      description: "",
      priority: "",
      stats: "todo",
      createdAt: today.getDate() +"-"+ today.getMonth() +"-"+ today.getFullYear(),
    },
    onSubmit: (values) => {

      const tmp = JSON.parse(JSON.stringify(data))
      tmp.todolist.push(values);

      addtodosfn(tmp).then(() => {
        lazytodofn(id)
      })
      // console.log(values);
      newTaskForm.resetForm();
      newTaskForm.setFieldValue('id',uuidv4());
    }
  })
  // console.log(Date.now());
  // console.log("Asf");



  function edit(p, i) {
    document.getElementById("d2").value = p
    setindex(i)
  }

  async function updatetodo() {
    const tmp = JSON.parse(JSON.stringify(data))
    tmp.todolist.splice(index, 1, { task: document.getElementById('d2').value, stats: "todo" })
    await updatefn(tmp)
    lazytodofn(id)


  }

  return (
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
      <div className="d-flex justify-content-center ">
        <h1 className="text-center m-2">{data?.title.toUpperCase()}</h1>
        <button type="button" className="btn btn-primary m-2 " data-bs-toggle="modal" data-bs-target="#staticBackdrop1">New Task</button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 row-gap-2 mt-4 mx-auto justify-content-center justify-content-md-center justify-content-lg-center px-2">
        <Statestodos tododata={data} id={id} type='todo' ></Statestodos>
        <Statestodos tododata={data} id={id} type='In Progress'    ></Statestodos>
        <Statestodos tododata={data} id={id} type='In Review'   ></Statestodos>
        <Statestodos tododata={data} id={id} type='Completed'   ></Statestodos>
      </div>

      {/* <!-- Modal --> */}

      <div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={newTaskForm.handleSubmit}>
              <div className="modal-header bg-primary text-light">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">New Task</h1>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className="form-group">
                  <input type="text" id="floatingInput1" className="form-input" placeholder="" {...newTaskForm.getFieldProps('task')} ref={taskref} autoComplete="off" />
                  <label for="floatingInput1" className="form-label">Title</label>
                </div>
                <div className="form-group">
                  <textarea name="description" id="floatingInput2" className="form-input" placeholder="" {...newTaskForm.getFieldProps('description')} ref={desref} autoComplete="off" ></textarea>
                  <label for="floatingInput2" className="form-label">Description</label>
                </div>
                <div className="form-group">
                  <select {...newTaskForm.getFieldProps('priority')} className="form-input" id="floatingInput3" ref={priref}>
                    <option value="" defaultChecked disabled>Select Priority</option>
                    <option value="3">High</option>
                    <option value="2">Medium</option>
                    <option value="1">Low</option>
                  </select>
                  <label for="floatingInput3" className="form-label">Priority</label>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Add Task</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div >



  )
}
export default Todolisttodos