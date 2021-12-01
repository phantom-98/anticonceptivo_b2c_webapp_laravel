import React, {Fragment, useEffect, useState} from 'react';
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {useParams} from "react-router-dom";
import * as Services from "../../../Services";
import PostsRecommended from "./components/PostsRecommended";
import FilterBlogList from "./components/FilterBlogList";
import PostMiniCard from "./components/PostMiniCard";
import {v4 as uuid} from "uuid";
import LazyLoading from "../../../components/LazyLoading";

const BlogListByCategory = () => {

    const {post_type_slug} = useParams();

    const [loaded, setLoaded] = useState(false);
    const [postCategory, setPostCategory] = useState({name: '', slug: ''});
    const [posts, setPosts] = useState([]);
    const [breadcrumbs, setBreadcrumbs] = useState([
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.BLOG.path,
            name: PUBLIC_ROUTES.BLOG.title,
        }
    ])

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {

        setLoaded(false);

        let url = Services.ENDPOINT.PUBLIC_AREA.BLOG.GET_POSTS_BY_CATEGORY;
        let data = {post_type_slug: post_type_slug}
        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setPosts(response.data.posts);
                    setPostCategory(response.data.post_category);
                },
            });
            setLoaded(true);
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    useEffect(() => {
        if (postCategory.slug) {
            setBreadcrumbs([
                ...breadcrumbs,
                {
                    url: (PUBLIC_ROUTES.BLOG_LIST_BY_CATEGORY.path).replace(':post_type_slug', postCategory.slug),
                    name: postCategory.name,
                }
            ])
        }
    }, [postCategory])


    if (!loaded) return <LazyLoading height={300}/>

    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >
                <div className="row">
                    <div className="col">
                        <h3 className="font-poppins font-46 font-md-36 bold color-009BE8"
                            style={{letterSpacing: '2px'}}>
                            {postCategory.name}
                        </h3>
                    </div>
                    <div className="col-auto d-flex">
                        {/*<FilterBlogList/>*/}
                    </div>
                </div>

                <div className="row mt-3 mt-md-5 mb-5">
                    {
                        posts.map(post => <div className="col-md-4 mb-3"><PostMiniCard post={post} key={uuid()}/></div>)
                    }

                    {
                        !posts.length ?
                            <div className="col">
                                <div className="card w-100 post-mini-card " style={{minHeight: 'unset'}}>
                                    <div className="card-body py-3 py-md-4"
                                         style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>
                                        <p className="card-text">
                                            No existen contenido para la categoría seleccionada, por favor vuelva en
                                            otro momento.
                                        </p>
                                    </div>
                                </div>
                            </div> : null
                    }
                </div>

                <PostsRecommended/>

            </BasePanelTwo>

            <Subscribe/>

        </Fragment>
    );
};

export default BlogListByCategory
