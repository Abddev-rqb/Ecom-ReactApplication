import React from 'react';
const BackDrop = ({ data })=>{
    return(
        <div className={`z-20 transition-all duration-200 opacity-50 w-screen h-screen bg-black fixed ${data ? "top-6" : "top-0"} left-0 backdrop-blur-md`}></div>
    )
};
export default BackDrop; 