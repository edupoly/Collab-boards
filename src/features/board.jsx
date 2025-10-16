import React from "react";
import Cardtodolist from "./cardboardtitles";
import { useGettodolistQuery } from "../services/boardapi";

function Boardtodos() {
  const { isLoading, data } = useGettodolistQuery();
  // console.log("boarddata", data);
  // console.log(isLoading, data);

  return (
    <div className="vh-100">
    <div className="d-flex flex-wrap justify-content-start gap-5 m-5 ">
      {!isLoading &&
        data?.map((s) => {  
          return <Cardtodolist key={s?.title} todos={s}></Cardtodolist>;
        })}
    </div>
    </div>
  );
}
export default Boardtodos;
