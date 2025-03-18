import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Components/AdminMenu";
import axios from "axios";
import CategoryForm from "../Components/CategoryForm";
import { Modal } from "antd";
import useCategories from "../Hooks/useCategories";
import { useAuthContext } from "../Apis/authContext";
import { toast } from "react-toastify";
import SubCategoryForm from "../Components/SubCategoryForm";

const SubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [auth] = useAuthContext();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [selected, setSelected] = useState({});
  const [updatedName, setUpdatedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [parentCat, setParentCat] = useState("");
  const [updatedParentCat, setUpdatedParentCat] = useState("");

  const getAllSubCategories = async () => {
    const { data } = await axios.get(
      "https://backend.omnishoesbd.com/api/v1/sub-categories/all-sub-categories"
    );
    console.log(data);
    setSubCategories(data);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryInfo = new FormData();
      categoryInfo.append("name", name);
      categoryInfo.append("image", image);
      categoryInfo.append("parentCat", parentCat);
      const { data } = await axios.post(
        "https://backend.omnishoesbd.com/api/v1/sub-categories/create",
        categoryInfo,
        { headers: { Authorization: auth?.token } }
      );
      console.log(data);
      if (data) {
        toast.success("Category created successfully");
        setName("");
        setImage("");
        setParentCat("");
        setAddSubCategory(false);
        getAllSubCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while submitting");
    }
  };

  const handleDelete = async (id) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this category?"
      );
      if (!answer) {
        return;
      }
      const { data } = await axios.delete(
        `https://backend.omnishoesbd.com/api/v1/sub-categories/delete/${id}`,
        { headers: { Authorization: auth.token } }
      );
      if (data) {
        toast.success("Category deleted successfully");
        getAllSubCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setAddSubCategory(false);
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const categoryInfo = new FormData();
      categoryInfo.append("name", updatedName);
      categoryInfo.append("image", updatedImage);
      categoryInfo.append("parentCat", updatedParentCat);
      const { data } = await axios.put(
        `https://backend.omnishoesbd.com/api/v1/sub-categories/update/${selected}`,
        categoryInfo,
        { headers: { Authorization: auth.token } }
      );
      if (data) {
        toast.success("Category updated successfully");
        setUpdatedName("");
        setIsModalOpen(false);
        getAllSubCategories();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    getAllSubCategories();
  }, []);
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4 ml-2">
          <h2 className="text-3xl text-center mt-5 font-[forum] font-bold">
            Manage Sub Categories
          </h2>
          <div className="overflow-x-auto mt-10">
            <table className="table mb-5 font-[roboto]">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Root Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((subCategory, i) => (
                  <tr key={subCategory._id}>
                    <th>{i + 1}</th>
                    <td>
                      <img
                        src={`https://backend.omnishoesbd.com/api/v1/sub-categories/image/${subCategory._id}`}
                        className="h-20 w-auto"
                      />
                    </td>
                    <td>{subCategory.name}</td>
                    <td>{subCategory.parentCat.name}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setSelected(subCategory._id);
                          setIsModalOpen(true);
                          setUpdatedName(subCategory?.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error text-white"
                        onClick={() => {
                          handleDelete(subCategory._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {addSubCategory ? (
            <SubCategoryForm
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              value={name}
              image={image}
              className={"mb-5"}
              setImage={setImage}
              parent={parentCat}
              setParent={setParentCat}
              setValue={setName}
              cancelButton={true}
            />
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                setAddSubCategory(true);
              }}
            >
              Add category
            </button>
          )}
          <Modal
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}
            footer={null}
          >
            <SubCategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              image={updatedImage}
              setImage={setUpdatedImage}
              parent={updatedParentCat}
              setParent={setUpdatedParentCat}
              handleSubmit={handleUpdate}
              id={selected}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default SubCategories;
