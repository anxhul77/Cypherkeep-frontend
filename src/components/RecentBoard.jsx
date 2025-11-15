import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleFileThunk } from "../store/actions";
import { decryptFile } from "../crypto/decryption";
import { base64ToBlob } from "../utils/Base64ToBlob";
import FilePreviewModal from "./FilePreviewModal";

function RecentBoard({ files }) {
  const [hoveredFile, setHoveredFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewName, setPreviewName] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const fileData = useSelector((state) => state.fileData.file);

  function onOpenFile(id, fileName) {
    dispatch(fetchSingleFileThunk(id));
    setPreviewName(fileName);
  }

  useEffect(() => {
    async function decryptAndPreview() {
      if (!fileData?.encryptedBlobB64) return;

      const encryptedBlob = base64ToBlob(
        fileData.encryptedBlobB64,
        "application/octet-stream"
      );

      const decryptedBlob = await decryptFile(
        encryptedBlob,
        fileData.ivB64,
        fileData.encryptedAesKeyB64
      );

      const url = URL.createObjectURL(decryptedBlob);

      setPreviewUrl(url);
      setOpenModal(true);
    }

    decryptAndPreview();
  }, [fileData]);

  return (
    <>
      {openModal && (
        <FilePreviewModal
          url={previewUrl}
          fileName={previewName}
          onClose={() => {
            setOpenModal(false);
            setPreviewUrl(null);
          }}
        />
      )}

      <select className="text-lg self-start mb-4 font-bold border-none ">
        <option>Recent files</option>
        <option>Shared files</option>
        <option>My files</option>
      </select>

      <div className="relative w-[660px] h-[400px] rounded-2xl bg-white shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        <div className="grid grid-cols-5 gap-8 px-4 py-2 bg-gray-50 font-semibold">
          <h1 className="col-span-2">Name</h1>
          <h1>Size</h1>
          <h1>Modified</h1>
          <h1>Status</h1>
        </div>

        {files?.length > 0 ? (
          files.map((file) => (
            <div
              key={file.id}
              className="relative grid grid-cols-5 gap-8 px-4 py-2 hover:bg-gray-100 rounded-lg"
              onMouseEnter={() => setHoveredFile(file.id)}
              onMouseLeave={() => setHoveredFile(null)}
            >
              <p className="col-span-2">{file.fileName}</p>
              <p>{file.fileSize} KB</p>
              <p>{file.updatedAt}</p>
              <p>Active</p>

              {hoveredFile === file.id && (
                <div className="absolute right-4 top-10 bg-white shadow-lg rounded-xl p-3 w-40 z-20 animate-fadeIn">
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
                    onClick={() => onOpenFile(file.id, file.fileName)}
                  >
                    📄 Open File
                  </button>

                  <button className="w-full text-left px-2 py-1 hover:bg-red-100 rounded-md text-red-500">
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-400 p-4 text-center">No files yet.</p>
        )}
      </div>
    </>
  );
}

export default RecentBoard;
