import React, { useState } from "react";
import './style.css'
import { useAddnewtodosMutation, useDeletetaskMutation, useLazyGettodolistQuery, useLazyGettodosbyidQuery, useUpdatatodolistMutation } from "../services/boardapi";

function Statestodos({ tododata, type,id }) {
  const [updatadragfn] = useAddnewtodosMutation()
  const [deletetodofn] = useDeletetaskMutation()
  const [updatefn] = useUpdatatodolistMutation()
  const [lazyfn]=useLazyGettodolistQuery()
  const [tolazyfn]=useLazyGettodosbyidQuery()

  const [index, setindex] = useState('')
  const [todolistid, settid] = useState('')


   function deletetod(i) {

    const tmp = [...tododata.todolist]
    tmp.splice(i, 1)
    deletetodofn({ ...tododata, todolist: tmp }).then((res)=>{
        tolazyfn(id).then((s)=>{
        console.log(s)
       })
    })
  }
  function handleDragStart(ev, tid) {
    
    ev.dataTransfer.setData("xyz", JSON.stringify({ title: ev.target.id, teeid: tid }))
    console.log(tid)
  }
  function handleDrop(ev) {
    var { title, teeid } = JSON.parse(ev.dataTransfer.getData("xyz"))
    console.log(title, teeid)

    console.log(ev.target);
    if (ev.target.tagName == "LI") {
      
      ev.target.parentElement.appendChild(document.getElementById(title))
    }else if(ev.target.tagName == "SPAN"){
      ev.target.parentElement.parentElement.appendChild(document.getElementById(title))

    } else {
      ev.target.appendChild(document.getElementById(title))
    }

    const tmp = JSON.parse(JSON.stringify(tododata))
    var todss = tmp.todolist.map((d) => {
      if (d.id == teeid) {
        d.stats = type
      }
      return d
    })
    tmp.todolist = todss
    updatadragfn(tmp)
  }
  function edit(p, t) {
    document.getElementById("d2").value = p
    //   setindex(i)
    settid(t)

  }
  console.log(todolistid)
  async function updatetodo() {
    const tmp = JSON.parse(JSON.stringify(tododata))
    //  tmp.todolist.splice(index,1,{task:document.getElementById('d2').value,stats:type,id:tid})
    const todos = tmp.todolist.map((j) => {
      if (j.id == todolistid) {
        console.log(todolistid)
        j.task = document.getElementById('d2').value
      }
      return j
    })
    console.log(todos)
    tmp.todolist = todos
    await updatefn(tmp)


  }

  return (

    <div className="col">

      <div className="card fs-5" style={{  minHeight:"150px", boxShadow:'0 4px 8px rgba(0, 0, 0, 0.308)' }}>
        <div className="card-header bg-primary text-white p-3">
          <b>Status :</b> {type.toUpperCase()}
        </div>

        <ul className="list-group list-group-flush  border border-2 scrollableDiv" style={{ background: '#ececec',minHeight:"85px"}} onDragOver={(ev) => { ev.preventDefault() }} onDrop={(ev) => { handleDrop(ev) }}>
          {
            tododata?.todolist.map((r, i) => {
              if (r.stats !== type) {
                return null
              }
              else {
                return <li key={i} className="list-group-item m-2 p-3 d-flex shadow rounded text-dark justify-content-between fs-5"
                 id={`${r.task}${i}`} 
                draggable="true" 
                onDragStart={(ev) => handleDragStart(ev, r.id)} 
                >
                  <span className="text-truncate mb-0" title={r.task.toUpperCase()}>{r.task.toUpperCase()}</span>
                  <div ><i className="bi bi-trash3 text-warning " onClick={() => deletetod(i)}  ></i>
                    {/* <i className="bi bi-pencil-square " data-bs-toggle="modal" data-bs-target="#exampleModal22" onClick={() => { edit(r.task, r.id) }} ></i> */}
                    <div className="modal fade" id="exampleModal22" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel22" >Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div className="modal-body">
                            <input type="text" id="d2" className="w-100" />
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { updatetodo() }}>Save changes</button>
                          </div>
                        </div>
                      </div>
                    </div>

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





