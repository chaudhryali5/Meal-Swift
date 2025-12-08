import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(null); // null initially
  const [data, setData] = useState({
    name: "",
    price: "",
    category: "Salad" // default category
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/add", formData);

      if (response.data.success) { // assuming your backend returns { success: true }
        // Reset form completely
        setData({
          name: "",
          price: "",
          category: "Salad" // resets to default
        });
        setImage(null); // critical: must be null, not false!

        // Optional: Show success message
        alert("Product added successfully!");
        toast.success(response.data.message)
      } else {
        alert("Failed to add product: " + (response.data.message || "Unknown error"));
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="w-full max-w-lg lg:ml-10 sm:mx-auto mx-auto mt-10 p-6 text-base">
      <form onSubmit={onSubmitHandler} className="space-y-6">

        {/* Upload Image */}
        <div>
          <label htmlFor="product-image" className="mb-2 block font-medium">
            Upload Image
          </label>
          <div className="flex items-center space-x-4">
            <label
              htmlFor="product-image"
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center overflow-hidden cursor-pointer bg-gray-50"
            >
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  src={assets.upload_icon}
                  alt="Upload icon"
                  className="w-16 h-16 opacity-60"
                />
              )}
            </label>
            <input
              id="product-image"
              type="file"
              accept="image/*"
              required
              onChange={(e) => setImage(e.target.files[0] || null)}
              className="hidden"
            />
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="product-name" className="block mb-2 font-medium">
            Product Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Type here"
            value={data.name}
            onChange={onChangeHandler}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>

        {/* Category & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block mb-2 font-medium">
              Product Category
            </label>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Rice">Rice</option>
              <option value="Karahi">Karahi</option>
              <option value="Pasta">Pasta</option>
              <option value="Shami">Shami</option>
            </select>
          </div>

          <div>
            <label htmlFor="price" className="block mb-2 font-medium">
              Product Price
            </label>
            <input
              name="price"
              type="number"
              placeholder="00"
              value={data.price}
              onChange={onChangeHandler}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="px-8 py-3 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 transition duration-200"
          >
            ADD PRODUCT
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;