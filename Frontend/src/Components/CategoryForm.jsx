import React from "react";

const CategoryForm = ({
  handleSubmit,
  value,
  setValue,
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
