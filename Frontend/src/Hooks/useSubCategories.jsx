import axios from "axios";
import { useEffect, useState } from "react";

const useSubCategories = () => {
  const [subCategories, setSubCategories] = useState([]);

  const getSubCategories = async () => {
    const { data } = await axios.get(
      "/api/v1/sub-categories/all-sub-categories"
    );
    setSubCategories(data);
  };

  useEffect(() => {
    getSubCategories();
  }, []);
  return subCategories;
};

export default useSubCategories;