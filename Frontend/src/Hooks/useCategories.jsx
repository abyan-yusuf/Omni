import axios from "axios";
import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data } = await axios.get(
      "https://omni-1-men7.onrender.com/api/v1/categories/all-categories"
    );
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);
  return categories;
};

export default useCategories;
