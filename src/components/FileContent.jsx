function FileContent({ files }) {
  return (
    <>
      <div className="w-[450px] bg-white h-[300px] rounded-3xl p-4 shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Selected files</h1>
        
        
        <div className="shadow-lg rounded-2xl overflow-y-auto max-h-[220px] scrollbar-thin scrollbar-thumb-gray-300">
          {files && files.length > 0 ? (
            files.map((file, index) => (
              <div
                key={index}
                className="p-2 flex justify-between items-center hover:bg-gray-100 rounded-lg"
              >
                <span className="text-gray-700">{file.name}</span>
                <span className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-400 p-2 text-center">No files selected.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default FileContent;
