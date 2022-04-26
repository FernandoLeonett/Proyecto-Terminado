import React from "react";

const FileComponent = ({ imageHandler }) => {
  return (
    <>
      <label htmlFor="input">
        Presiona para cargar tu propio meme😀...
        <input
          type="file"
          accept="image/*"
          name="image-upload"
          id="input"
          onChange={imageHandler}
        />
      </label>
      <br />
    </>
  );
};

export default FileComponent;

