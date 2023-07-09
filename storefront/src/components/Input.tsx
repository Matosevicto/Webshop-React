import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import axios from "axios";

function Input(props) {
  const [formData, setFormData] = useState({
    handle: "",
    title: "",
    description: "",
    thumbnail: "",
    variants: "",
  });

  const sendData = (event) => {
    event.preventDefault();
    console.log(formData);
    const forSend = processData(formData);

    const API_URL = "http://localhost:9000";

    axios
      .post(`${API_URL}/store/products`, forSend)
      .then((rez) => {
        props.add([...props.state, rez.data]);
      });
  };

  function processData(object) {
    return {
      id: "",
      handle: object.handle,
      title: object.title,
      description: object.description,
      thumbnail: object.thumbnail,
      variants: object.variants,
    };
  }

  function changeInput(event) {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  }

  return (
    <>
      <Card className="input-card">
        <h2>Input Product</h2>
        <form onSubmit={sendData}>
          <label>
            Handle:
            <input
              className="handle"
              type="text"
              name="handle"
              value={formData.handle}
              onChange={changeInput}
              required
            />
          </label>
          <label>
            Title:
            <input
              className="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={changeInput}
              required
            />
          </label>
          <label>
            Description:
            <input
              className="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={changeInput}
              required
            />
          </label>
          <label>
            Thumbnail:
            <input
              className="thumbnail"
              type="url"
              name="thumbnail"
              value={formData.thumbnail}
              onChange={changeInput}
              required
            />
          </label>
          <label>
            Variants:
            <input
              className="variants"
              type="number"
              name="variants"
              value={formData.variants}
              onChange={changeInput}
              required
            />
          </label>
          <button id="add-product" type="submit">Add Product</button>
        </form>
      </Card>
    </>
  );
}

export default Input;
