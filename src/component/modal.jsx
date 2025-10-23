
function Modal({ r,ref }) {
    let prior;
    function openEditModal(){
        let modal=new window.bootstrap.Modal(ref.current);
        modal.show();
    }
    switch (r.priority) {
        case "1":
            prior = "Low";
            break;
        case "2":
            prior = "Medium";
            break;
        case "3":
            prior = "High";
            break;
        default:
            break;
    }
    return (
        <div className="modal-dialog">
            <div className="modal-content" >
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Task Details</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                    <h4 className="m-0">Title:</h4>
                    {r.task}
                    <h4 className="m-0">Description:</h4>
                    <p>{r.description}</p>
                    <h4 className="m-0 d-inline-block">Priority:</h4>
                    {prior}
                    <h4>Created on(Date):</h4>
                    {r.createdAt}

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" data-bs-toggle="modal" onClick={()=>{openEditModal()}} >Edit Task</button>
                </div>
            </div>
        </div>
    )
}
export default Modal;