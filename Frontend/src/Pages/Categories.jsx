import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Components/AdminMenu";
import axios from "axios";
import CategoryForm from "../Components/CategoryForm";
import { Modal } from "antd";
import { useAuthContext } from "../Apis/authContext";
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [auth] = useAuthContext();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [selected, setSelected] = useState(" ");
  const [updatedName, setUpdatedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  const getAllCategories = async () => {
    const { data } = await axios.get(
      "https://omni-yxd5.onrender.com/api/v1/categories/all-categories"
    );
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const categoryInfo = new FormData();
      categoryInfo.append("name", name);
      categoryInfo.append("image", image);
      const { data } = await axios.post(
        "https://omni-yxd5.onrender.com/api/v1/categories/create",
        categoryInfo,
        { headers: { Authorization: auth?.token } }
      );
      console.log(data);
      if (data) {
        toast.success("Category created successfully");
        setName("");
        setAddCategory(false);
        getAllCategories();
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
      if (id.length > 2) {
        const { data } = await axios.delete(
          `https://omni-yxd5.onrender.com/api/v1/categories/delete/${id}`,
          { headers: { Authorization: auth.token } }
        );
        if (data) {
          toast.success("Category deleted successfully");
          getAllCategories();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    setAddCategory(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const categoryInfo = new FormData();
    categoryInfo.append("name", updatedName);
    categoryInfo.append("image", updatedImage);
    try {
      const { data } = await axios.put(
        `https://omni-yxd5.onrender.com/api/v1/categories/update/${selected._id}`,
        categoryInfo,
        { headers: { Authorization: auth.token } }
      );
      if (data) {
        toast.success("Category updated successfully");
        setUpdatedName("");
        setIsModalOpen(false);
        getAllCategories();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4 ml-2">
          <h2 className="text-3xl text-center mt-5">Manage Categories</h2>
          <div className="overflow-x-auto mt-10">
            <table className="table mb-5">
              <thead>
                <tr>
                  <th></th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, i) => (
                  <tr key={category._id}>
                    <th>{i + 1}</th>
                    <td>
                      <img
                        src={`https://omni-yxd5.onrender.com/api/v1/categories/image/${category._id}`}
                        className="h-20 w-auto"
                      />
                    </td>
                    <td>{category.name}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setSelected(category);
                          setIsModalOpen(true);
                          setUpdatedName(category?.name);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error text-white"
                        onClick={() => {
                          handleDelete(category._id);
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
          {addCategory ? (
            <CategoryForm
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              value={name}
              image={image}
              className={"mb-5"}
              setImage={setImage}
              setValue={setName}
              cancelButton={true}
            />
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                setAddCategory(true);
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
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              image={updatedImage}
              setImage={setUpdatedImage}
              handleSubmit={handleUpdate}
              id={selected?._id}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
