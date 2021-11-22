import React, {Fragment} from 'react';
import {CONFIG} from "../../../Config";
import moment from "moment";
import noImage from "../../../assets/images/producto-default.png";

const Article = ({post}) => {

    return (
        <div className="post-single">
            <div className="row pb-5 post-single-header">
                <div className="col-md-2 d-none d-md-flex post-author-box">
                    <div className="mt-auto">
                        <div className="blog-author mb-3">
                            <img width="110px"
                                 src={post.author.avatar_public ? post.author.avatar_public : noImage}
                                 alt={CONFIG.APP_NAME}/></div>
                        <div className="font-inter font-18 bold text-black">{post.author.full_name}</div>
                        <div
                            className="font-inter font-16 regular text-black text-uppercase">{(moment(post.published_at).lang('es').format('DD MMM YYYY')).replace('.', '')}</div>
                    </div>
                </div>
                <div className="col">
                    <div className="font-poppins font-20 medium text-black">
                        {post.post_type.name}
                    </div>
                    <h1 className="font-poppins font-46 bold color-033F5D">
                        {post.title}
                    </h1>
                </div>

                <div className="col-12 d-block d-md-none">
                    <hr/>
                    <div className="row">
                        <div className="col-auto pr-0">
                            <img width="40px"
                                 src={post.author.avatar_public ? post.author.avatar_public : noImage}
                                 alt={CONFIG.APP_NAME}/>
                        </div>
                        <div className="col">
                            <div className="font-inter font-16 bold text-black"
                                 style={{marginBottom: '-3px'}}>{post.author.full_name}</div>
                            <div className="font-inter font-14 regular text-black text-uppercase">
                                {(moment(post.published_at).lang('es').format('DD MMM YYYY')).replace('.', '')}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="row pb-5">
                <div className="col-12">
                    <img src={post.public_principal_image}
                         alt={CONFIG.APP_NAME}
                         className="w-100 blog-main-img"/>
                </div>
            </div>

            <div className="row  mb-5">
                <div className="col-md-9 offset-md-3">
                    <div className="font-poppins font-18 medium color-6C6B6B" dangerouslySetInnerHTML={{__html: post.content}}/>
                    {/* <h3 className="font-poppins font-22 bold color-033F5D mb-3">
                        Wireframes can be pencil drawings or sketches on a whiteboard
                    </h3>
                    <p className="font-poppins font-18 regular color-6C6B6B lh-30">
                        Wireframes can be pencil drawings or sketches on a whiteboard, or they can be produced
                        by
                        means of a broad array of free or commercial software applications. Wireframes are
                        generally
                        created by business analysts, user experience designers, developers, visual designers,
                        and
                        by those with expertise in interaction design, information architecture and user
                        research.
                    </p>
                    <p className="font-poppins font-18 regular color-6C6B6B lh-30">
                        Pencil drawings or sketches on a whiteboard, or they can be produced by means of a broad array of free or commercial software applications. Wireframes are generally created by business analysts, user experience designers.
                    </p>

                    <h2 className="font-poppins font-26 bold color-033F5D mb-3">
                        Wireframes can be pencil drawings or sketches on a whiteboard
                    </h2>
                    <p className="font-poppins font-18 regular color-6C6B6B lh-30">
                        Wireframes can be pencil drawings or sketches on a whiteboard, or they can be produced
                        by
                        means of a broad array of free or commercial software applications. Wireframes are
                        generally
                        created by business analysts, user experience designers, developers, visual designers,
                        and
                        by those with expertise in interaction design, information architecture and user
                        research.
                    </p>
                    <div className="row pb-5">
                        <div className="col-md-12"><img src="/themes/web/blog/blog-item-2.png" alt={CONFIG.APP_NAME} className="w-100"/></div>
                    </div>

                    <h3 className="font-poppins font-22 bold color-033F5D mb-3">
                        Wireframes can be pencil drawings or sketches on a whiteboard
                    </h3>
                    <p className="font-poppins font-18 regular color-6C6B6B lh-30">
                        The navigation system provides a set of screen elements that allow the user to move page to page through the website. The navigation design should communicate the relationship between the links it contains so that users understand the options they have for navigating the site.
                    </p>
                    <div className="row pb-5">
                        <div className="col-md-6"><img src="/themes/web/blog/blog-item-3.png" alt={CONFIG.APP_NAME} className="w-100"/></div>
                        <div className="col-md-6"><img src="/themes/web/blog/blog-item-4.png" alt={CONFIG.APP_NAME} className="w-100"/></div>
                    </div>
                    <p className="font-poppins font-18 regular color-6C6B6B lh-30">
                        The navigation system provides a set of screen elements that allow the user to move page to page through the website. The navigation design should communicate the relationship between the links it contains so that users understand the options they have for navigating the site.
                    </p> */}
                </div>
            </div>

        </div>
    );
};

export default Article
