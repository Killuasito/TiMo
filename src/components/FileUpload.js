import React, { useState } from "react";
import { uploadFile } from "../services/api";

const FileUpload = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setError(null);
      const result = await uploadFile(file);
      onUploadSuccess?.(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} disabled={uploading} />
      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
