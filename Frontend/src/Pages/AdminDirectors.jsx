import Layout from "../Layout/Layout";
import AdminMenu from "../Components/AdminMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "antd";
import DirectorForm from "../Components/DirectorForm";
import { toast } from "react-toastify";
import { useAuthContext } from "../Apis/authContext";
import DirectorCard from "../Components/DirectorCard";

const AdminDirectors = () => {
  const [directors, setDirectors] = useState([]);
  console.log(directors);
  const getAllDirectors = async () => {
    try {
      const { data } = await axios.get(
        "http://backend.omnishoesbd.com/api/v1/directors/all"
      );
      setDirectors(data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getAllDirectors();
  }, []);

  const [addDirector, setAddDirector] = useState(false);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  console.log(name, designation, about, image);
  const [auth] = useAuthContext();

  const createDirector = async (e) => {
    try {
      e.preventDefault();
      const info = new FormData();
      info.append("name", name);
      info.append("designation", designation);
      info.append("about", about);
      info.append("image", image);
      console.log(info);
      const { data } = await axios.post(
        "https://backend.omnishoesbd.com/api/v1/directors/add",
        info,
        { headers: { Authorization: auth?.token } }
      );
      toast.success(data?.message);
      getAllDirectors();
      setName("");
      setDesignation("");
      setAbout("");
      setImage("");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const [updateDirector, setUpdateDirector] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDesignation, setUpdatedDesignation] = useState("");
  const [updatedAbout, setUpdatedAbout] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");
  const [updatedId, setUpdatedId] = useState("");
  console.log(updatedName, updatedDesignation, updatedAbout, updatedId);
  const updateDirectorInfo = async (e) => {
    try {
      e.preventDefault();
      const info = new FormData();
      info.append("name", updatedName);
      info.append("designation", updatedDesignation);
      info.append("about", updatedAbout);
      info.append(
        "image",
        updatedImage || directors.filter((d) => d._id === updatedId)[0].image
      );
      const { data } = await axios.put(
        `https://backend.omnishoesbd.com/api/v1/directors/update/${updatedId}`,
        info,
        { headers: { Authorization: auth?.token } }
      );
      toast.success(data?.message);
      getAllDirectors();
      setUpdateDirector(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const confirmation = window.confirm(
        "Are you sure you want to delete this director?"
      );
      if (!confirmation) return;
      const { data } = await axios.delete(
        `https://backend.omnishoesbd.com/api/v1/directors/delete/${id}`,
        { headers: { Authorization: auth?.token } }
      );
      toast.success(data?.message);
      setUpdateDirector(false);
      getAllDirectors();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4">
          <h1 className="text-4xl text-center text-semibold py-10">
            Directors
          </h1>
          <div className="grid grid-cols-3 gap-x-5 gap-y-20 place-items-stretch">
            {directors.map((d) => (
              <button
                onClick={() => {
                  setUpdateDirector(true);
                  setUpdatedName(d.name);
                  setUpdatedDesignation(d.designation);
                  setUpdatedAbout(d.about);
                  setUpdatedId(d._id);
                }}
                className="h-full"
              >
                <DirectorCard {...d} />
              </button>
            ))}
          </div>

          <button
            className="btn btn-primary my-10"
            onClick={() => setAddDirector(true)}
          >
            Add Director
          </button>
        </div>
      </div>
      <Modal
        open={addDirector}
        onCancel={() => setAddDirector(false)}
        footer={null}
      >
        <DirectorForm
          name={name}
          setName={setName}
          image={image}
          setImage={setImage}
          designation={designation}
          setDesignation={setDesignation}
          about={about}
          setAbout={setAbout}
          onSubmit={(e) => {
            createDirector(e);
            setAddDirector(false);
          }}
        />
      </Modal>
      <Modal
        open={updateDirector}
        onCancel={() => setUpdateDirector(false)}
        footer={null}
      >
        <DirectorForm
          name={updatedName}
          setName={setUpdatedName}
          id={updatedId}
          image={updatedImage}
          setImage={setUpdatedImage}
          designation={updatedDesignation}
          setDesignation={setUpdatedDesignation}
          about={updatedAbout}
          setAbout={setUpdatedAbout}
          onSubmit={(e) => {
            updateDirectorInfo(e);
            updateDirector(false);
          }}
          deleteButton={true}
          onDelete={() => handleDelete(updatedId)}
        />
      </Modal>
    </Layout>
  );
};

export default AdminDirectors;
