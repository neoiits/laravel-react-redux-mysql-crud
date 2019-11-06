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

export const UpdateProduct = (product) => {
    return {
        type : 'UPDATE',
        payload : product
    }
}

export const DeleteProduct = (id) => {
    return {
        type : 'DELETE',
        payload : id
    }
}