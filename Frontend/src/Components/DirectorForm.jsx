import React, { useEffect, useState } from "react";

const DirectorForm = ({
  name,
  setName,
  image,
  setImage,
  designation,
  setDesignation,
  about,
  setAbout,
  id,
  onSubmit,
  deleteButton,
  onDelete
}) => {
  const [url, setUrl] = useState("");

  const getImageUrl = () => {
    return image
      ? setUrl(URL.createObjectURL(image))
      : id
      ? setUrl(`https://backend.omnishoesbd.com/api/v1/directors/image/${id}`)
      : setUrl("");
  };
  useEffect(() => {
    getImageUrl();
  }, [image, id]);
  return (
    <form className="form-control space-y-5">
      <input
        type="text"
        placeholder="Director Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input"
        required
      />
      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
        className="input"
        required
      />
      <textarea
        type="text"
        placeholder="About"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        required
        className="textarea"
      />
      <input
        type="file"
        accept="image/*"
        className="file-input"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <img src={url} alt="preview" style={{ width: "100%" }} />
      <div className="flex space-x-">
      <button type="submit" className="btn w-32" onClick={onSubmit}>
        Submit
      </button>
      {deleteButton && (
        <button type="button" className="btn w-32" onClick={onDelete}>
          Delete
        </button>
      )}</div>
    </form>
  );
};

export default DirectorForm;
