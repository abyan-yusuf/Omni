import { useState } from "react";
import divisions from "../../public/divisions.json";
import districts from "../../public/districts.json";
import thanas from "../../public/thanas.json";
import MapSelector from "./MapSelector";

const StoreForm = ({
  handleSubmit,
  name,
  setName,
  code,
  setCode,
  email,
  setEmail,
  phone,
  setPhone,
  street,
  setStreet,
  division,
  setDivision,
  district,
  setDistrict,
  thana,
  setThana,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  cancelButton,
  handleCancel,
  className,
}) => {
  const [store, setStore] = useState({});
  const [allThanas, setThanas] = useState([]);
  const [allDistricts, setDistricts] = useState([]);

  const getDistricts = async (division_id) => {
    try {
      const filteredDistricts = districts.filter(
        (district) => district.division_id === division_id
      );
      setDistricts(filteredDistricts);
    } catch (error) {
      console.error(error);
    }
  };
  const getThanas = async (district_id) => {
    try {
      const filteredThanas = thanas.filter(
        (thana) => thana.district_id === district_id
      );
      setThanas(filteredThanas);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className={"form-control space-y-2 " + className}
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        placeholder="Store Name"
        className="input w-96 input-bordered"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required
        type="text"
        placeholder="Store Code"
        className="input w-96 input-bordered"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        required
        type="text"
        placeholder="Street"
        className="input w-96 input-bordered"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <select
        className="select select-bordered w-96"
        required
        value={division}
        onChange={(e) => {
          getDistricts(`${e.target.value}`);
          setDivision(e.target.value);
        }}
      >
        <option disabled selected>
          Select Division
        </option>
        {divisions.map((division) => (
          <option key={division?.id} value={division?.id}>
            {division?.name}
          </option>
        ))}
      </select>
      <select
        className="select select-bordered w-96"
        required
        value={district}
        onChange={(e) => {
          getThanas(e.target.value);
          setDistrict(e.target.value);
        }}
      >
        <option disabled selected>
          Select District
        </option>
        {allDistricts.length > 0 ? (
          allDistricts?.map((district) => (
            <option key={district?.id} value={district?.id}>
              {district?.name}
            </option>
          ))
        ) : (
          <option disabled>Select a division first</option>
        )}
      </select>
      <select
        className="select select-bordered w-96"
        value={thana}
        onChange={(e) => setThana(e.target.value)}
        required
      >
        <option disabled selected>
          Select Thana
        </option>
        {allThanas?.length > 0 ? (
          allThanas?.map((thana) => (
            <option key={thana?.id} value={thana?.id}>
              {thana?.name}
            </option>
          ))
        ) : (
          <options disabled>Select a district first</options>
        )}
      </select>
      <input
        required
        type="text"
        placeholder="Email"
        className="input w-96 input-bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required
        type="text"
        placeholder="Phone"
        className="input w-96 input-bordered"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />{" "}
      <MapSelector setLatitude={setLatitude} setLongitude={setLongitude} />
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

export default StoreForm;
