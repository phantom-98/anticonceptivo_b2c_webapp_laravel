import React, {Fragment, useState, useEffect} from 'react';
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
// import ProductsCarousel from "../../../components/sections/ProductsCarousel";
import BlogCarousel from "../../../components/sections/BlogCarousel";
import Article from "./Article";
import * as Services from "../../../Services";
import LazyLoading from "../../../components/LazyLoading";

const Post = ({match}) => {

    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData(match.params.post_type_slug, match.params.post_slug);
    }, [match.params.post_slug])

    const getData = (post_type_slug, post_slug) => {
        let url = Services.ENDPOINT.PUBLIC_AREA.BLOG.POST;
        let data = {
            post_type_slug: post_type_slug,
            post_slug: post_slug
        }
        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setPost(response.data.post);
                    setLoading(false);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const postRoute = (route) => {

        let temp = route.replace(':post_type_slug?', match.params.post_type_slug);
        temp = temp.replace(':post_slug?', match.params.post_slug);

        return temp;
    }

    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.BLOG.path.replace(':post_type_slug?', match.params.post_type_slug),
            name: PUBLIC_ROUTES.BLOG.title,
        },
        {
            url: postRoute(PUBLIC_ROUTES.POST.path),
            name: PUBLIC_ROUTES.POST.title,
        },
    ];

    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >
                <div className="row mb-5">
                    <div className="col-md-12">
                        <div className="panel">
                            <div className="panel-body p-4 p-md-5">
                                {
                                    !loading ?
                                        <Article post={post}/>
                                        : <LazyLoading/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </BasePanelTwo>
            <BlogCarousel title="Contenidos relacionados" showButton={false} type={match.params.post_type_slug}/>
            <Subscribe/>
        </Fragment>
    );
};

export default Post
