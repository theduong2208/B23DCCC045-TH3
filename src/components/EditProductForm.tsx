import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProduct } from "../redux/productsReducer";

interface EditProductFormProps {
  setVisibleForm: (visible: boolean) => void;
  idSanPham: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ setVisibleForm, idSanPham }) => {
  const product = useSelector((state: { products: Product[] }) =>
    state.products.find((product) => product.id === idSanPham)
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0); 

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (product) {
      const parsedPrice = isNaN(price) ? 0 : price; 
      dispatch(updateProduct({ id: product.id, name, price: parsedPrice }));
      setVisibleForm(false);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedPrice = value ? parseFloat(value) : 0; 
    setPrice(parsedPrice);
  };

  return (
    <div className="form-container">
      <h2>Chỉnh Sửa Hàng Hóa</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên hàng hóa"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Giá hàng hóa"
          value={price || ""} // To avoid issues with empty string values
          onChange={handlePriceChange}
          required
        />
        <button type="submit">Lưu Thay Đổi</button>
      </form>
      <button
        className="back-btn"
        onClick={() => {
          setVisibleForm(false);
        }}
      >
        Quay Lại
      </button>
    </div>
  );
};

export default EditProductForm;
