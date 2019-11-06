<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(){
        return Product::all();
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|max:150',
            'price' => 'required|numeric',
        ]);
        $data = $request->all();
        $data['slug'] = uniqid(true);
        $product = Product::create($data);
        return [
            'status'    => 'success',
            'message'   => 'Great! You\'ve Saved Product Details Successfully.',
            'product'      => $product,
        ];
    }

    public function update(Request $request, Product $product){
        $request->validate([
            'title' => 'required|max:150',
            'price' => 'required|numeric',
            'slug' => 'required|unique:products,slug,'.$product->id,
        ]);
        $data = $request->all();
        $product->update($data);
        return [
            'status'    => 'success',
            'message'   => 'Great! You\'ve Updated Product Details Successfully.',
            'product'      => $product,
        ];
    }

}
