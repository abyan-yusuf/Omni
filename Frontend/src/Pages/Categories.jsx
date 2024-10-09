import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Components/AdminMenu";
import axios from "axios";
import CategoryForm from "../Components/CategoryForm";
import { Modal } from "antd";
import useCategories from "../Hooks/useCategories";
import { useAuthContext } from "../Apis/authContext";
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [auth] = useAuthContext();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState({});
  const [updatedName, setUpdatedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory, setAddCategory] = useState(false);

  const getAllCategories = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/api/v1/categories/all-categories"
    );
    setCategories(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/categories/create",
        { name },
        { headers: { Authorization: auth?.token } }
        );
        console.log(data)
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

  const handleDelete = async () => {
    try {
      let answer = prompt(
        "Are you sure you want to delete this category?",
        "Yes"
      );
      if (answer !== "Yes") {
        return;
      }
      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/categories/delete/${selected?._id}`,
        { headers: { Authorization: auth.token } }
      );
      if (data) {
        toast.success("Category deleted successfully");
          getAllCategories();
          setSelected({})
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
    try {
    //   const { data } = await axios.put(
    //     `http://localhost:8000/api/v1/categories/update/${selected._id}`,
    //     { name: updatedName },
    //     { headers: { Authorization: auth.token } }
    //     );
    //   if (data) {
    //     toast.success("Category updated successfully");
    //     setUpdatedName("");
    //     setIsModalOpen(false);
    //     getAllCategories();
        //   }
        console.log(selected)
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
          <h2 className="text-3xl text-center">Manage Categories</h2>
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
                                src={`http://localhost:8000/api/v1/categories/image/${category._id}`}
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
                          setSelected(category);
                          handleDelete();
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
              className={"mb-5"}
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
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
