export const InitialState = {
  files: [],
  currentFile: null,
  error: null,
};

export const reducer = (state, action) => {
  if (action.type === "ADD_FILE") {
    return {
      files: [...state.files, action.payload],
      currentFile: state.files[0] || action.payload,
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
  if (action.type === "CLEAR") {
    return InitialState;
  }
  return state;
};
