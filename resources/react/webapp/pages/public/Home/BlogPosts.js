import React from 'react';
import { v4 as uuidv4, v4 as uuid } from "uuid";
import PostMiniCard from "../Blog/components/PostMiniCard";

const BlogPosts = ({blogPosts, isLoaded}) => {

    if (!blogPosts.length) return null;

    return (
        <div className="container mt-4 pt-2">
            <div className="row">
                <div className="col-md-12">
                    {
                        !isLoaded ? null :
                            <div className="row">

                                <div className="col-12">
                                    <h2 className="blog-h2-title-box text-center pb-5">
                                        BLOG
                                    </h2>
                                </div>

                                {
                                    blogPosts.map(post => <div className="col-md-4 mb-3"><PostMiniCard post={post}
                                        key={uuid()} /></div>)
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default BlogPosts;