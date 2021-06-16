import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../App";

function Highlight(props) {
  const {state} = useContext(UserContext);
  const [graphData, setGraphData] = useState({})
  const [nodesData, setNodesData] = useState([]);
  
  useEffect(() => {
    setGraphData(state.graphData)
  }, [state.graphData ]);

  return (
    <div className="sidebarnew"style={{ width: "25vw" }}>
      <ul className="sidebar__highlights" style={{"maxHeight": "96vh", "overflow": "scroll"}}>
      {graphData.nodes && graphData.nodes.map((node , index )=> (
          <li
          key ={index}
          className="sidebar__highlight"
        >
          <div>
            <p style={{"opacity":".5"}}>{state.nodesData[node.id] ? state.nodesData[node.id].docket_number : null }</p>
            <p>{state.nodesData[node.id] ? state.nodesData[node.id].name : node.id }</p>
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default Highlight;
