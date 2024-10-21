import { useEffect, useState } from "react";
import thanas from "../../public/thanas.json";
import MapSelector from "./MapSelector";
import {
  getDistrictsByDivision,
  getDivisions,
  getUpazilasByDistrict,
} from "bd-geodata";

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
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [thanas, setThanas] = useState([]);
  const getData = async () => {
    setDivisions(getDivisions());
  };

  const [store, setStore] = useState({});

  const getDistricts = async (division_id) => {
    try {
      setDistricts(getDistrictsByDivision(division_id));
    } catch (error) {
      console.error(error);
    }
  };
  const getThanas = async (district_id) => {
    try {
      setThanas(getUpazilasByDistrict(district_id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (division) {
      getDistricts(division); // Automatically fetch districts when division is set
    }
  }, [division]);
  useEffect(() => {
    if (district) {
      getThanas(district); // Automatically fetch thanas when district is set
    }
  }, [district]);

  return (
    <form
      className={"form-control space-y-2 " + className}
      onSubmit={handleSubmit}
    >
      <input
        required={cancelButton}
        type="text"
        placeholder="Store Name"
        className="input w-96 input-bordered"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        required={cancelButton}
        type="text"
        placeholder="Store Code"
        className="input w-96 input-bordered"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <input
        required={cancelButton}
        type="text"
        placeholder="Street"
        className="input w-96 input-bordered"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
      />
      <select
        className="select select-bordered w-96"
        required
        value={division ? division : " "}
        onChange={(e) => {
          getDistricts(`${e.target.value}`);
          setDivision(e.target.value);
        }}
      >
        <option disabled selected value={" "}>
          Select Division
        </option>
        {divisions.map((division) => (
          <option key={division?.id} value={division?.id}>
            {division?.name}({division?.bn_name})
          </option>
        ))}
      </select>
      <select
        className="select select-bordered w-96"
        required
        value={district ? district : " "}
        onChange={(e) => {
          getThanas(e.target.value);
          setDistrict(e.target.value);
        }}
      >
        <option disabled selected value={" "}>
          Select District
        </option>
        {districts.length > 0 ? (
          districts?.map((district) => (
            <option key={district?.id} value={district?.id}>
              {district?.name}({district?.bn_name})
            </option>
          ))
        ) : (
          <option disabled>Select a division first</option>
        )}
      </select>
      <select
        className="select select-bordered w-96"
        value={thana ? thana : " "}
        onChange={(e) => setThana(e.target.value)}
        required
      >
        <option disabled selected value={" "}>
          Select Thana
        </option>
        {thanas?.length > 0 ? (
          thanas?.map((thana) => (
            <option key={thana?.id} value={thana?.id}>
              {thana?.name}({thana?.bn_name})
            </option>
          ))
        ) : (
          <options disabled>Select a district first</options>
        )}
      </select>
      <input
        required={cancelButton}
        type="email"
        placeholder="Email"
        className="input w-96 input-bordered"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        required={cancelButton}
        type="tel"
        placeholder="Phone"
        className="input w-96 input-bordered"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />{" "}
      <MapSelector
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        latitude={latitude}
        longitude={longitude}
      />
      <div className="space-x-2">
        <button
          type="submit"
          className="btn btn-primary w-20"
          disabled={!latitude || !longitude}
        >
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
