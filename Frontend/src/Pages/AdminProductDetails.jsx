import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../Components/AdminMenu";
import Layout from "../Layout/Layout";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import ProductForm from "../Components/ProductForm";
import { useAuthContext } from "../Apis/authContext.jsx";

const AdminProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [description, setDescription] = useState();
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [product, setProduct] = useState({});
  const [auth] = useAuthContext();
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://omni-yxd5.onrender.com/api/v1/products/single/${id}`
      );
      setName(data.name);
      setCode(data.code);
      setDescription(data.description);
      setOriginalPrice(data.originalPrice);
      setDiscountPrice(data.discountPrice);
      setCategory(data.category);
      setSubCategory(data.subCategory);
      setColor(data.color);
      setFeatured(data.featured);
      setBestSeller(data.bestSeller);
      setProduct(data);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) {
        return;
      }
      const { data } = await axios.delete(
        `https://omni-yxd5.onrender.com/api/v1/products/delete/${id}`,
        {
          headers: { Authorization: auth?.token },
        }
      );
      if (data) toast.success(data?.message);
      navigate("/dashboard/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productInfo = new FormData();
      productInfo.append("name", name);
      productInfo.append("code", code);
      productInfo.append("description", description);
      productInfo.append("originalPrice", originalPrice);
      productInfo.append("discountPrice", discountPrice);
      productInfo.append("category", category);
      productInfo.append("subCategory", subCategory);
      productInfo.append(
        "sizes",
        JSON.stringify(sizes.map((size) => size._id))
      );
      productInfo.append("color", color);
      if (image1) productInfo.append("image1", image1 || product.image1);
      if (image2) productInfo.append("image2", image2 || product.image2);
      productInfo.append("featured", featured);
      productInfo.append("bestSeller", bestSeller);
      const { data } = await axios.put(
        `https://omni-yxd5.onrender.com/api/v1/products/update/${id}`,
        productInfo,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      console.log(data);
      toast.success(data.message);
      navigate("/dashboard/products");
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getSizes = async () => {
    if (product.sizes) {
      const { data } = await axios.get(
        "https://omni-yxd5.onrender.com/api/v1/sizes/all-sizes"
      );

      setSizes(
        data.filter(
          (s) =>
            product.sizes &&
            product.sizes.some((selectedSize) => selectedSize === s._id)
        )
      );
    }
  };

  useEffect(() => {
    getSizes();
  }, [product.sizes]);

  return (
    <Layout>
      <div className="flex">
        <div className="basis-1/4">
          <AdminMenu />
        </div>
        <div className="basis-3/4">
          <h2 className="text-4xl text-center text-semibold mt-5">
            Manage Product
          </h2>
          <div className="w-[30rem]">
            {product && sizes && (
              <ProductForm
                name={name}
                setName={setName}
                code={code}
                setCode={setCode}
                description={description}
                setDescription={setDescription}
                originalPrice={originalPrice}
                setOriginalPrice={setOriginalPrice}
                discountPrice={discountPrice}
                setDiscountPrice={setDiscountPrice}
                category={category}
                setCategory={setCategory}
                subCategory={subCategory}
                setSubCategory={setSubCategory}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                color={color}
                setColor={setColor}
                image1={image1}
                setImage1={setImage1}
                sizes={sizes}
                setSizes={setSizes}
                image2={image2}
                setImage2={setImage2}
                featured={featured}
                setFeatured={setFeatured}
                bestSeller={bestSeller}
                setBestSeller={setBestSeller}
                id={id}
                cancelButton={false}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminProductDetails;
