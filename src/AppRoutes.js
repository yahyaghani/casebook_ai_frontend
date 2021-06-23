import React, { Suspense, lazy } from "react";
import Spinner from "./shared/Spinner";
import Highlight from "./shared/Highlight";
const Dashboard = lazy(() => import("./Dashboard/Index"));

function AppRoutes(props) {
  return (
    <Suspense fallback={<Spinner />}>
      {props.highlight === true && <Highlight />}
      <Dashboard
        showFileViewer={props.showFileViewer}
        showDashboardView={props.showDashboardView}
        showHighlight={props.showHighlight}
        showProfileView={props.showProfileView}
        showFeedView={props.showFeedView}
        showTextAnonymizerView={props.showTextAnonymizerView}
      />
    </Suspense>
  );
}

export default AppRoutes;
