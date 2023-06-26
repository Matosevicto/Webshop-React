import React, { useEffect, useState } from "react";
import { Product } from "../interfaces";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import axios from "axios";

function ProductLists(): JSX.Element {
  const [productList, setProductList] = useState<Product[]>([]);
  const API_URL = "http://localhost:9000";

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

  return (
    <>
      <div className="container text-center text-light">
        <h1>
          <MdProductionQuantityLimits />
          Product Lists
        </h1>
        <h1>hajduk</h1>
      </div>

      <div className="wrapper">
        <div className="container">
          <div className="row">
            {productList.map((prodList: Product, key: number) => (
              <div className="col-md-3" key={key}>
                <div className="product-list">
                  <div className="product-image">
                    <img
                      src={prodList.thumbnail}
                      alt={prodList.title}
                      className="img-responsive"
                    />
                  </div>
                  <div className="product-handle">
                    <div className="category">
                      <span>{prodList.handle}</span>
                    </div>
                    <div className="product-title">
                      <h3>{prodList.title}</h3>
                    </div>
                    <div className="product-description">
                      <p>{prodList.description}</p>
                    </div>
                    <div className="card-footer">
                      <div className="product-price">
                        <span className="price">
                          {prodList.variants.map((variant: any) => (
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductLists;
