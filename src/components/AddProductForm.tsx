import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productsReducer";
import Select from "./Select";

interface AddProductFormProps {
  setVisibleForm: (visible: boolean) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ setVisibleForm }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>(""); 
  const [selectedOption, setSelectedOption] = useState<string>(""); 
  const dispatch = useDispatch();

 
  const options = [
    { label: "Văn phòng phẩm", value: "1" },
    { label: "Thực phẩm", value: "2" },
    { label: "Khác", value: "3" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      alert("Giá phải là một số hợp lệ");
      return;
    }

    const newProduct = {
      id: Date.now(), 
      name,
      price: parsedPrice, 
      category: selectedOption, 
    };

    dispatch(addProduct(newProduct)); 
    setVisibleForm(false); 
  };

  return (
    <div className="form-container">
      <h2>Thêm Hàng Hóa</h2>
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
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <Select
          options={options}
          value={selectedOption}
          onChange={(value: string) => setSelectedOption(value)} 
          placeholder="Loại hàng hóa"
        />
        {selectedOption === "1" && (
          <input
            type="text"
            placeholder="Hạn sử dụng"
            required
          />
        )}
        <button type="submit">Thêm hàng hóa</button>
      </form>
      <button className="back-btn" onClick={() => setVisibleForm(false)}>
        Đóng
      </button>
    </div>
  );
};

export default AddProductForm;
