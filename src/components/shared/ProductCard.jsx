import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import truncateText from "../utils/truncateText";
import ProductViewModal from "./ ProductViewModal";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/actions";
import toast from "react-hot-toast";

const ProductCard = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice,
    about=false,
})=>{
    const [openProductViewMode, setOpenProductViewMode] = useState(false);
    const btnLoader = false;
    const [selectViewProduct, setSelectViewProduct] = useState("");
    const isAvailable = quantity && Number(quantity) > 0;
    const dispatch = useDispatch();
    const handleProduct =(product) => {if (!about){ setSelectViewProduct(product); setOpenProductViewMode(true);}};    
    const addToCartHandler = (cartItems) =>{ dispatch(addToCart(cartItems, 1, toast));};
    return(
        <div className="rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
                <div onClick={()=> {
                        handleProduct({
                            id:productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        })
                    }}
                    className="w-full overflow-hidden aspect-[3/2]">
                    <img className="w-full h-full cursor-pointer transition-transform duration-300 transform hover:scale-105"src={image} alt={productName}></img>
                </div>
                <div className="p-4"> 
                    <h2 onClick={()=> {
                        handleProduct({
                            id:productId,
                            productName,
                            image,
                            description,
                            quantity,
                            price,
                            discount,
                            specialPrice,
                        })
                    }}>{truncateText(productName, 30)}</h2>
                    <div className="min-h-20 max-h-20">
                        <p className="text-gray-600 text-sm">{truncateText(description, 30)}</p>
                    </div>
                    {!about && (
                            <div className="flex items-center justify-between">
                            {specialPrice ? (
                                <div className="flex flex-col">
                                    <span className="text-gray-400 line-through">${Number(price).toFixed(2)}</span>
                                    <span className="text-xl font-bold text-slate-700">${Number(specialPrice).toFixed(2)}</span>
                                </div>
                            ):(
                                <span className="text-gray-400 line-through">{" "}${Number(price).toFixed(2)}</span>
                            )}
                            <button 
                                disabled= {!isAvailable || btnLoader} 
                                onClick={()=>addToCartHandler({
                                    image,
                                    productId,
                                    productName,
                                    description,
                                    specialPrice,
                                    price,
                                    quantity,
                                    discount,
                                })}
                                className={`bg-blue-500 ${isAvailable ? "opacity-100 hover:bg-blue-600" : "opacity-70"} text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}> 
                                <FaShoppingCart className="mr-2"/>
                                {isAvailable ? "Add to Cart" : "Out of Stock"}
                            </button>
                        </div>
                    )}
                </div>
                <ProductViewModal 
                    open = {openProductViewMode}
                    setOpen = {setOpenProductViewMode}
                    products = {selectViewProduct}
                    isAvailable = {isAvailable}/>
            </div>
    )
}
export default ProductCard;