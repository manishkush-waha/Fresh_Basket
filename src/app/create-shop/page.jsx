"use client"
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const CreateShopPage = () => {
  const [shopDetails, setShopDetails] = useState({
    logo: null,
    banner: null,
    shopName: '',
    description: '',
    address: '',
    contactNumber: '',
    address_line: '',
    city: '',
    state: '',
    country: '',
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Shop Details:', shopDetails);
    // Add logic to submit shop details to the backend
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6">Create Your Shop</h1>

      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-2xl rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Shop Details</h2>
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
                    onChange={(e) => handleFileChange(e, 'logo')}
                    accept="image/*"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg px-8 pt-16 pb-4 mb-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input
              type="text"
              name="shopName"
              placeholder="Shop Name"
              value={shopDetails.shopName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={shopDetails.contactNumber}
              onChange={handleInputChange}
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
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="text"
              name="city"
              placeholder="City"
              value={shopDetails.city}
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
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="text"
              name="country"
              placeholder="Country"
              value={shopDetails.country}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              type="text"
              name="pin_code"
              placeholder="Pin Code"
              value={shopDetails.pin_code}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Create Shop
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateShopPage;