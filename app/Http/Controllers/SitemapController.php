<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Console\Command;
use App\Models\Product;
use App\Models\Category;
use App\Models\PostType;
use App\Models\Laboratory;

class SitemapController extends Controller
{
    public function index()
    {
        $products = Product::where('active', 1)->where('is_indexable', 1)->get();
        $post_types = PostType::with('active_posts')->where('active', 1)->get();
        $categories = Category::with('subcategories')->where('active', 1)->get();
        $laboratories = Laboratory::with('products')->get();

        return response()->view('intranet.sitemap.index', [
            'products' => $products,
            'post_types' => $post_types,
            'categories' => $categories,
            'laboratories' => $laboratories
        ])->header('Content-Type', 'text/xml');
    }

}
