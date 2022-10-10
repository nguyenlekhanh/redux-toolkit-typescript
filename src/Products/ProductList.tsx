import React from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../Cart/cart.slice";
import { useAppDispatch } from "../store.hooks";
import { getProductsSeletor, Product, removeProduct } from "./product.slice";

const ProductsList: React.FC = () => {
  const products = useSelector(getProductsSeletor);
  const dispatch = useAppDispatch();

  const removeFromStore = (id: string) => {
    console.log(this);
    dispatch(removeProduct(id));
  };

  const addToCartHandler = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <div>
      <label>Games List</label>
      {products.map((product: Product) => (
        <div key={product.id}>
          <span>{`${product.title} : $${product.price}`}</span>
          <button onClick={() => addToCartHandler(product)}>Add To Cart</button>
          <button onClick={() => removeFromStore(product.id)}>
            Remove from the store
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
