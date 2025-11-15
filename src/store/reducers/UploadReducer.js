const initialState = {
  file: null,
  status: "idle",
  error: null,
};

export default function uploadReducer(state = initialState, action) {
  switch (action.type) {
    case "upload/setFile":
      return { ...state, file: action.payload };
    case "upload/start":
      return { ...state, status: "uploading", error: null };
    case "upload/success":
      return { ...state, status: "success" };
    case "upload/error":
      return { ...state, status: "error", error: action.payload };
    default:
      return state;
  }
}
