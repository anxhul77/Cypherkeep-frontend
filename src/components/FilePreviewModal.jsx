import React from "react";

function FilePreviewModal({ url, fileName, onClose }) {
  if (!url) return null;

  const extension = fileName?.split(".").pop().toLowerCase();

  const isImage = ["png", "jpg", "jpeg", "webp", "gif"].includes(extension);
  const isPdf = extension === "pdf";
  const isVideo = ["mp4", "webm"].includes(extension);
  const isText = ["txt", "json", "md"].includes(extension);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">

      <div className="bg-white w-[80%] h-[80%] rounded-2xl shadow-2xl p-5 relative flex flex-col">

        <button
          className="absolute top-3 right-4 text-2xl hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>

     
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold">{fileName}</h2>

          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow"
          >
            ⬇ Download
          </button>
        </div>

        <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">

          {isImage && (
            <img
              src={url}
              alt={fileName}
              className="w-full h-full object-contain"
            />
          )}

          {isPdf && (
            <iframe
              src={url}
              title="PDF viewer"
              className="w-full h-full"
            />
          )}

          {isVideo && (
            <video controls className="w-full h-full rounded-lg">
              <source src={url} />
              Your browser does not support video playback.
            </video>
          )}

          {isText && (
            <iframe
              src={url}
              className="w-full h-full bg-white p-4"
              title="Text Viewer"
            />
          )}

          {/* Unknown File Type */}
          {!isImage && !isPdf && !isVideo && !isText && (
            <div className="flex flex-col justify-center items-center h-full text-gray-600">
              <p className="text-lg mb-2">No preview available</p>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Download File
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default FilePreviewModal;
