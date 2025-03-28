import api from "../../api/api";

export const fetchProducts = (queryString) => async (dispatch)=>{
    try{
        dispatch({type: "IS_FETCHING"});
        const { data } = await api.get(`/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElements:data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage,
        })
        dispatch({type: "IS_SUCCESS"});
    }catch(error){
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch",
        });
    }
};
export const fetchCategories = () => async (dispatch)=>{
    try{
        dispatch({type: "CATEGORY_LOADER"});
        const { data } = await api.get(`/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElements:data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage,
        })
        dispatch({type: "IS_ERROR"});
    }catch(error){
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch",
        });
    }
};
export const addToCart = (data, qty=1, toast) =>
    (dispatch, getState)=>{
        const {products} = getState().products;
        const getProduct = products.find((item)=> item.productId === data.productId);
        const isQuantityExist = getProduct.quantity >= qty;
        if (isQuantityExist){
            dispatch({ type: "ADD_CART", payload: {...data, quantity: qty}});
            toast.success(`${data?.productName} added to cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        }else{
            toast.delete("Out of stock");
        } 
};
export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState)=>{
        const { products } = getState().products;
        const getProducts = products.find((item) => item.productId === data.productId);
        const isQuantityExist = getProducts.quantity >= currentQuantity+1;
        if (isQuantityExist){
            const newQuantity = currentQuantity+1;
            setCurrentQuantity(newQuantity);
            dispatch({ type:"ADD_CART", payload:{...data, quantity: newQuantity+1},});
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        }else{
            toast.error("Quantity reached to limit");
        }
};
export const decreaseCartQuantity = (data, newQuantity)=>(dispatch, getState)=>{
    dispatch({ type:"ADD_CART", payload:{...data, quantity: newQuantity},});
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};
export const removeFromCart = (data, toast)=>(dispatch, getState)=>{
    dispatch({ type:"REMOVE_CART",  payload: data });
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
};
export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader)=>async (dispatch) =>{
    try {
        setLoader(true);
        const {data} = await api.post("/auth/signin", sendData);
        dispatch({type: "LOGIN_USER", payload: data});
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success("Login Success");
        navigate("/");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
    } finally{
        setLoader(false);
    }

};
export const registerNewUser = (sendData, toast, reset, navigate, setLoader)=>async (dispatch) =>{
    try {
        setLoader(true);
        const {data} = await api.post("/auth/signup", sendData);
        reset();
        toast.success(data?.message || "Registration Success");
        navigate("/login");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || error?.response?.data?.password || "Internal Server Error");
    } finally{
        setLoader(false);
    }

};
export const logOutUser = (navigate) => (dispatch)=>{
    dispatch({type:"LOG_OUT"});
    localStorage.remove("auth");
    navigate("/login");
};
export const addUpdateUserAddress = (sendData, toast, addressId, setOpenAddressModal) => async (dispatch, getState)=>{
    dispatch({type:"BUTTON_LOADER"});
    try {
        const {data} = await api.post("/addresses", sendData);
        toast.success("Address saved successfully");
        dispatch({type:"IS_SUCCESS"});
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({type:"IS_ERROR", payload: null,});
    } finally{
        setOpenAddressModal(false);
    }
};
export const getUserAddresses = () => async (dispatch, getState)=>{
    try{
        dispatch({type: "IS_FETCHING"});
        const { data } = await api.get("/user/addresses");
        dispatch({type: "USER_ADDRESS", payload: data});
        dispatch({type: "IS_SUCCESS"});
    }catch(error){
        console.log(error);
        dispatch({
            type: "IS_ERROR",
            payload: error?.response?.data?.message || "Failed to fetch user Address",
        });
    }
};