import { configureStore } from "@reduxjs/toolkit";
import uploadReducer from "./reducers/UploadReducer";
import { authReducer } from "./reducers/authReducer";
import { errorReducer } from "./reducers/errorReducer";
import { fileDataReducer } from "./reducers/fileDataReducer";
import { filesMetaReducer } from "./reducers/fileMetaReducer";


export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    auth: authReducer,
    errors: errorReducer,
    fileMeta:  filesMetaReducer,
    fileData: fileDataReducer,  
  },
});
