export const InitialState = {
  files: [],
  currentFile: null,
  fileHighlights: [],
  error: null,
  message: null,
  auth: {
    authToken: null,
    userPublicId: null,
    username: null,
    email: null,
    expiry: null,
  }
};

export const reducer = (state, action) => {
  if (action.type === "ADD_FILE") {
    if(!Array.isArray(action.payload)) action.payload = [action.payload];
    let Allfiles = [...state.files, ...action.payload];
    let fileNames = [];
    let files = Allfiles.filter((file) => {
      if(fileNames.includes(file.name)) return false;
      fileNames.push(file.name);
      return true;
    })
    return {
      ...state,
      files,
      currentFile: state.currentFile || action.payload[0],
    };
  }
  if (action.type === "AUTH") {
    const auth = {
        authToken: action.payload.auth_token,
        userPublicId: action.payload.userPublicId,
        username: action.payload.username,
        email: action.payload.email,
        expiry: action.payload.expiry || Date.parse(new Date()) + (29*60*1000),
      };
    localStorage.setItem('authDetails', JSON.stringify(auth));
    return {
      ...state,
      auth, 
    };
  }
  if (action.type === "LOG_OUT") {
    localStorage.clear();
    return InitialState;
  }
  if (action.type === "SET_CURR_FILE") {
    return {
      ...state,
      currentFile: action.payload,
    };
  }
  if (action.type === "FETCH_FILE_HIGHLIGHTS") {
    console.log(action.payload);
    return {
      ...state,
      fileHighlights: action.payload,
    };
  }
  if (action.type === "SET_FILE_HIGHLIGHTS") {
    console.log(action.payload);
    let highlights = [];
    if(state.fileHighlights.length > 0) {
      let fileUpdated = false;
      highlights = state.fileHighlights.map((singleFile) => {
        if(singleFile.name === action.payload.name) {
          singleFile.highlights = action.payload.highlights;
          fileUpdated = true;
        }
        return singleFile;
      });
      if(!fileUpdated) {
        highlights = [...state.fileHighlights, action.payload];
      }
    } else {
      highlights = [action.payload];
    }
    console.log(highlights);
    return {
      ...state,
      fileHighlights: highlights,
    };
  }
  if (action.type === "ERROR") {
    return {
      ...state,
      error: action.payload,
    };
  }
  if (action.type === "MESSAGE") {
    return {
      ...state,
      message: action.payload,
    };
  }
  return state;
};
