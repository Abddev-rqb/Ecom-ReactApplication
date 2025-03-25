import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import InputField from '../shared/InputField';
import Spinners from '../shared/Spinners';
import { Link } from 'react-router-dom';
import { FaAddressCard } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const AddAddressForm = () => {
  const { btnLoader } = useSelector((state)=> state.errors);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
    }= useForm({
        mode:"onTouched",
    });
  const onSaveAdderssHandler = async (data) =>{
    console.log("user saved");
    // dispatch(authenticateSignInUser(data, toast, reset, navigate, setLoader));
  };
  return (
    <div className="">
      <form className="" onSubmit={handleSubmit(onSaveAdderssHandler)}>
          <div className="flex justify-center items-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
              <FaAddressCard className="text-slate-800 text-5xl"/>
              Add Address
          </div>
          <hr className="mt-2 mb-5 text-slate-300"/>
          <div className="flex flex-col gap-3">
              <InputField 
                  label="Building Name"
                  required
                  id="building"
                  type="text"
                  message="*Building name is required"
                  placeholder="Enter Building Name"
                  register={register}
                  errors={errors}
              />
              <InputField 
                  label="Street"
                  required
                  id="street"
                  type="text"
                  message="*Street is required"
                  placeholder="Enter Street"
                  register={register}
                  errors={errors}
              />
              <InputField 
                  label="City"
                  required
                  id="city"
                  type="text"
                  message="*City is required"
                  placeholder="Enter City"
                  register={register}
                  errors={errors}
              />
              <InputField 
                  label="State"
                  required
                  id="state"
                  type="text"
                  message="*State is required"
                  placeholder="Enter State"
                  register={register}
                  errors={errors}
              />
              <InputField 
                  label="Pincode"
                  required
                  id="pincode"
                  type="text"
                  message="*Pincode is required"
                  placeholder="Enter Pincode"
                  register={register}
                  errors={errors}
              />
              <InputField 
                  label="Coutry"
                  required
                  id="country"
                  type="text"
                  message="*Country is required"
                  placeholder="Enter Country"
                  register={register}
                  errors={errors}
              />
          </div>
          <button className="text-white bg-blue-600 px-4 py-2 rounded-md mt-4" disabled={btnLoader} type="submit">
              {btnLoader ? (
                  <><Spinners />Loading...</>
              ):(
                  <>Save</>
              )}
          </button>
      </form>
  </div>
  )
}

export default AddAddressForm