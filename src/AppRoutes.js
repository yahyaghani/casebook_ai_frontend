import React, { Suspense, lazy } from "react";
import Spinner from "./shared/Spinner";
import Highlight from "./shared/Highlight";
const Dashboard = lazy(() => import("./Dashboard/Index"));
const PdfViewer = lazy(() => import("./Dashboard/PdfViewer"));

function AppRoutes(props) {
    return (
        <Suspense fallback={<Spinner />}>
            {props.showHighlight && <Highlight />}
            {props.showFileViewer && <PdfViewer />}
            <Dashboard
                showFileViewer={props.showFileViewer}
                showDashboardView={props.showDashboardView}
                showHighlight={props.showHighlight}
                showProfileView={props.showProfileView}
                showFeedView={props.showFeedView}
                showTextAnonymizerView={props.showTextAnonymizerView}
                showGptView={props.showGptView}
                showLawsReader={props.showLawsReader}
            />
        </Suspense>
    );
}

export default AppRoutes;
