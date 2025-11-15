const initialState = {
  loading: false,
  files: [],
  error: null,
};

export const filesMetaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "files/loading":
      return { ...state, loading: true };

    case "files/success":
      return { ...state, loading: false, files: action.payload };

    case "files/error":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
