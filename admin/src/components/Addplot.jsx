import React, { useState } from 'react';
import upload_area from '../components/Assets/Admin_Assets/upload_area.svg';

const AddPlot = () => {
  const [images, setImages] = useState([]);
  const [plotDetails, setPlotDetails] = useState({
    title: "",
    description: "",  
    category: "",
    location: "",
    nearby: "",
    size: "",
    price: ""
  });

  const imageHandler = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const changeHandler = (e) => {
    setPlotDetails({ ...plotDetails, [e.target.name]: e.target.value });
  };

  const addPlot = async () => {
    console.log(plotDetails);
    let responseData;
    let plot = plotDetails;
    let formData = new FormData();

    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      plot.images = responseData.image_urls;
      console.log(plot);
      await fetch('http://localhost:5000/addplot', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plot),
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? alert('Plot Added') : alert('Failed');
        });
    }
  };

  return (
    <div className='w-[80%] h-screen bg-gray-200'>
      <div>
        <form className='flex-col flex gap-4 items-start bg-white h-screen p-6'>
          <label htmlFor="title">Title</label>
          <input value={plotDetails.title} onChange={changeHandler} type="text" id="title" placeholder='Type here' name='title' className='bg-transparent border-2 border-black rounded-lg p-2 w-full' />

          <label htmlFor="description">Description</label>
          <textarea value={plotDetails.description} onChange={changeHandler} id="description" placeholder='Type here' name='description' className='bg-transparent border-2 border-black rounded-lg p-2 w-full'></textarea>

          <label htmlFor="category">Category</label>
          <select value={plotDetails.category} onChange={changeHandler} id="category" name='category' className='bg-transparent border-2 border-black rounded-lg p-2 w-full'>
            <option value="" disabled>Select category</option>
            <option value="open plots">Open Plots</option>
            <option value="house/villa">House/Villa</option>
            <option value="apartment">Apartment</option>
            <option value="farm/agricultural lands">Farm/Agricultural Lands</option>
            <option value="commercial properties/shops">Commercial Properties/Shops</option>
          </select>

          <label htmlFor="location">Location</label>
          <select name="location" id="location" value={plotDetails.location} onChange={changeHandler} className='bg-transparent border-2 border-black rounded-lg p-2 w-full'>
          <option value="" disabled>Select Location</option>
            <option value="nizamabad">Nizamabad</option>
            <option value="hyderabad">Hyderabad</option>
          </select>
          <label htmlFor="size">{plotDetails.category === 'house/villa' ? 'Built Area' : 'Size'}</label>
          <input value={plotDetails.size} onChange={changeHandler} type="text" id="size" placeholder='Type here' name='size' className='bg-transparent border-2 border-black rounded-lg p-2 w-full' />
          <label htmlFor="nearby">NearBy Location</label>
          <input value={plotDetails.nearby} onChange={changeHandler} type="text" id="nearby" placeholder='Enter Nearby location' name='nearby' className='bg-transparent border-2 border-black rounded-lg p-2 w-full' />

          <label htmlFor="price">Price</label>
          <input value={plotDetails.price} onChange={changeHandler} type="text" id="price" placeholder='Type here' name='price' className='bg-transparent border-2 border-black rounded-lg p-2 w-full' />

          <label htmlFor="plotImages" className='font-medium border-2 px-6 py-2 rounded-md'>Add Images</label>
          <input onChange={imageHandler} type="file" name='images' id='plotImages' multiple />
          {images.length > 0 && (
            <div>
              {Array.from(images).map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt="" className='w-40 h-44' />
              ))}
            </div>
          )}
          
          <button type="button" onClick={addPlot} className='border-2 border-blue-400 bg-blue-400 rounded-lg px-10 py-1'>ADD</button>
        </form>
      </div>
    </div>
  );
};

export default AddPlot;
