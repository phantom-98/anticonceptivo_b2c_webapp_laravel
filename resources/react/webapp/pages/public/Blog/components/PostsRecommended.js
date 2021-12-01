import React, {useEffect, useState} from 'react';
import * as Services from "../../../../Services";
import {Link} from "react-router-dom";
import moment from "moment";
import LazyLoading from "../../../../components/LazyLoading";
import {v4 as uuidv4, v4 as uuid} from "uuid";
import PostMiniCard from "./PostMiniCard";

const PostsRecommended = () => {

    const [loaded, setLoaded] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {

        setLoaded(false);

        let url = Services.ENDPOINT.PUBLIC_AREA.BLOG.POSTS_RECOMMENDED;
        let data = {}
        Services.DoGet(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setPosts(response.data.posts);
                },
            });
            setLoaded(true);
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    if (!posts.length) return null;

    return (
        <div className="row">
            <div className="col-md-12">
                {
                    !loaded ? null :
                        <div className="row">

                            <div className="col-12">
                                <h2 className="blog-h2-title-box text-center pb-5">
                                    Recomendados
                                </h2>
                            </div>

                            {
                                posts.map(post => <div className="col-md-4 mb-3"><PostMiniCard post={post}
                                                                                               key={uuid()}/></div>)
                            }

                        </div>
                }
            </div>
        </div>
    );
};

export default PostsRecommended
