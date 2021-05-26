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
    expiry: null,
  }
};

export const reducer = (state, action) => {
  if (action.type === "ADD_FILE") {
    if(!Array.isArray(action.payload)) action.payload = [action.payload];
    console.log('typeof file', Array.isArray(action.payload));
    return {
      ...state,
      files: [...state.files, ...action.payload],
      currentFile: state.files[0] || action.payload[0],
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
