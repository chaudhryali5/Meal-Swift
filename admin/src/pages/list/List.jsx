import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching list");
      }
    } catch (error) {
      toast.error("Failed to fetch list");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, [])

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/v1/remove`, { id: foodId });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error removing");
      }
    } catch (err) {
      toast.error("Failed to remove");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-xl sm:text-xl font-medium text-gray-700 mb-4">All Foods List</h1>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm">
          <div className="col-span-2 font-medium text-gray-600">Image</div>
          <div className="col-span-3 font-medium text-gray-600">Name</div>
          <div className="col-span-3 font-medium text-gray-600 hidden sm:block">Category</div>
          <div className="col-span-3 font-medium text-gray-600">Price</div>
          <div className="col-span-1 font-medium text-gray-600">Action</div>
        </div>

        {/* Table Body */}
        <div>
          {list.map((item, index) => (
            <div 
              key={index} 
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200 items-center hover:bg-gray-50 transition-colors text-sm"
            >
              <div className="col-span-2">
                <img 
                  src={`${url}/images/${item.image}`} 
                  alt={item.name}
                  className="w-10 h-10 sm:w-10 sm:h-10 object-cover rounded-md border border-gray-200"
                />
              </div>
              <div className="col-span-3">
                <p className="text-gray-700 font-normal truncate text-sm"> {item.name} </p>
              </div>
              <div className="col-span-3 hidden sm:block">
                <p className="text-gray-600 truncate text-sm"> {item.category} </p>
              </div>
              <div className="col-span-3">
                <p className="text-gray-700 font-medium text-sm">${item.price}</p>
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => removeFood(item._id)}
                  className="text-gray-400 hover:text-red-500 text-lg font-light cursor-pointer transition-colors"
                >
                  X
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default List
