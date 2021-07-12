import React, {Fragment, useState} from 'react';
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import ProductsCarousel from "../../../components/sections/ProductsCarousel";
import BlogCarousel from "../../../components/sections/BlogCarousel";
import BlogItem from "./BlogItem";

const BlogList = () => {

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
            url: PUBLIC_ROUTES.BLOG_LIST.path,
            name: PUBLIC_ROUTES.BLOG_LIST.title,
        },
    ];

    const [blogs, setBlogs] = useState([
        1,2,3,4,5,6,7,8, 9,10
    ]);


    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >

                <div className="row">
                    <div className="col">
                        <h3 className="font-poppins font-46 bold color-009BE8" style={{letterSpacing: '2px'}}>BLOG</h3>
                    </div>
                    <div className="col-auto d-flex">
                        <div className="my-auto">
                            <div className="row justify-content-end">
                                <div className="col-auto px-2 font-poppins font-12 semi-bold color-033F5D d-flex">
                                    <div className="my-auto">
                                        Mostrar
                                    </div>
                                </div>
                                <div className="col-auto px-2">
                                    <select className="form-control form-control-custom w-auto select-product-list"
                                            name=""
                                            id="">
                                        <option value="9">9</option>
                                        <option value="12">12</option>
                                        <option value="21">21</option>
                                        <option value="42">42</option>
                                    </select>
                                </div>
                                <div className="col-auto px-2 font-poppins font-12 semi-bold color-033F5D d-flex">
                                    <div className="my-auto">
                                        Ordenar por
                                    </div>
                                </div>
                                <div className="col-auto pl-2">
                                    <select className="form-control form-control-custom w-auto select-product-list"
                                            name=""
                                            id="">
                                        <option value="9">Popular</option>
                                        <option value="12">Menor a Mayor</option>
                                        <option value="21">Mayor a Menor</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row  mb-5">
                    {
                        blogs.map((blog, index) => {
                            return <BlogItem key={index*300} blog={blog} image={`/themes/web/blog/list/${blog}.png`}/>
                        })
                    }

                </div>
            </BasePanelTwo>
            <BlogCarousel title="Contenidos relacionados" showButton={true}/>
            <ProductsCarousel title="Te podría interesar"/>
            <Subscribe/>
        </Fragment>
    );
};

export default BlogList
