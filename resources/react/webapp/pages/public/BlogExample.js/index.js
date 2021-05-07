import React, {Fragment} from 'react';
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import ProductsCarousel from "../../../components/sections/ProductsCarousel";
import BlogCarousel from "../../../components/sections/BlogCarousel";
import Article from "./Article";

const BlogExample = () =>{

    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.BLOG.path,
            name: PUBLIC_ROUTES.BLOG.title,
        },
        {
            url: PUBLIC_ROUTES.BLOG_EXAMPLE.path,
            name: PUBLIC_ROUTES.BLOG_EXAMPLE.title,
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
                            <div className="panel-body">
                                <Article />
                            </div>
                        </div>
                    </div>
                </div>
            </BasePanelTwo>
            <BlogCarousel title="Contenidos relacionados" showButton={false} />
            <ProductsCarousel title="Te podría interesar"/>
            <Subscribe/>
        </Fragment>
    );
};

export default BlogExample
