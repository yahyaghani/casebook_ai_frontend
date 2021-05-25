export const InitialState = {
  files: [],
  currentFile: null,
  error: null,
  message: null,
  auth: {
    authToken: null,
    userPublicId: null,
    username: null,
    email: null,
  }
};

export const reducer = (state, action) => {
  if (action.type === "ADD_FILE") {
    return {
      ...state,
      files: [...state.files, action.payload],
      currentFile: state.files[0] || action.payload,
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
    return {
      ...state,
      auth: InitialState.auth,
    };
  }
  if (action.type === "SET_CURR_FILE") {
    return {
      ...state,
      currentFile: action.payload,
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
  if (action.type === "CLEAR") {
    return InitialState;
  }
  return state;
};
