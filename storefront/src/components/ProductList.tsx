import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { Product } from "../interfaces";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import axios from "axios";
import Popup from "reactjs-popup";

function ProductLists(): JSX.Element {
  const [productList, setProductList] = useState<Product[]>([]);
  const API_URL = "http://localhost:9000";
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Updated type to Product | null

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await axios.get(`${API_URL}/store/products`);
      setProductList(response.data.products);
    } catch (error) {
      console.error("Error loading products", error);
    }
  }

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="container text-center text-light">
        <h1>
          <MdProductionQuantityLimits />
          Products List
        </h1>
      </div>

      <div className="wrapper">
        <div className="container">
          <div className="row">
            {productList.map((product: Product, key: number) => (
              <div
                className="col-md-3"
                key={key}
                onClick={() => openModal(product)} 
              >
                <div className="product-list">
                  <div className="product-image">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="img-responsive"
                      height={350}
                      width={350}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Popup
         className="popup-content" 
         open={selectedProduct !== null}
         onClose={closeModal}
        
      >
        {selectedProduct && (
          <div className="image-container">
            <img
                      src={selectedProduct.thumbnail}
                      alt={selectedProduct.title}
                      className="img-responsive"
                      height={350}
                      width={350}
                    />
            <div className="product-handle">
              <div className="category">
                <span>Category: {selectedProduct.handle}</span>
              </div>
              <div className="product-title">
                <h3>{selectedProduct.title}</h3>
              </div>
              <div className="product-description">
                <p>{selectedProduct.description}</p>
              </div>
              <div className="card-footer">
                <div className="product-price">
                  <span className="price">
                    {selectedProduct.variants.map((variant: any) => (
                      <React.Fragment key={variant.id}>
                        {variant.prices.map((price: any) => (
                          <React.Fragment key={price.id}>
                            {price.currency_code}: $
                            {price.amount / variant.inventory_quantity}
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    ))}
                  </span>
                </div>
                <div className="product-cart">
                  <a href="#" className="product-buy-btn">
                    <BsFillCartPlusFill />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
}

export default ProductLists;

