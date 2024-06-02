import React, { useContext } from 'react';
import { Button } from 'reactstrap';
import { UserContext } from '../App';
import { showFileViewer } from '../shared/SidebarItemData/data';
import { fetchAndSetFileHighlights } from "../utils/setPdfHighlights";
import { BASE_URL_DEV } from "../utils";

const FileViewerButton = ({ file, sideItemsClick }) => {
    const { state, dispatch } = useContext(UserContext);

    const handleViewPDF = async () => {
        console.log("Viewing PDF for file:", file);

        await fetchAndSetFileHighlights(dispatch, state, file, () => {});
        console.log("Finished fetching and setting highlights for file:", file);

        const updatedFile = {
            ...file,
            url: `${BASE_URL_DEV}/uploads/${state.auth.userPublicId}/${file.name}`
        };
        const justFilename = file.name;
        dispatch({ type: 'SET_CURR_FILE', payload: justFilename });
        console.log("Dispatched SET_CURR_FILE with payload:", justFilename);

        if (typeof sideItemsClick === 'function') {
            sideItemsClick({ showFileViewer: true });
        }

        dispatch({ type: 'TOGGLE_VIEWER', payload: showFileViewer });
        console.log("Dispatched TOGGLE_VIEWER with payload:", showFileViewer);
    };

    return (
        <Button color="primary" onClick={handleViewPDF}>View PDF</Button>
    );
};

export default FileViewerButton;
