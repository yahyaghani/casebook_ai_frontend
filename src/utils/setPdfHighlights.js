import axios from 'axios';
import async from 'async';
import { BASE_URL_DEV } from '../utils';

export async function fetchAndSetFileHighlights(dispatch, state, file, setIsLoading) {
    try {
        console.log("Starting to fetch and set file highlights for file:", file);

        const result = await axios.get(`${BASE_URL_DEV}/highlights-json/${state.auth.userPublicId}/${file.name}`, {
            headers: {
                'x-access-token': state.auth && state.auth.authToken,
            }
        });

        console.log("Received highlights for file:", file.name, result.data);
        
        dispatch({ type: "SET_CURR_FILE", payload: file });
        console.log("Dispatched SET_CURR_FILE with payload:", file);
            
        if (result.data && result.data.highlights) {
            dispatch({
                type: "SET_FILE_HIGHLIGHTS",
                payload: {
                    name: file.name,
                    highlights: result.data.highlights
                }
            });
            console.log("Dispatched SET_FILE_HIGHLIGHTS with highlights for file:", file.name);
        } else {
            dispatch({
                type: "SET_FILE_HIGHLIGHTS",
                payload: {
                    name: file.name,
                    highlights: []
                }
            });
            console.log("Dispatched SET_FILE_HIGHLIGHTS with empty highlights for file:", file.name);
        }

        const filesResponse = await axios(`${BASE_URL_DEV}/get/files`, {
            headers: {
                "x-access-token": state.auth && state.auth.authToken,
            },
        });
        console.log("Fetched files response:", filesResponse.data);

        const allgraphs = await axios(`${BASE_URL_DEV}/get-graphdata`, {
            headers: {
                "x-access-token": state.auth && state.auth.authToken,
            },
        });
        console.log("Fetched graph data:", allgraphs.data);

        const Obj = {};
        allgraphs.data.graphdata.forEach(x => {
            Obj[x.fileName] = x.links.filter(e => e.source === "CITATION" || e.source === "PROVISION");
        });

        const fileNew = filesResponse.data.files.map(element => {
            return {
                ...element,
                CITATION: Obj[element.name] && Obj[element.name].length > 0 ? Obj[element.name].filter(e => e.source === "CITATION") : ["N/A"],
                PROVISION: Obj[element.name] && Obj[element.name].length > 0 ? Obj[element.name].filter(e => e.source === "PROVISION") : ["N/A"]
            };
        });
        console.log("New file data with citations and provisions:", fileNew);

        dispatch({ type: "ADD_FILE", payload: fileNew });
        dispatch({ type: "SET_MODAL", payload: true });

        if (setIsLoading) {
            setIsLoading(false);
        }
    } catch (error) {
        console.log("Error fetching and setting file highlights:", error);
        if (setIsLoading) {
            setIsLoading(false);
        }
    }
}
