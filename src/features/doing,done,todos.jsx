import React, { useEffect, useRef, useState } from "react";
import './style.css'
import { useAddnewtodosMutation, useDeletetaskMutation, useLazyGettodolistQuery, useLazyGettodosbyidQuery, useUpdatatodolistMutation } from "../services/boardapi";
import { useFormik } from "formik";
import Modal from "../component/modal";

function Statestodos({ tododata, type, id }) {
  const [updatadragfn] = useAddnewtodosMutation()
  const [deletetodofn] = useDeletetaskMutation()
  const [updatefn] = useUpdatatodolistMutation()
  const [lazyfn] = useLazyGettodosbyidQuery()
  // const [tolazyfn] = useLazyGettodosbyidQuery()
  let [currentTodo, setCurrentTodo] = useState({});
  let modRef = useRef();
  let editModRef = useRef();

  const [index, setindex] = useState('')
  const [todolistid, settid] = useState('')
  let today = new Date();
  let newTaskForm = useFormik({
    initialValues: {
      id: "",
      task: "",
      description: "",
      priority: "",
      stats: "todo",
      createdAt: today,
    },
    onSubmit: (values) => {
      const tmp = JSON.parse(JSON.stringify(tododata))
      const todos = tmp.todolist.map((j) => {
        if (j.id == values.id) {
          j.task = values.task;
          j.description = values.description;
          j.priority = values.priority;
        }
        return j;
      });
      tmp.todolist = todos;
      updatefn(tmp).then(() => {
        lazyfn(id);
      });
      // const tmp = JSON.parse(JSON.stringify(data))
      // tmp.todolist.push(values);

      // addtodosfn(tmp).then(() => {
      //   lazytodofn(id)
      // })
      // newTaskForm.resetForm();
    }
  })

  useEffect(() => {
    newTaskForm.setValues(currentTodo);
  }, [currentTodo])

  function deletetod(i) {

    const tmp = [...tododata.todolist]
    let tmp2 = tmp.filter((todo) => { return todo.id != i })
    deletetodofn({ ...tododata, todolist: tmp2 }).then((res) => {
      lazyfn(id).then((s) => {
        console.log(s);
      })
    })
  }
  function handleDragStart(ev, tid) {

    ev.dataTransfer.setData("xyz", JSON.stringify({ title: ev.target.id, teeid: tid }))
  }
  function handleDrop(ev) {
    var { title, teeid } = JSON.parse(ev.dataTransfer.getData("xyz"))

    if (ev.target.tagName == "LI") {

      ev.target.parentElement.appendChild(document.getElementById(title))
    } else if (ev.target.tagName == "SPAN") {
      ev.target.parentElement.parentElement.appendChild(document.getElementById(title))

    } else {
      ev.target.appendChild(document.getElementById(title))
    }

    const tmp = JSON.parse(JSON.stringify(tododata))
    var todss = tmp.todolist.map((d) => {
      if (d.task == title.slice(0, -1)) {
        d.stats = type
      }
      return d
    })
    tmp.todolist = todss
    updatadragfn(tmp)
  }

  function setModalData(data) {
    setCurrentTodo(data);
    let modal = new window.bootstrap.Modal(modRef.current);
    modal.show();
    // newTaskForm.setValues(currentTodo);
  }

  // function edit(p, t) {
  //   document.getElementById("d2").value = p
  //   //   setindex(i)
  //   settid(t)
  // }
  // async function updatetodo() {
  //   const tmp = JSON.parse(JSON.stringify(tododata))
  //   //  tmp.todolist.splice(index,1,{task:document.getElementById('d2').value,stats:type,id:tid})
  //   const todos = tmp.todolist.map((j) => {
  //     if (j.id == todolistid) {
  //       j.task = document.getElementById('d2').value
  //     }
  //     return j
  //   })
  //   tmp.todolist = todos
  //   await updatefn(tmp)
  // }

  return (

    <div className="col">

      <div className="card fs-5" style={{ minHeight: "150px", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.308)' }}>
        <div className="card-header bg-primary text-white p-3">
          <b>{type.toUpperCase()}</b>
        </div>

        <ul className="list-group list-group-flush  border border-2 scrollableDiv" style={{ background: '#ececec', minHeight: "85px" }} onDragOver={(ev) => { ev.preventDefault() }} onDrop={(ev) => { handleDrop(ev) }}>
          {
            tododata?.todolist.map((r, i) => {
              let bgcolor = "";
              let prior;

              if (r.stats !== type) {
                return null
              }
              else {
                switch (r.priority) {
                  case "1":
                    bgcolor = "text-secondary";
                    prior = "L";
                    break;
                  case "2":
                    bgcolor = "text-warning";
                    prior = "M";
                    break;
                  case "3":
                    bgcolor = "text-danger";
                    prior = "H";
                    break;
                  default:
                    bgcolor = "bg-primary"
                }
                return <li key={i}
                  id={`${r.task}${i}`}
                  draggable="true"
                  onDragStart={(ev) => handleDragStart(ev, r.id)}
                >
                  <div className={`list-group-item m-2 p-3 d-flex shadow rounded text-dark justify-content-between fs-5 `} onClick={() => { setModalData(r) }}>
                    <span className="text-truncate mb-0 w-75" title={r.task.toUpperCase()}>{r.task.toUpperCase()}</span>
                    <div className="d-flex justify-content-between w-25">
                      <i className={`bi bi-star-fill ${bgcolor}`}></i>
                      <i className="bi bi-trash3" onClick={() => deletetod(r.id)}  ></i>
                    </div>
                  </div>



                  <div className="modal fade" id="exampleModal22" ref={editModRef} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel1" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <form onSubmit={newTaskForm.handleSubmit}>
                          <div className="modal-header bg-primary text-light">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel1">Edit Task</h1>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">

                            <div className="form-group">
                              <input type="text" id="floatingInput1" className="form-input" placeholder="" {...newTaskForm.getFieldProps('task')} autoComplete="off" />
                              <label htmlFor="floatingInput1" className="form-label">Title</label>
                            </div>
                            <div className="form-group">
                              <textarea name="description" id="floatingInput2" className="form-input" placeholder="" {...newTaskForm.getFieldProps('description')} autoComplete="off" ></textarea>
                              <label htmlFor="floatingInput2" className="form-label">Description</label>
                            </div>
                            <div className="form-group">
                              <select {...newTaskForm.getFieldProps('priority')} className="form-input" id="floatingInput3">
                                <option value="" defaultChecked disabled>Select Priority</option>
                                <option value="3">High</option>
                                <option value="2">Medium</option>
                                <option value="1">Low</option>
                              </select>
                              <label htmlFor="floatingInput3" className="form-label">Priority</label>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Update Task</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref={modRef}>
                    <Modal r={currentTodo} ref={editModRef}></Modal>
                  </div>
                </li>

              }
            })
          }

        </ul>

      </div>
    </div>
    

  )

}
export default Statestodos