import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Tabel() {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetch("https://backend-r4h5.onrender.com/route/products")
      .then(res => res.json())
      .then(json => setState(json.data))
      .catch((error) => console.log(error));
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(`https://backend-r4h5.onrender.com/route/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setState(prevState => prevState.filter(product => product._id !== id));
      console.log(data.message || 'Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Product name</th>
              <th scope="col" className="px-6 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Brand</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {state.map((newdata) => {
              const { _id, media, title, price, brand, category } = newdata;
              return (
                <tr key={_id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{title}</th>
                  <td className="px-6 py-4">
                    <img src={`https://backend-r4h5.onrender.com/${media}`} alt={media} className="w-[30px] h-[30px]" />
                  </td>
                  <td className="px-6 py-4">{brand}</td>
                  <td className="px-6 py-4">{category}</td>
                  <td className="px-6 py-4">${price}</td>
                  <td className="px-6 py-4">
                    <Link to={`/update/${_id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline px-2 py-3">Edit</Link>
                    <button
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => deleteUser(_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Tabel;
