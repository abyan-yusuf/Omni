import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import AdminMenu from "../Components/AdminMenu";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useAuthContext } from "../Apis/authContext";

const AdminColors = () => {
  const [colors, setColors] = useState([]);
  const [auth] = useAuthContext();
  const getAllColors = async () => {
    try {
      const { data } = await axios.get(
        "https://backend.omnishoesbd.com/api/v1/colors/all-colors"
      );
      setColors(data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllColors();
  }, []);

  const [addColor, setAddColor] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        "https://backend.omnishoesbd.com/api/v1/colors/create",
        { name },
        { headers: { Authorization: auth?.token } }
      );
      if (data) {
        toast.success(data.message);
        setAddColor(false);
        getAllColors();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const [updateColor, setUpdateColor] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [id, setId] = useState("");

  console.log(id);
  console.log(updatedName);

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.put(
        `https://backend.omnishoesbd.com/api/v1/colors/update/${id}`,
        { name: updatedName },
        { headers: { Authorization: auth?.token } }
      );
      if (data) {
        toast.success(data.message);
        setUpdateColor(false);
        getAllColors();
      }
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const prompt = window.confirm(
        "Are you sure you want to delete this color?"
      );
      if (prompt === true) {
        const { data } = await axios.delete(
          `https://backend.omnishoesbd.com/api/v1/colors/delete/${id}`,
          {
            headers: { Authorization: auth?.token },
          }
        );
        if (data) {
          toast.success(data.message);
          getAllColors();
        }
      } else return;
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4">
          <h1 className="text-4xl text-center font-semibold my-5">
            Manage Product Colors
          </h1>
          <button
            className="btn btn-info my-5"
            type="button"
            onClick={() => setAddColor(true)}
          >
            Add Color
          </button>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Preview</th>
                  <th>Name</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {colors.map((color) => (
                  <tr>
                    <td>
                      <div
                        className="w-10 h-10 rounded-full"
                        style={{ background: color.name }}
                      />
                    </td>
                    <td>{color.name}</td>
                    <td className="flex flex-wrap w-[20vw] gap-2">
                      <button
                        className="btn"
                        onClick={() => handleDelete(color._id)}
                      >
                        <img src="/delete.svg" alt="Delete" />
                      </button>
                      <button
                        className="btn"
                        onClick={() => {
                          setUpdateColor(true);
                          setUpdatedName(color.name);
                          setId(color._id);
                        }}
                      >
                        <img src="/edit.svg" alt="Edit" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal open={addColor} onCancel={() => setAddColor(false)} footer={null}>
        <form
          className="form-control my-5 gap-2"
          onSubmit={(e) => handleSubmit(e)}
        >
          <label htmlFor="name">Enter Color Name</label>
          <input
            type="text"
            placeholder="e.g. Red"
            id="name"
            className="input input-bordered rounded-none w-1/2"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="submit" className="btn btn-primary w-1/5 mt-2">
              Save
            </button>
            <button
              className="btn btn-warning w-1/5 mt-2"
              onClick={() => setAddColor(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        open={updateColor}
        onCancel={() => setUpdateColor(false)}
        footer={null}
      >
        <form
          className="form-control my-5 gap-2"
          onSubmit={(e) => handleUpdate(e)}
        >
          <label htmlFor="name">Enter Color Name</label>
          <input
            type="text"
            placeholder="e.g. Red"
            id="name"
            className="input input-bordered rounded-none w-1/2"
            required
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button type="submit" className="btn btn-primary w-1/5 mt-2">
              Save
            </button>
            <button
              className="btn btn-warning w-1/5 mt-2"
              onClick={() => setUpdateColor(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default AdminColors;
