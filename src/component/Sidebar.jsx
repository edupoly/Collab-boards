import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCreateboardMutation, useGettodolistQuery, useLazyGettodolistQuery } from "../services/boardapi";

function Sidebar() {
    const [change, setchange] = useState()
    const { isLoading, data } = useGettodolistQuery()
    // console.log(data)
    const [createfn] = useCreateboardMutation()
    const iref = useRef()
    const [lazyfn] = useLazyGettodolistQuery()
    async function createboard() {
        await createfn({ title: iref.current.value, todolist: [] })
        iref.current.value = ''
        lazyfn()
    }
    function colorchange(p) {
        setchange(p)
        lazyfn()
        // console.log(p)

    }
    return (
        <div >
            <div className="m-2 my-4">
                <button type="button" className="btn btn-light d-flex justify-content-between align-items-center" style={{ height: '50px', width: '200px' }} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
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
                                    <input type="text" className="form-control" id="recipient-name" ref={iref} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => createboard()}>Create board</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion mb-4" id="sharedAccordion">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="sharedHeadingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#sharedCollapseOne" aria-expanded="true" aria-controls="sharedCollapseOne">
                            Shared with you
                        </button>
                    </h2>
                    <div id="sharedCollapseOne" className="accordion-collapse collapse show" data-bs-parent="#sharedAccordion">
                        <div className="accordion-body">
                            <strong>This is the first shared item’s accordion body.</strong>{" "}
                            You can put any shared content here.
                        </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="sharedHeadingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sharedCollapseTwo" aria-expanded="false" aria-controls="sharedCollapseTwo">
                            personal
                        </button>
                    </h2>
                    <div id="sharedCollapseTwo" className="accordion-collapse collapse" data-bs-parent="#sharedAccordion">
                        <div className="accordion-body">
                            <strong>This is the second shared item’s accordion body.</strong>{" "}
                            Additional shared content goes here.
                        </div>
                    </div>
                </div>
            </div>
            <ul>
                {
                    !isLoading && data?.map((f, i) => {
                        return (
                            <Link key={i} className="shadow" style={{ textDecoration: "none", fontSize: '20px', color: 'white', }} to={`/todos/${f.id}`}>
                                <li className=" m-2 rounded fw-bold" style={{ background: change == f.id ? 'blue' : '', listStyle: 'none' }} onClick={() => { colorchange(f.id) }} >{f.title.toUpperCase()}</li></Link>
                        )
                    })
                }
            </ul>
        </div>

    )
}

export default Sidebar