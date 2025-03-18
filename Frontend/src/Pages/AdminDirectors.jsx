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
  const [auth] = useAuthContext()

  const createDirector = async (e) => {
    try {
      e.preventDefault()
      const info = new FormData();
      info.append("name", name);
      info.append("designation", designation);
      info.append("about", about);
      info.append("image", image);
      const { data } = await axios.post(
        "http://backend.omnishoesbd.com/api/v1/directors/add",
        info,
       { headers: { Authorization: auth?.token }}
      );
      toast.success(data?.message);
      getAllDirectors();
    } catch (error) {
      console.error(error)
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
          <h1 className="text-4xl text-center text-semibold">Directors</h1>
          <div className="grid grid-cols-2">
            {directors.map((d) => (
              <DirectorCard {...d} />
            ))}
          </div>
          <button
            className="btn btn-primary"
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
    </Layout>
  );
};

export default AdminDirectors;
