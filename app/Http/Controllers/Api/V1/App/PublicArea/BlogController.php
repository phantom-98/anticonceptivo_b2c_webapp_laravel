<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Timeline;
use App\Models\Post;
use App\Models\PostType;

class BlogController extends Controller
{
    public function index()
    {
        try {
            $timeLines = Timeline::where('active',true)->orderBy('position')->get();

            return ApiResponse::JsonSuccess([
                'time_lines' => $timeLines,
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getPosts(Request $request){
        try {
            
            $postType = PostType::where('slug', $request->post_type_slug)->where('active',true)->first();

            if (!$postType) {
                return ApiResponse::JsonError(null, 'Categoría de blog no encontrada.');
            }


            $posts = Post::where('active',true)->where('post_type_id',$postType->id)->get();

            return ApiResponse::JsonSuccess([
                'posts' => $posts,
                'blog_name' => $postType->name,
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getPost(Request $request){
        try {
            
            $postType = PostType::where('slug', $request->post_type_slug)->where('active',true)->first();

            if (!$postType) {
                return ApiResponse::JsonError(null, 'Categoría de blog no encontrada.');
            }

            $post = Post::where('active',true)->where('post_type_id',$postType->id)->where('slug',$request->post_slug)
                ->with(['author','post_type'])->first();

            if (!$post){
                return ApiResponse::JsonError(null, 'Post no encontrado.');
            }

            return ApiResponse::JsonSuccess([
                'post' => $post
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }
}
