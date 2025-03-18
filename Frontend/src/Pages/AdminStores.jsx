import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Components/AdminMenu";
import axios from "axios";
import { Modal } from "antd";
import { useAuthContext } from "../Apis/authContext";
import { toast } from "react-toastify";
import StoreForm from "../Components/StoreForm";
import { getDistrictsByDivision, getDivisions } from "../data/index.js";

const AdminStores = () => {
  const [stores, setStores] = useState([]);
  const [auth] = useAuthContext();
  const [selected, setSelected] = useState(" ");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedCode, setUpdatedCode] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [updatedStreet, setUpdatedStreet] = useState("");
  const [updatedDivision, setUpdatedDivision] = useState("");
  const [updatedDistrict, setUpdatedDistrict] = useState("");
  const [updatedThana, setUpdatedThana] = useState("");
  const [updatedLatitude, setUpdatedLatitude] = useState("");
  const [updatedLongitude, setUpdatedLongitude] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [thana, setThana] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const getAllStores = async () => {
    const { data } = await axios.get(
      "https://backend.omnishoesbd.com/api/v1/showrooms/all-showrooms"
    );
    setStores(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://backend.omnishoesbd.com/api/v1/showrooms/create",
        {
          name,
          code,
          email,
          phone,
          street,
          division,
          district,
          area: thana,
          latitude,
          longitude,
        },
        { headers: { Authorization: auth.token } }
      );
      if (data) {
        setAddCategory(false);
        toast.success(data.message);
        getAllStores();
        setName("");
        setCode("");
        setEmail("");
        setPhone("");
        setStreet("");
        setDivision("");
        setDistrict("");
        setThana("");
        setLatitude("");
        setLongitude("");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this store?"
      );
      if (!answer) {
        return;
      } else if (id.length > 2) {
        const { data } = await axios.delete(
          `https://backend.omnishoesbd.com/api/v1/showrooms/delete/${id}`,
          { headers: { Authorization: auth.token } }
        );
        if (data) {
          toast.success("Store deleted successfully");
          getAllStores();
          setSelected({});
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
    try {
      const { data } = await axios.put(
        `https://backend.omnishoesbd.com/api/v1/showrooms/update/${selected._id}`,
        {
          name: updatedName,
          code: updatedCode,
          email: updatedEmail,
          phone: updatedPhone,
          street: updatedStreet,
          division: updatedDivision,
          district: updatedDistrict,
          area: updatedThana,
          latitude: updatedLatitude,
          longitude: updatedLongitude,
        },
        { headers: { Authorization: auth.token } }
      );
      if (data) {
        setIsModalOpen(false);
        toast.success("Category updated successfully");
        setUpdatedName("");
        getAllStores();
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllStores();
  }, []);

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/5">
          <AdminMenu />
        </div>
        <div className="basis-4/5 max-w-[78vw] ml-2">
          <h2 className="text-3xl text-center mt-5">Manage Showrooms</h2>
          <div className="overflow-x-auto mt-10">
            <table className="table mb-5">
              <thead>
                <tr>
                  <th></th>
                  <th>Maps</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Street</th>
                  <th>Thana</th>
                  <th>District</th>
                  <th>Division</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {stores.map((store, i) => (
                  <tr key={store._id}>
                    <th>{i + 1}</th>
                    <td>
                      <iframe
                        width="120"
                        height="150"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDTsMTmbpn388SyT2h9u2-eNnqplHJvviE&q=${store.location.coordinates[1]},${store.location.coordinates[0]}`}
                        allowFullScreen
                      ></iframe>
                    </td>
                    <td>{store.name}</td>
                    <td>{store.code}</td>
                    <td>{store.address.street}</td>
                    <td>{store.address.area}</td>
                    <td>{store.address.district}</td>
                    <td>{store.address.division}</td>
                    <td>{store.contact.email}</td>
                    <td>{store.contact.phone}</td>
                    <td className="flex flex-col space-y-2 w-20">
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setSelected(store);
                          setIsModalOpen(true);
                          setUpdatedName(store?.name);
                          setUpdatedCode(store?.code);
                          setUpdatedEmail(store?.contact?.email);
                          setUpdatedPhone(store?.contact?.phone);
                          setUpdatedStreet(store?.address?.street);
                          setUpdatedDivision(store?.address?.division);
                          setUpdatedDistrict(store?.address?.district);
                          setUpdatedThana(store?.address?.area);
                          setUpdatedLatitude(store?.location?.coordinates[1]);
                          setUpdatedLongitude(store?.location?.coordinates[0]);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-error text-white"
                        onClick={() => {
                          handleDelete(store._id);
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
            <StoreForm
              handleSubmit={handleSubmit}
              handleCancel={handleCancel}
              name={name}
              setName={setName}
              code={code}
              setCode={setCode}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              street={street}
              setStreet={setStreet}
              division={division}
              setDivision={setDivision}
              district={district}
              setDistrict={setDistrict}
              thana={thana}
              setThana={setThana}
              latitude={latitude}
              setLatitude={setLatitude}
              longitude={longitude}
              setLongitude={setLongitude}
              className={"mb-5"}
              cancelButton={true}
            />
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => {
                setAddCategory(true);
              }}
            >
              Add Store
            </button>
          )}
          <Modal
            onCancel={() => setIsModalOpen(false)}
            open={isModalOpen}
            footer={null}
          >
            <StoreForm
              name={updatedName}
              setName={setUpdatedName}
              code={updatedCode}
              setCode={setUpdatedCode}
              email={updatedEmail}
              setEmail={setUpdatedEmail}
              phone={updatedPhone}
              setPhone={setUpdatedPhone}
              street={updatedStreet}
              setStreet={setUpdatedStreet}
              division={updatedDivision}
              setDivision={setUpdatedDivision}
              district={updatedDistrict}
              setDistrict={setUpdatedDistrict}
              thana={updatedThana}
              setThana={setUpdatedThana}
              latitude={updatedLatitude}
              setLatitude={setUpdatedLatitude}
              longitude={updatedLongitude}
              setLongitude={setUpdatedLongitude}
              handleSubmit={handleUpdate}
              handleDelete={handleDelete}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default AdminStores;
