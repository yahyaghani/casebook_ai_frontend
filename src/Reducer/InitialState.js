// src/Reducer/InitialState.js

export const InitialState = {
    files: [],
    currentFile: null,
    fileHighlights: [],
    myPosts: [],
    allPosts: [],
    error: null,
    message: null,
    searchQuery: "",
    isModalOpen: false,
    nodeData: {},
    nodesData: {},
    graphData: {},
    showHighlight: false,
    highlightColors: JSON.parse(localStorage.getItem("highlightColors")) || { default: "#F48FB1", legalTest: "#E1BEE7", issue: "#D1C4E9", conclusion: "#B2EBF2" },
    auth: {
        userId: null,
        authToken: null,
        userPublicId: null,
        username: null,
        email: null,
        expiry: null,
        fname: null,
        lname: null,
        city: null,
        country: null,
        organisation: null,
    },
    highlightTextsForEditor: [],
    showFileViewer: false,
    showDashboardView: true,
    showProfileView: false,
    showFeedView: false,
    showTextAnonymizerView: false,
    showGptView: false,
    showLawsReader: false,
    accordionSections: [],
    showPdfViewer: true, // default to true to show the PDF viewer initially
    showMetadataViewer: false, // default to false to hide the metadata viewer initially

};
