import React from "react";
import "./App.css";
import ProductForm from "./Products/ProductForm";
import ProductsList from "./Products/ProductList";
import { Provider } from "react-redux";
import store from "./store";
import Cart from "./Cart/Cart";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ProductsList />
        <ProductForm />
        <Cart />
      </div>
    </Provider>
  );
}

export default App;
