import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../components/Modal";
import Table from "../components/Table";
import { deleteProduct } from "../redux/productsReducer";
import AddProductForm from "./AddProductForm";
import Button from "./Button";
import EditProductForm from "./EditProductForm";
import Tooltip from "./Tooltip";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Column {
  label: string;
  field: keyof Product;
  width?: number;
  render?: (val: string | number, row: Product) => React.ReactNode;
}

interface RootState {
  products: Product[];
}

const ProductList: React.FC = () => {
  const products = useSelector<RootState, Product[]>((state) => state.products);
  const dispatch = useDispatch();
  
  const [visibleForm, setVisibleForm] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const tablePrice = useMemo(() => {
    return products.reduce((sum, product) => sum + product.price, 0);
  }, [products]);

  const columns: Column[] = [
    { label: "Tên", field: "name" },
    { label: "Giá", field: "price" },
    
    {  label: "Thao tác",
        field:"id",
      width: 130,
      render: (_val: string | number, row: Product) => (
        <>
          <Button
            onClick={() => {
              setVisibleForm(true);
              setIsEdit(true);
            }}
            size="small"
            className="primary"
          >
            Chỉnh sửa
          </Button>

          <Tooltip content={"Sau khi xóa, dữ liệu sẽ không thể khôi phục lại được"} position="left">
            <Button
              onClick={() => dispatch(deleteProduct(row.id))}
              style={{ marginLeft: 8 }}
              size="small"
              className="danger"
            >
              Xóa
            </Button>
          </Tooltip>
        </>
      ),
    },
  ];

  const tableData = [
    ...products,
    {
      id: "total",
      name: <strong>Tổng số</strong>,
      price: <strong>{tablePrice}</strong>,
      isSummaryRow: true,
    }
  ];

  return (
    <div>
      <Modal onClose={() => setVisibleForm(false)} isOpen={visibleForm}>
        {isEdit ? (
          <EditProductForm
            idSanPham={idSanPham}
            setVisibleForm={setVisibleForm}
          />
        ) : (
          <AddProductForm  setVisibleForm={setVisibleForm} />
        )}
      </Modal>
      <h1>Bảng Thông Tin</h1>
      <Tooltip
        content={products.length >= 10 ? "Chỉ được phép thêm tối đa 10 mặt hàng" : ""}
        position="right"
      >
        <Button
          disabled={products.length >= 10}
          style={{ marginBottom: 8 }}
          size="medium"
          onClick={() => {
            setVisibleForm(true);
            setIsEdit(false);
          }}
        >
          Thêm Hàng Hóa
        </Button>
      </Tooltip>
      <Table columns={columns} data={tableData} />
    </div>
  );
};

export default ProductList;
