import { encryptFile, encryptAesKey } from "../../crypto/encryption";
import { blobToBase64 } from "../../utils/BlobToBase64";
import { Api } from "../../network/api";

export const uploadFileThunk = (file) => async (dispatch) => {
  try {
    dispatch({ type: "upload/start" });

    const { encryptedBlob, aesKey, iv } = await encryptFile(file);
    const encryptedKey = await encryptAesKey(aesKey);
    const ivB64 = btoa(String.fromCharCode(...iv));

    
    const encryptedFileB64 = await blobToBase64(encryptedBlob);

    const payload = {
      fileName: file.name,
      encryptedFileData: encryptedFileB64,
      encryptedAESKey: encryptedKey,
      iv: ivB64,
      fileSize:file.size/ 1024
    };

    await Api.post("/admin/file", payload);

    dispatch({ type: "upload/success" });

  } catch (error) {
    dispatch({ type: "upload/error", payload: error.message });
  }
};
export const authenticateSignInUser =
  (userData, reset, toast, navigate, setloading) =>
  async (dispatch) => {
    try {
      setloading(true);
       const payload = {
  name: userData["register-username"],
  email: userData["register-email"],    
  password: userData["register-password"],
   image: "default.png",   
  role: "USER"  
};

      const { data } = await Api.post(
        "/admin/user/signin",
        payload,
        { withCredentials: true } 
      );

      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });

      localStorage.setItem("auth", JSON.stringify(data));

      toast.success("Login successful");
      reset();
      navigate("/");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Internal server error");
    } finally {
      setloading(false);
    }
  };

export const getAuthStatus = () => async (dispatch) => {
  try {
    const { data } = await Api.get("/jwt/verify"); 

    dispatch({
      type: "CHECK_AUTH",
      payload: data, 
    });
  } catch (error) {
    dispatch({
      type: "CHECK_AUTH",
      payload: null, 
    });
  }
};

export const loginUser =
  (userData, reset, toast, navigate, setloading) =>
  async (dispatch) => {
    try {
      setloading(true);

      const { data } = await Api.post(
        "/admin/user/login",
        userData,
        { withCredentials: true } 
      );

      
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });

      localStorage.setItem("auth", JSON.stringify(data));

      toast.success("Login successful");
      reset();
      navigate("/");

    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid credentials");
    } finally {
      setloading(false);
    }
  };
export const logoutUser = (toast, navigate) => async (dispatch) => {
  try {
    await Api.post("/logout", {}, { withCredentials: true });

    
    dispatch({ type: "LOGOUT_USER" });

    
    localStorage.removeItem("auth");

    toast.success("Logged out successfully");
    navigate("/login");

  } catch (error) {
    console.log(error);
    toast.error("Error while logging out");
  }


};
export const fetchFilesData = () => async (dispatch) => {
  try {
    dispatch({ type: "files/loading" });

    const { data } = await Api.get("/admin/filemetadata", {
      withCredentials: true,
    });

    dispatch({
      type: "files/success",
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: "files/error",
      payload: error?.response?.data?.message || "Failed to load files",
    });
  }
};
export const fetchSingleFileThunk = (fileId) => async (dispatch) => {
  try {
    dispatch({ type: "filedata/loading" });

    const { data } = await Api.get(`/admin/file/${fileId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "filedata/success",
      payload: {
        encryptedBlobB64: data.encryptedFileData,
        encryptedAesKeyB64: data.encryptedAESKey,
        ivB64: data.iv,
        fileName: data.fileName,
      }
    });

  } catch (error) {
    dispatch({
      type: "filedata/error",
      payload: error?.response?.data?.message || "Failed to fetch file data",
    });
  }
};
