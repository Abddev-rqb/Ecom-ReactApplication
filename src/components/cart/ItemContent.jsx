import { useState } from "react";
import { HiOutlineTrash } from 'react-icons/hi';
import SetQuantity from "./SetQuantity";
import { useDispatch } from "react-redux";
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from "../../store/actions";
import toast from "react-hot-toast";
import { formatPrice } from "../utils/formatPrice";
import truncateText from "../utils/truncateText";

const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    cartId,
}) =>{
    const [currentQuantity, setCurrentQuantity] = useState(quantity);
    const dispatch = useDispatch();
    const handleQntyIncrease = (cartItems)=>{dispatch(increaseCartQuantity(cartItems, toast, currentQuantity, setCurrentQuantity));};
    const handleQntyDecrease = (cartItems)=>{ if(currentQuantity > 1){ const newQuantity = currentQuantity -1; setCurrentQuantity(newQuantity); dispatch(decreaseCartQuantity(cartItems, newQuantity));}};
    const removeProduct = (cartItems) =>{dispatch(removeFromCart(cartItems, toast))};
    return (
        <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-slate-100 rounded-md lg:px-4 py-4 p-2">
            <div className="md:col-span-2 justify-self-start flex flex-col gap-2">
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start">
                    <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">{truncateText(productName)}</h3>
                </div>
                <div className="md:w-36 sm:w-24 w-12">
                    <img className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md" src={image} alt={productName} />
                </div>
                <div className="flex items-start gap-5 mt-3">
                    <button className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200" onClick={()=>removeProduct({
                        image,
                        productName,
                        description,
                        specialPrice,
                        price,
                        productId,
                        quantity,
                    })}> 
                        <HiOutlineTrash size={16} className="text-rose-600"/>
                        Remove
                    </button>
                </div>
            </div>
            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {formatPrice(Number(specialPrice).toFixed(2))}
            </div>
            <div className="justify-self-center">
                <SetQuantity 
                    quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={()=>handleQntyIncrease({
                        image,
                        productName,
                        description,
                        specialPrice,
                        price,
                        productId,
                        quantity,
                    })}
                    handleQtyDecrease={()=>handleQntyDecrease({
                        image,
                        productName,
                        description,
                        specialPrice,
                        price,
                        productId,
                        quantity,
                    })}/>
            </div>
            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {formatPrice(Number(currentQuantity) * Number(specialPrice).toFixed(2))}
            </div>
        </div>
    );
}
export default ItemContent;