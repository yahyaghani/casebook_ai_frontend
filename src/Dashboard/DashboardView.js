// @flow
import React, { useContext, useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { UserContext } from "../App";

function DashboardView() {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    async function fetchData() {
      if (!state.currentFile) return null;
      const result_json = await axios(`http://127.0.0.1:5000/api/v1/json?filename=${state.currentFile.name}`);
    }
    fetchData();
  }, [state.currentFile]);

  return (
    <div className="dashboard-view bg-dark p-5 text-center" style={{ width: "100%" }}>
      <h1>Main Dashboard</h1>
    </div>
  );
}

export default DashboardView;
