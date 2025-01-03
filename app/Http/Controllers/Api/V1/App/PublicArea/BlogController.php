<?php

namespace App\Http\Controllers\Api\V1\App\PublicArea;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Psy\Util\Json;
use Willywes\ApiResponse\ApiResponse;
use App\Http\Utils\OutputMessage\OutputMessage;
use App\Models\Post;
use App\Models\PostType;

class BlogController extends Controller
{
    public function getPosts(Request $request)
    {
        try {

            $postType = PostType::where('slug', $request->post_type_slug)->where('active', true)->first();

            if (!$postType) {
                return ApiResponse::JsonError(null, 'Categoría de blog no encontrada.');
            }


            $posts = Post::where('active', true)->where('post_type_id', $postType->id)->orderBy('created_at','desc')->get();

            return ApiResponse::JsonSuccess([
                'posts' => $posts,
                'blog_name' => $postType->name,
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getPost(Request $request)
    {
        try {

            $postType = PostType::where('slug', $request->post_type_slug)->where('active', true)->first();

            if (!$postType) {
                return ApiResponse::JsonError(null, 'Categoría de blog no encontrada.');
            }

            $post = Post::where('active', true)->where('post_type_id', $postType->id)->where('slug', $request->post_slug)
                ->with(['author', 'post_type'])->first();

            if (!$post) {
                return ApiResponse::JsonError(null, 'Post no encontrado.');
            }

            return ApiResponse::JsonSuccess([
                'post' => $post
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }

    public function getCarouselPosts(Request $request)
    {
        try {

            $posts = [];
            $outstandings = [];

            if ($request->default == false) {
                $postType = PostType::where('slug', $request->type)->where('active', true)->first();

                if ($request->show_outstanding == true) {
                    $outstandings = Post::where('active', true)->where('post_type_id', $postType->id)
                        ->with(['author', 'post_type'])->orderBy('visits', 'desc')->get()->take(2);

                    $posts = Post::where('active', true)->where('post_type_id', $postType->id)
                        ->with(['author', 'post_type'])->whereNotIn('id', $outstandings->pluck('id'))
                        ->inRandomOrder()->get()->take(4);
                } else {
                    $posts = Post::where('active', true)->where('post_type_id', $postType->id)
                        ->with(['author', 'post_type'])->inRandomOrder()->get()->take(4);
                }
            } else {
                if ($request->show_outstanding == true) {
                    $outstandings = Post::where('active', true)->with(['author', 'post_type'])->orderBy('visits', 'desc')->get()->take(2);
                    $posts = Post::where('active', true)->with(['author', 'post_type'])->whereNotIn('id', $outstandings->pluck('id'))
                        ->inRandomOrder()->get()->take(4);
                } else {
                    $posts = Post::where('active', true)->with(['author', 'post_type'])->inRandomOrder()->get()->take(4);
                }
            }

            return ApiResponse::JsonSuccess([
                'posts' => $posts,
                'outstandings' => $outstandings
            ]);

        } catch (\Exception $exception) {
            return ApiResponse::JsonError(null, $exception->getMessage());
        }
    }


    ////////////////////
    /// NEW
    ////////////////////

    public function getPostCategories(): JsonResponse
    {
        $post_categories = PostType::where('active', true)->get();

        return ApiResponse::JsonSuccess([
            'post_categories' => $post_categories
        ]);
    }

    public function getPostsRecommended(): JsonResponse
    {
        $posts = Post::with(['post_type'])->where('active', true)->inRandomOrder()->limit(3)->get();

        $posts = $posts->map(function ($post) {
            $post->content = substr_replace(strip_tags($post->content), '...', 150);
            return $post;
        });

        return ApiResponse::JsonSuccess([
            'posts' => $posts
        ]);
    }

    public function getPostsByCategory(Request $request): JsonResponse
    {
        $post_category = PostType::where('slug', $request->post_type_slug)->first();

        $posts = Post::with(['post_type'])
            ->where('post_type_id', $post_category->id)
            ->where('active', true)
            ->orderBy('created_at','desc')
            ->get();

        $posts = $posts->map(function ($post) {
            $post->content = substr_replace(strip_tags($post->content), '...', 150);
            return $post;
        });

        return ApiResponse::JsonSuccess([
            'post_category' => $post_category,
            'posts' => $posts
        ]);
    }

}
