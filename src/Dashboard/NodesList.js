import React, { useEffect, useContext, useState } from "react";
import { UserContext } from "../App";

function Highlight(props) {
  const {state, dispatch} = useContext(UserContext);
  const [graphData, setGraphData] = useState({})
  useEffect(() => {
    setGraphData(state.graphData)
  }, [state.graphData ]);

  function handleNodeItemClick(node){
    const nodeData = state.nodesData[node.id]
    if (nodeData){
      dispatch({type: "SET_NODE_DATA" , payload: nodeData })
    }
  }

  return (
    <div className="sidebarnew"style={{ width: "25vw" }}>
      <ul className="sidebar__highlights" style={{"maxHeight": "96vh", "overflow": "scroll"}}>
      {graphData.nodes && graphData.nodes.map((node , index )=> (
        node.id !== state.searchQuery ?
          <li
          onClick={()=>handleNodeItemClick(node)}
          key ={index}
          className="sidebar__highlight"
        >
          <div>
            <p style={{"opacity":".5"}}>{state.nodesData[node.id] ? state.nodesData[node.id].docket_number : null }</p>
            <p>{state.nodesData[node.id] ? state.nodesData[node.id].name : node.id }</p>
          </div>
        </li>: null 
      ))}
      </ul>
    </div>
  );
}

export default Highlight;
