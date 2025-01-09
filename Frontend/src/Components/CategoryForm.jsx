const CategoryForm = ({
  handleSubmit,
  value,
  setValue,
  image,
  id,
  setImage,
  cancelButton,
  handleCancel,
  className,
}) => {
  return (
    <form
      className={"form-control space-y-2 " + className}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        placeholder="Category Name"
        className="input w-96 input-bordered"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type="file"
        required
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="file-input file-input-bordered w-full max-w-xs"
      />
      <img
        src={
          (image && URL.createObjectURL(image)) ||
          (id && `https://omni-yxd5.onrender.com/api/v1/categories/image/${id}`)
        }
        className="h-auto w-52"
      />
      <div className="space-x-2">
        <button type="submit" className="btn btn-primary w-20">
          Submit
        </button>
        {cancelButton ? (
          <button
            type="button"
            className="btn btn-primary w-20"
            onClick={handleCancel}
          >
            Cancel
          </button>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
};

export default CategoryForm;
