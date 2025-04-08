"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { setShopDetails as shop } from '@/store/shopSlice';
import LoadSpinner from '@/components/LoadSpinner';

const CreateShopPage = () => {
  // Redux store to get user data
  const user = useSelector((state) => (state.user));
  const [next, setNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [shopDetails, setShopDetails] = useState({
    userId: user?._id,
    name: user?.name,
    email: user?.email,
    password: '',
    againPassword: '',
    banner: null,
    logo: null,
    shopName: '',
    description: '',
    contactNumber: '',
    address_line: '',
    city: '',
    state: '',
    country: '',
    pin_code: ''
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const [previews, setPreviews] = useState({
    logo: null,
    banner: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShopDetails({ ...shopDetails, [name]: value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setShopDetails({ ...shopDetails, [type]: file });
      setPreviews({
        ...previews,
        [type]: URL.createObjectURL(file)
      });
    }
  };

  function handleNext(e) {
    if (!shopDetails.name || !shopDetails.email || !shopDetails.password || !shopDetails.againPassword) {
      toast.error("Please fill all the fields")
      return;
    }
    if (shopDetails.password !== shopDetails.againPassword) {
      toast.error("Both password does not match")
      return;
    }
    setNext(!next);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const bannerBlob = new Blob([shopDetails.banner], { type: shopDetails.banner.type });
    const shopBlob = new Blob([shopDetails.logo], { type: shopDetails.logo.type });

    // Create a FormData object to send the files and other data
    const formData = new FormData();
    formData.append('userId', shopDetails.userId);
    formData.append('name', shopDetails.name);
    formData.append('email', shopDetails.email);
    formData.append('password', shopDetails.password);
    formData.append('banner', bannerBlob);
    formData.append('logo', shopBlob);
    formData.append('shopName', shopDetails.shopName);
    formData.append('description', shopDetails.description);
    formData.append('contactNumber', shopDetails.contactNumber);
    formData.append('address_line', shopDetails.address_line);
    formData.append('city', shopDetails.city);
    formData.append('state', shopDetails.state);
    formData.append('country', shopDetails.country);
    formData.append('pincode', shopDetails.pin_code);

    // Send the form data to the server
    console.log(shopDetails);
    setLoading(true);
    await axios.post('/api/create-shop', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(async (response) => {
      console.log(response.data);
      if (response.data.status === 201) {
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', response.data.shop.accessToken);
        dispatch(shop(response.data.shop));
        toast.success(response.data.message);
        router.push('/shop-dashboard/');
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    }).catch((error) => {
      toast.error("Error creating shop: " + error.response.data.message);
    });
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Create Your Shop</h1>
      {
        next
          ? <div>
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow-2xl rounded-lg">
              <h2 className="w-full flex justify-center text-xl font-semibold mb-4">Shop Owner Details</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-4'>
                <label htmlFor="name">
                  Name:
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={shopDetails.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label htmlFor="email">
                  Email:
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={shopDetails.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mb-4'>
                <label htmlFor="password">
                  Password:
                  <Input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={shopDetails.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
                <label htmlFor="password">
                  Again password:
                  <Input
                    type="password"
                    name="againPassword"
                    placeholder="Your password"
                    value={shopDetails.againPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </label>
              </div>
              <p className='-mt-4 mb-5 text-sm text-gray-600'>Password must be minimum 8 character with atleast one uppercase, one number and one special character.</p>
              <div className='w-full justify-evenly flex items-center'>
                <Button
                  type="submit"
                  onClick={handleNext}
                  className="w-fit mx-auto px-20 bg-blue-600 cursor-pointer text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >Next</Button>
              </div>
            </form>
          </div>
          : <div>
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow-2xl rounded-lg">
              <h2 className="w-full flex justify-center text-xl font-semibold mb-4">Shop Details</h2>
              {/* Banner Preview Section */}
              <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
                {previews.banner ? (
                  <Image
                    src={previews.banner}
                    alt="Shop Banner Preview"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gray-50 border-2 border-dashed border-gray-300">
                    <div className="text-center">
                      <label htmlFor="banner-upload" className="cursor-pointer">
                        <div className="mt-2 flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="mt-1 text-sm text-gray-600">Upload Shop Banner</p>
                        </div>
                      </label>
                      <input
                        id="banner-upload"
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, 'banner')}
                        accept="image/*"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Logo Preview Section */}
              <div className="relative">
                <div className="absolute -top-12 left-4 z-10">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white shadow-lg">
                    {previews.logo ? (
                      <Image
                        src={previews.logo}
                        alt="Shop Logo Preview"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <label htmlFor="logo-upload" className="cursor-pointer">
                          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </label>
                        <input
                          id="logo-upload"
                          type="file"
                          className="hidden"
                          required
                          onChange={(e) => handleFileChange(e, 'logo')}
                          accept="image/*"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg px-2 pt-16 pb-4 mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input
                    type="text"
                    name="shopName"
                    placeholder="Shop Name"
                    value={shopDetails.shopName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <Input
                    type="text"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={shopDetails.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-6">
                  <textarea
                    name="description"
                    placeholder="Shop Description"
                    value={shopDetails.description}
                    onChange={handleInputChange}
                    rows="4"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input
                    type="text"
                    name="address_line"
                    placeholder="Address Line"
                    value={shopDetails.address_line}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shopDetails.city}
                    required
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shopDetails.state}
                    required
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Input
                    type="text"
                    name="country"
                    placeholder="Country"
                    required
                    value={shopDetails.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Input
                    type="text"
                    name="pin_code"
                    placeholder="Pin Code"
                    required
                    value={shopDetails.pin_code}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="w-full flex gap-4 justify-evenly mt-8">
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="w-1/2 px-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >Back</Button>
                  <Button
                    type="submit"
                    className="w-1/2 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >{loading ? <LoadSpinner /> : "Create Shop"}</Button>
                </div>
              </div>
            </form>
          </div>
      }
    </div >
  );
};

export default CreateShopPage;