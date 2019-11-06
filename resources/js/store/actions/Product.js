export const AllProduct = (products) => {
    return {
        type : 'LIST',
        payload : products
    }
}

export const NewProduct = (product) => {
    return {
        type : 'ADD',
        payload : product
    }
}