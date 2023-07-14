import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { Product } from "../interfaces";
import { BsFillCartPlusFill } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import axios from "axios";
import Popup from "reactjs-popup";
import { Dropdown } from "react-bootstrap";

function ProductLists(): JSX.Element {
  const [productList, setProductList] = useState<Product[]>([]);
  const API_URL = "http://localhost:9000";
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

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

  const handleTypeFilterChange = (value: string) => {
    if (typeFilter.includes(value)) {
      setTypeFilter(typeFilter.filter((type) => type !== value));
    } else {
      setTypeFilter([...typeFilter, value]);
    }
  };

  const handleStatusFilterChange = (value: string) => {
    if (statusFilter.includes(value)) {
      setStatusFilter(statusFilter.filter((status) => status !== value));
    } else {
      setStatusFilter([...statusFilter, value]);
    }
  };

  const filterProducts = (products: Product[]) => {
    return products
      .filter((product) => {
        if (typeFilter.length > 0) {
          return typeFilter.includes(product.handle?.toLowerCase() || "");
        }
        return true;
      })
      .filter((product) => {
        if (statusFilter.length > 0) {
          return statusFilter.includes(
            product.status === "published" ? "published" : "unpublished"
          );
        }
        return true;
      })
      .filter((product) => {
        if (searchQuery !== "") {
          return (
            product.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            false
          );
        }
        return true;
      });
  };

  const openModal = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = filterProducts(productList);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditZatvori = () => {
    setIsEditing(false);
  };

  interface Product {
    selectedVariant: any | null;
  }

  return (
    <>
      <div className="container text-center text-light">
        <h1>
          <MdProductionQuantityLimits />
          Products List
        </h1>
      </div>
      <div className="filtar">
        <div>
          <label></label>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="typeFilterDropdown">
                Type
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleTypeFilterChange("hoodie")}
                >
                  Hoodie
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleTypeFilterChange("coffee-mug")}
                >
                  Coffee mug
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleTypeFilterChange("shorts")}
                >
                  Shorts
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleTypeFilterChange("sweatpants")}
                >
                  Sweatpants
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleTypeFilterChange("t-shirt")}
                >
                  T-shirt
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div>
          <label></label>
          <div>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="statusFilterDropdown">
                Status
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => handleStatusFilterChange("published")}
                >
                  Published
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => handleStatusFilterChange("unpublished")}
                >
                  Unpublished
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div>
          <label htmlFor="searchQuery">Search:</label>
          <input
            id="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="wrapper">
        <div className="container">
          <div className="row">
            {filteredProducts.map((product: Product, key: number) => (
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
            <div className="product-variants">
              <label>Select Variant:</label>
              <select
                value={selectedProduct.selectedVariant}
                onChange={(e) => {
                  const variantId = e.target.value;
                  const selectedVariant = selectedProduct.variants.find(
                    (variant: any) => variant.id === variantId
                  );
                  setSelectedProduct({
                    ...selectedProduct,
                    selectedVariant,
                  });
                }}
              >

                <option value="">Choose variant</option>
                {selectedProduct.variants.map((variant: any) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name}
                  </option>
                ))}
              </select>
            </div>
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
                  {selectedProduct.selectedVariant && (
                    <span className="price">
                      {selectedProduct.selectedVariant.prices.map((price: any) => (
                        <React.Fragment key={price.id}>
                          {price.currency_code}: ${price.amount}
                        </React.Fragment>
                      ))}
                    </span>
                  )}
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

