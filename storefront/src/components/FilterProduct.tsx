import React, { useEffect, useState } from "react";
import { Product } from "../interfaces";
import axios from "axios";


function FilterProduct(): JSX.Element {
  const [product, setProduct] = useState<Product[]>([]);
  const API_URL = "http://localhost:9000";
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [vrstaFilter, postaviVrstuFilter] = useState([]);
  const [statusFilter, postaviStatusFilter] = useState([]);
  const [searchQuery, postaviSearchQuery] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const response = await axios.get(`${API_URL}/store/products`);
      setProduct(response.data.products);
    } catch (error) {
      console.error("Error loading products", error);
    }
  }
  
  const handleVrstaFilterChange = (value) => {
    if (vrstaFilter.includes(value)) {
      postaviVrstuFilter(vrstaFilter.filter((vrsta) => vrsta !== value));
    } else {
      postaviVrstuFilter([...vrstaFilter, value]);
    }
  };

  const handleStatusFilterChange = (value) => {
    if (statusFilter.includes(value)) {
      postaviStatusFilter(statusFilter.filter((status) => status !== value));
    } else {
      postaviStatusFilter([...statusFilter, value]);
    }
  };

  const filtrirajZivotinje = (zivotinje) => {
    return zivotinje
      .filter((zivotinja) => {
        if (vrstaFilter.length > 0) {
          return vrstaFilter.includes(zivotinja.vrsta.toLowerCase());
        }
        return true;
      })
      .filter((zivotinja) => {
        if (statusFilter.length > 0) {
          return statusFilter.includes(
            zivotinja.udomljen ? "udomljena" : "nijeudomljena"
          );
        }
        return true;
      })
      .filter((zivotinja) => {
        if (searchQuery !== "") {
          return zivotinja.ime
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        }
        return true;
      });
  };
  return(
    <>
    
    </>
  )
}