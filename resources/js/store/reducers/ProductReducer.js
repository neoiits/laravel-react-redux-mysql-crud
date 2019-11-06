const ProductReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LIST' :
            return action.payload;
        case 'ADD' :
            return state.concat(action.payload);
        default :
            return state;
    }
}

export default ProductReducer;