const ProductReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LIST' :
            return action.payload;
        case 'ADD' :
            return state.concat(action.payload);
        case 'UPDATE' :
            return state.map((product)=>product.id==action.payload.id?{...product,...action.payload}:product);
        case 'DELETE' : 
            return state.filter((product)=>product.id != action.payload);
        default :
            return state;
    }
}

export default ProductReducer;