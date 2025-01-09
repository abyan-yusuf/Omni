import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import AdminMenu from "../Components/AdminMenu";
import axios from "axios";
import ProductCard from "../Components/ProductCard";
import { Modal } from "antd";
import ProductForm from "../Components/ProductForm";
import { useAuthContext } from "../Apis/authContext.jsx";
import { toast } from "react-toastify";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://omni-yxd5.onrender.com/api/v1/products/all"
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState("");
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [featured, setFeatured] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);

  const [id, setId] = useState("");

  const [auth] = useAuthContext();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
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
      productInfo.append("image1", image1);
      productInfo.append("image2", image2);
      productInfo.append("featured", featured);
      productInfo.append("bestSeller", bestSeller);
      const { data } = await axios.post(
        "https://omni-yxd5.onrender.com/api/v1/products/create",
        productInfo,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      toast.success(data.message);
      setName("");
      setCode("");
      setDescription("");
      setOriginalPrice("");
      setDiscountPrice("");
      setCategory("");
      setSubCategory("");
      setSizes([]);
      setColor("");
      setImage1(null);
      setImage2(null);
      setFeatured(false);
      setBestSeller(false);
      getAllProducts();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message);
      setName("");
      setCode("");
      setDescription("");
      setOriginalPrice("");
      setDiscountPrice("");
      setCategory("");
      setSubCategory("");
      setSizes([]);
      setColor("");
      setImage1(null);
      setImage2(null);
    }
  };

  const handleCancel = () => {
    try {
      setName("");
      setCode("");
      setDescription("");
      setOriginalPrice();
      setDiscountPrice();
      setCategory("");
      setSubCategory("");
      setModalOpen(false);
    } catch (error) {
      console.error(error);
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
          <h1 className="text-3xl text-center">All Products</h1>
          <button
            className="btn ml-auto mr-auto"
            onClick={() => setModalOpen(true)}
          >
            Add Product
          </button>
          <div className="grid grid-cols-4 gap-5 mt-5 mr-20">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                name={product.name}
                price={product.originalPrice}
                category={product.category}
                id={product._id}
                discount={product.discountPrice}
                admin={true}
              />
            ))}
          </div>
        </div>
      </div>
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        closeIcon={false}
        footer={null}
      >
        <ProductForm
          cancelButton={true}
          name={name}
          setName={setName}
          code={code}
          setCode={setCode}
          sizes={sizes}
          setSizes={setSizes}
          description={description}
          setDescription={setDescription}
          originalPrice={originalPrice}
          setOriginalPrice={setOriginalPrice}
          discountPrice={discountPrice}
          setDiscountPrice={setDiscountPrice}
          category={category}
          setCategory={setCategory}
          subCategory={subCategory}
          color={color}
          setColor={setColor}
          image1={image1}
          setImage1={setImage1}
          image2={image2}
          setImage2={setImage2}
          setSubCategory={setSubCategory}
          handleSubmit={(e) => handleSubmit(e)}
          handleCancel={handleCancel}
          featured={featured}
          setFeatured={setFeatured}
          bestSeller={bestSeller}
          setBestSeller={setBestSeller}
        />
      </Modal>
    </Layout>
  );
};

export default AdminProducts;
