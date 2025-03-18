import axios from "axios";
import { useEffect, useState } from "react";

const useSizes = () => {
  const [sizes, setSizes] = useState([]);

  const getSizes = async () => {
    const { data } = await axios.get(
      "https://backend.omnishoesbd.com/api/v1/sizes/all-sizes"
    );
    setSizes(data);
  };

  useEffect(() => {
    getSizes();
  }, []);
  return sizes;
};

export default useSizes;
