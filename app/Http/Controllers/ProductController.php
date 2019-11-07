<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index(){
        /* Retrn all the products from database */
        return Product::all();
    }

    public function store(Request $request){
        /* Validate request data */
        $request->validate([
            'title' => 'required|max:150',
            'price' => 'required|numeric',
        ]);
        $data = $request->all();
        /* Created unique slug ID */
        $data['slug'] = uniqid(true);
        /* Storing data to product table */
        $product = Product::create($data);
        /* Returning the success message and saved product */
        return [
            'status'    => 'success',
            'message'   => 'Great! You\'ve Saved Product Details Successfully.',
            'product'      => $product,
        ];
    }

    public function update(Request $request, Product $product){
        /**Validating request data at server side */
        $request->validate([
            'title' => 'required|max:150',
            'price' => 'required|numeric',
            'slug' => 'required|unique:products,slug,'.$product->id,
        ]);
        $data = $request->all();
        /* Updating data $product model object injected to update function */
        $product->update($data);
        /* Returning success status with updated product object */
        return [
            'status'    => 'success',
            'message'   => 'Great! You\'ve Updated Product Details Successfully.',
            'product'      => $product,
        ];
    }

    public function delete(Product $product){
        /* Product deleted from database */
        $product->delete();
        /* Returning deleted product with status message */
        return [
            'status'    => 'success',
            'message'   => 'Great! You\'ve Deleted Product Details Successfully.',
            'product'      => $product,
        ];
    }

}
