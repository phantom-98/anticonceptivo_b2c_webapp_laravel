import React  from 'react';
import {CONFIG} from "../../../Config";
import moment from "moment";
import noImage from "../../../assets/images/producto-default.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Article = ({post}) => {

    return (
        <div className="post-single">
            <div className="row pb-5 post-single-header">
                <div className="col-md-2 d-none d-md-flex post-author-box">
                    <div className="mt-auto">
                        <div className="blog-author mb-3">
                             <LazyLoadImage
                                    alt={CONFIG.APP_NAME}
                                    title="Anticonceptivo"
                                    width={110}
                                    rel="nofollow"
                                    effect="blur"
                                    src={post.author.avatar_public ? post.author.avatar_public : noImage}
                                />
                        </div>
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
                            <LazyLoadImage
                                alt={CONFIG.APP_NAME}
                                title="Anticonceptivo"
                                width={40}
                                rel="nofollow"
                                effect="blur"
                                src={post.author.avatar_public ? post.author.avatar_public : noImage}
                            />
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
                     <LazyLoadImage
                        alt={CONFIG.APP_NAME}
                        className="w-100 blog-main-img"
                        title="Anticonceptivo"
                        rel="nofollow"
                        effect="blur"
                        src={post.public_principal_image}
                    />
                </div>
            </div>

            <div className="row mb-5">
                <div className="col-md-12">
                    <div className="font-poppins font-18 medium color-6C6B6B" dangerouslySetInnerHTML={{__html: post.content}}/>
                </div>
            </div>

        </div>
    );
};

export default Article
