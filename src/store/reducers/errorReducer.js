const initialState = {
    isLoading: false,
    errorMessage: null,
    categoryLoader: false,
    categoryError: null,
    btnLoader:false,
}

export const errorReducer = (state= initialState, action) => {
    switch (action.type) {
        case "IS_FETCHING":
            return {
                ...state,
                isLoading:true,
                errorMessage:null,
            }
        case "FETCHING_SUCCESS":
            return {
                ...state,
                isLoading:false,
                errorMessage:null,
            }
        case "BUTTON_LOADER":
            return {
                ...state,
                btnLoader:true,
                errorMessage:null,
                categoryError:null,
            }
        case "IS_SUCCESS":
            return {
                ...state,
                isLoading: false,
                errorMessage: null,
                categoryLoader: false,
                categoryError: null,
                btnLoader:false,
            }
        case "IS_ERROR":
            return {
                ...state,
                isLoading:false,
                categoryLoader: false,
                btnLoader:false,
                errorMessage:action.payload,
            }    
        case "CATEGORY_SUCCESS":
            return {
                ...state,
                categoryLoader:false,
                categoryError:null,
            }
        case "CATEGORY_LOADER":
            return {
                ...state,
                categoryLoader:true,
                categoryError:null,
                errorMessage:null,
            }   
        default:
            return state;
    }   
}