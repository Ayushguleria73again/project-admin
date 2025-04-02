import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const [state, setState] = useState({
    title: '',
    brand: '',
    price: '',
    category: '',
    description: ''
  });
  const [filePreview, setFilePreview] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/route/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.data) {
          setState(json.data);
          setFilePreview(json.data.media);
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      });
  }, [id]);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

 
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview(file); 
    }
  };

  const submitValue = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedData = new FormData();
    updatedData.append('title', state.title);
    updatedData.append('brand', state.brand);
    updatedData.append('price', state.price);
    updatedData.append('category', state.category);
    updatedData.append('description', state.description);

    if (filePreview) {
      updatedData.append('file', filePreview);
    }

    try {
      const response = await fetch(`http://localhost:8000/route/update/${id}`, {
        method: 'PATCH',
        body: updatedData,
      });

      const result = await response.json();
      setIsLoading(false);
      if (result.success == true) {
        alert('Product updated successfully!');
      } else {
        alert('Update failed! Please try again.');
      }
    } catch (error) {
      setIsLoading(false);
      alert('An error occurred while updating the product.',error);
    }
  };

  console.log(state);
  console.log(filePreview);

  return (
    <div className="w-[100%] h-[100vh] bg-gray-400 fixed top-0">
      <div
        id="createProductModal"
        tabIndex="-1"
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Product</h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-target="createProductModal"
                data-modal-toggle="createProductModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form onSubmit={submitValue} encType="multipart/form-data">
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required
                    onChange={handleChange}
                    value={state.title || ''}
                  />
                </div>
                <div>
                  <label htmlFor="media" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Photo</label>
                  <input
                    type="file"
                    name="file"
                    id="media"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    onChange={handleMediaChange}
                  />
                  {filePreview && typeof filePreview !== 'string' && (
                    <img
                      src={URL.createObjectURL(filePreview)}
                      alt="file preview"
                      className="mt-2 w-32 h-32 object-cover"
                    />
                  )}
                  {filePreview && typeof filePreview === 'string' && (
                    <img
                      src={`http://localhost:8000/${filePreview}`}
                      alt="current product image"
                      className="mt-2 w-32 h-32 object-cover"
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Product brand"
                    required
                    onChange={handleChange}
                    value={state.brand || ''}
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required
                    onChange={handleChange}
                    value={state.price || ''}
                  />
                </div>
                <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    name="category"
                    onChange={handleChange}
                    value={state.category || ''}
                  >
                    <option value="">Select category</option>
                    <option value="TV">TV/Monitors</option>
                    <option value="PC">PC</option>
                    <option value="GA">Gaming/Console</option>
                    <option value="PH">Phones</option>
                    <option value="TOYS">Toys</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea
                    id="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write product description here"
                    name="description"
                    onChange={handleChange}
                    value={state.description || ''}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
                disabled={isLoading}
              >
                {isLoading ? 'Updating...' : 'Update'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
