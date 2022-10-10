import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store.hooks";
import { addProductAsync, getErrorMessage, Product } from "./product.slice";

const ProductForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const errorMessage = useSelector(getErrorMessage);

  const [product, setProduct] = useState<Product>({
    id: "",
    title: "",
    price: 0,
  });
  const [disableSubmitButton, setDisableSubmitButton] = useState<Boolean>(true);

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setProduct((prev) => {
      (prev as any)[name] = value;
      const newValue = { ...prev };
      return newValue;
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisableSubmitButton(false);
    await dispatch(addProductAsync(product));
    setDisableSubmitButton(true);

    //it will cause bug if we don't clear the value
    let productForm: HTMLElement | null =
      document.getElementById("product-form");

    if (!productForm?.classList.contains("error")) {
      let tempProduct: Product = { id: "", title: "", price: 0 };
      setProduct(tempProduct);
    }
  };

  const { title, price, id } = product;
  return (
    <>
      <h2>Add Game To The Store</h2>
      {errorMessage && <span>error: {errorMessage}</span>}
      <form
        id="product-form"
        onSubmit={handleSubmit}
        className={errorMessage ? "error" : ""}
      >
        <input
          style={{ border: errorMessage ? "1px solid red" : "" }}
          type="text"
          placeholder="Game title"
          name="title"
          value={title}
          onChange={handleChange}
        />
        <input
          style={{ border: errorMessage ? "1px solid red" : "" }}
          type="number"
          placeholder="Price"
          name="price"
          value={price}
          onChange={handleChange}
        />
        <input
          style={{ border: errorMessage ? "1px solid red" : "" }}
          type="text"
          placeholder="Id"
          name="id"
          value={id}
          onChange={handleChange}
        />
        <button
          style={{ backgroundColor: errorMessage ? "red" : "" }}
          type="submit"
          disabled={!disableSubmitButton}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default ProductForm;
