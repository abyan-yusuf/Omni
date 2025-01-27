import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import AdminMenu from "../Components/AdminMenu";
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useAuthContext } from "../Apis/authContext";

const AdminSizes = () => {
  const [sizes, setSizes] = useState([]);

  const [auth] = useAuthContext();

  const getAllSizes = async () => {
    try {
      const { data } = await axios.get(
        "https://omni-1-men7.onrender.com/api/v1/sizes/all-sizes"
      );
      setSizes(data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllSizes();
  }, []);

  const [addSize, setAddSize] = useState(false);
  const [updateSize, setUpdateSize] = useState({ id: "", size: "" });
  console.log(updateSize);
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4">
          <h1 className="text-4xl text-center font-semibold my-5">
            Manage Product Sizes
          </h1>
          <button
            className="btn btn-info my-5"
            type="button"
            onClick={() => setAddSize(true)}
          >
            Add Size
          </button>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((size) => (
                  <tr>
                    <td>{size.size}</td>
                    <td className="flex flex-wrap gap-2">
                      <button
                        className="btn"
                        onClick={async () => {
                          try {
                            const confirm = window.confirm(
                              "Are you sure you want to delete this size?"
                            );
                            if (confirm) {
                              const { data } = await axios.delete(
                                `https://omni-1-men7.onrender.com/api/v1/sizes/delete/${size._id}`,
                                {
                                  headers: { Authorization: auth?.token },
                                }
                              );
                              if (data) {
                                toast.success(data.message);
                                getAllSizes();
                              }
                            }
                          } catch (error) {
                            toast.error(error?.response?.data?.message);
                          }
                        }}
                      >
                        <img src="/delete.svg" alt="Delete" />
                      </button>
                      <button
                        className="btn"
                        onClick={() =>
                          setUpdateSize({ id: size._id, size: size.size })
                        }
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
      <Modal open={addSize} onCancel={() => setAddSize(false)} footer={false}>
        <form
          className="flex flex-col items-baseline gap-5 mt-5"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const { data } = await axios.post(
                "https://omni-1-men7.onrender.com/api/v1/sizes/create",
                {
                  size: e.target.size.value,
                },
                { headers: { Authorization: auth?.token } }
              );
              if (data) {
                toast.success(data.message);
                setAddSize(false);
                e.target.reset();
                getAllSizes();
              }
            } catch (error) {
              toast.error(error?.response?.data?.message);
            }
          }}
        >
          <input
            type="number"
            placeholder="Size"
            required
            name="size"
            className="input input-bordered"
          />
          <div className="flex gap-5 flex-wrap">
            {" "}
            <button className="btn btn-info" type="submit">
              Save
            </button>
            <button onClick={() => setAddSize(false)} className="btn">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        open={updateSize.id !== "" && updateSize.name !== ""}
        onCancel={() => {
          setUpdateSize({ id: "", size: "" });
        }}
        footer={false}
      >
        <form
          className="gap-5 flex flex-col items-baseline mt-5"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const { data } = await axios.put(
                `https://omni-1-men7.onrender.com/api/v1/sizes/update/${updateSize.id}`,
                {
                  size: e.target.size.value,
                },
                { headers: { Authorization: auth?.token } }
              );
              if (data) {
                toast.success(data.message);
                setUpdateSize({ id: "", size: "" });
                getAllSizes();
              }
            } catch (error) {
              toast.error(error?.response?.data?.message);
            }
          }}
        >
          <input
            type="number"
            placeholder="Size"
            required
            name="size"
            className="input input-bordered"
            value={updateSize.size}
            onChange={(e) =>
              setUpdateSize({ ...updateSize, size: Number(e.target.value) })
            }
          />
          <div className="flex gap-5 flex-wrap">
            {" "}
            <button className="btn btn-info" type="submit">
              Save
            </button>
            <button
              onClick={() => {
                setUpdateSize({ id: "", size: "" });
              }}
              className="btn"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </Layout>
  );
};

export default AdminSizes;
