const initialState = {
  loading: false,
  file: null,
  error: null,
};

export const fileDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "filedata/loading":
      return { ...state, loading: true, error: null };

    case "filedata/success":
      return { ...state, loading: false, file: action.payload };

    case "filedata/error":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
