import React, { useEffect, useState, useContext } from "react";
import { Graph } from "react-d3-graph";
import axios from "axios";
import { Fragment } from "react";
import { UserContext } from "../App";

function GraphFunc(props) {
  const [graphData, setGraphData] = useState([]);
  const [errorText, setErrorText] = useState("");
  const {state, dispatch} = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {      
        await axios
        .get("http://127.0.0.1:5000/api/v1/graph", {
          params: {
            search_query: state.searchQuery
          }
        })
        .then(function (response) {
          setGraphData(response.data);
        })
        .catch(function (error) {
          setErrorText(error && error.response !== undefined && error.response.statusText);
        });
    }
    if(state.searchQuery !== ""){
      fetchData();
    }

  }, [state.searchQuery]);

  const myConfig ={
    "automaticRearrangeAfterDropNode": true,
    "collapsible": false,
    "directed": false,
    "focusAnimationDuration": 0.25,
    "focusZoom": 2,
    "freezeAllDragEvents": false,
    "height": 600,
    "highlightDegree": 1,
    "highlightOpacity": 0.2,
    "linkHighlightBehavior": true,
    "nodeHighlightBehavior": true,
    "maxZoom": 8,
    "minZoom": 0.1,
    "panAndZoom": false,
    "staticGraph": false,
    "staticGraphWithDragAndDrop": false,
    "width": 800,
    "d3": {
      "alphaTarget": 0.05,
      "gravity": -60,
      "linkLength": 300,
      "linkStrength": 1,
      "disableLinkForce": false
    },
    "node": {
      "color": "#d3d3d3",
      "fontColor": "black",
      "fontSize": 12,
      "fontWeight": "normal",
      "highlightColor": "lightgreen",
      "highlightFontSize": 10,
      "highlightFontWeight": "bold",
      "highlightStrokeColor": "SAME",
      "highlightStrokeWidth": 1.5,
      "labelProperty": "name",
      "mouseCursor": "pointer",
      "opacity": 1,
      "renderLabel": true,
      "size": 350,
      "strokeColor": "#ffc00",
      "strokeWidth": 1,
      "svg": "",
      "symbolType": "circle"
    },
    "link": {
      "color": "#d3d3d3",
      "fontColor": "#lightgreen",
      "fontSize": 10,
      "fontWeight": "normal",
      "highlightColor": "blue",
      "highlightFontSize": 8,
      "highlightFontWeight": "bold",
      "mouseCursor": "pointer",
      "opacity": 1,
      "renderLabel": false,
      "semanticStrokeWidth": false,
      "strokeWidth": 3,
      "markerHeight": 6,
      "markerWidth": 6,
      "strokeDasharray": 0,
      "strokeDashoffset": 0,
      "strokeLinecap": "butt"
    }
  };

  const onClickGraph = function (event) {
    //  window.alert('Clicked the graph background');
  };

  const onClickNode = function (nodeId, node) {
    // window.alert(`Clicked node ${nodeId} in position (${node.x}, ${node.y})`);
    const preview = graphData.nodes_previewes[nodeId] || []
    dispatch({type: "SET_NODE_PREVIEW" , payload: preview.join(" ") })
  };
  
  const onDoubleClickNode = function (nodeId, node) {
    //  window.alert('Double clicked node ${nodeId} in position (${node.x}, ${node.y})');
    window.open(graphData.nodes_urls[nodeId], '_blank');
  };

  const onRightClickNode = function (event, nodeId, node) {
    //  window.alert('Right clicked node ${nodeId} in position (${node.x}, ${node.y})');
  };

  const onMouseOverNode = function (nodeId, node) {
    //  window.alert(`Mouse over node ${nodeId} in position (${node.x}, ${node.y})`);
  };

  const onMouseOutNode = function (nodeId, node) {
    //  window.alert(`Mouse out node ${nodeId} in position (${node.x}, ${node.y})`);
  };

  const onClickLink = function (source, target) {
    //  window.alert(`Clicked link between ${source} and ${target}`);
  };

  const onRightClickLink = function (event, source, target) {
    //  window.alert('Right clicked link between ${source} and ${target}');
  };

  const onMouseOverLink = function (source, target) {
    //  window.alert(`Mouse over in link between ${source} and ${target}`);
  };

  const onMouseOutLink = function (source, target) {
    //  window.alert(`Mouse out link between ${source} and ${target}`);
  };

  const onNodePositionChange = function (nodeId, x, y) {
    //  window.alert(`Node ${nodeId} moved to new position x= ${x} y= ${y}`);
  };

  const onZoomChange = function (previousZoom, newZoom) {
    //  window.alert(`Graph is now zoomed at ${newZoom} from ${previousZoom}`);
  };

  return (
    <Fragment>
      {errorText === "" && (
        <Graph
          id="graph-id"
          data={graphData}
          config={myConfig}
          onClickGraph={onClickGraph}
          onClickNode={onClickNode}
          onDoubleClickNode={onDoubleClickNode}
          onRightClickNode={onRightClickNode}
          onClickLink={onClickLink}
          onRightClickLink={onRightClickLink}
          onMouseOverNode={onMouseOverNode}
          onMouseOutNode={onMouseOutNode}
          onMouseOverLink={onMouseOverLink}
          onMouseOutLink={onMouseOutLink}
          onNodePositionChange={onNodePositionChange}
          onZoomChange={onZoomChange}
        />
      )}

      {errorText !== "" && <div className="error_text"><p>{errorText}</p></div>}
    </Fragment>
  );
}

export default GraphFunc;
