import React, {Fragment, useEffect, useState} from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import {dummy_products} from "../../helpers/productsData";
import LazyLoading from "../LazyLoading";
import ProductCard from "../shopping/ProductCard";
import H2Title from "../general/H2Title";
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";


const BlogCarousel = ({title, showButton = true, buttonTitle = ' VER MÁS', showOutstanding = false}) => {

    const [blogs, setBlogs] = useState([
        {
            id: 1,
            title: 'Cesfam administró segunda dosis de',
            date: '17 MAR 2021',
            image: '/themes/web/blog/blog-1.png',
            link: PUBLIC_ROUTES.BLOG_EXAMPLE.path
        },
        {
            id: 2,
            title: 'Por qué no existe una píldora anticonceptiva',
            date: '15 MAR 2021',
            image: '/themes/web/blog/blog-2.png',
            link: PUBLIC_ROUTES.BLOG_EXAMPLE.path
        },
        {
            id: 3,
            title: 'Por la pandemia se han Interrumpió acceso a',
            date: '03 MAR 2021',
            image: '/themes/web/blog/blog-3.png',
            link: PUBLIC_ROUTES.BLOG_EXAMPLE.path
        },
        {
            id: 4,
            title: '¿Qué son los anticonceptivos orales?',
            date: '22 FEB 2021',
            image: '/themes/web/blog/blog-4.png',
            link: PUBLIC_ROUTES.BLOG_EXAMPLE.path
        }
    ]);


    return (
        <div style={{background: '#FAFAFA'}}>
            <div className="container pb-4">
                <div className={`row pb-5 mb-5 ${  showOutstanding  ? '' : 'pt-5'}`}>

                    {
                        showOutstanding ?
                            <Fragment>
                                <div className="col-12 py-4">
                                    <H2Title text="CONTENIDO DESTACADO"/>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        {
                                            blogs.map((blog, index) => {
                                                if (blog.id == 2 || blog.id == 3) {
                                                    return <div className="col-md-6" key={index*200}>
                                                        <Link to={blog.link}>
                                                            <div className="blog-card" style={{
                                                                backgroundImage: `url('/themes/web/blog/blog-grande-${blog.id}.png')`,
                                                                height: '355px'
                                                            }}>
                                                                <div className="blog-card-veil"/>
                                                                <div className="blog-card-context">
                                                                    <div
                                                                        className="font-poppins font-14 regular text-white mb-1">
                                                                        {blog.date}
                                                                    </div>
                                                                    <div
                                                                        className="font-poppins font-24 lh-24 bold text-white  mb-2">
                                                                        {blog.title}
                                                                    </div>
                                                                    <div>
                                                                        <Link to={blog.link}>
                                                                            <span className="font-poppins font-12 bold text-white
                                                                            text-uppercase">
                                                                                    Leer más
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </Fragment>
                            :
                            null
                    }

                    <div className={`col-12  ${  showOutstanding  ? 'py-5' : 'py-4'}`}>
                        <H2Title text={title}/>
                    </div>

                    <div className="col-12">
                        <div className="row">
                            {
                                blogs.map((blog, index) => {
                                    return <div className="col-md-3">
                                        <Link to={blog.link}>
                                            <div className="blog-card"
                                                 style={{backgroundImage: `url('${blog.image}')`}}>
                                                <div className="blog-card-veil"/>
                                                <div className="blog-card-context">
                                                    <div className="font-poppins font-14 regular text-white mb-1">
                                                        {blog.date}
                                                    </div>
                                                    <div className="font-poppins font-24 lh-24 bold text-white  mb-2">
                                                        {blog.title}
                                                    </div>
                                                    <div>
                                                        <Link to={blog.link}>
                                                            <span className="font-poppins font-12 bold text-white
                                                            text-uppercase">
                                                                    Leer más
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                })
                            }
                        </div>
                    </div>


                    {
                        showButton ?
                            <div className="col-12 pt-4 d-flex">
                                <Link to={PUBLIC_ROUTES.BLOG_LIST.path} className="btn btn-bicolor m-auto d-flex">
                                    <span className="my-auto font-poppins font-14 bold text-white px-5">
                                        {buttonTitle}
                                    </span>
                                </Link>
                            </div>
                            : null
                    }

                </div>
            </div>
        </div>
    );
};

export default BlogCarousel
