import React, {useContext} from 'react';
import { v4 as uuidv4 } from 'uuid';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PostMiniCard from "../Blog/components/PostMiniCard";
import { AppContext } from "../../../context/AppProvider";
import { BREAKPOINTS } from "../../../helpers/vars";
import { Link } from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";

const BlogPosts = ({blogPosts, isLoaded}) => {

    const { breakpoint } = useContext(AppContext)

    if (!blogPosts.length) return null;

    const settings = {
        className: "slider variable-width",
        dots: true,
        infinite: true,
        speed: 3500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: false
    };

    const rowStyle = {
        display: 'flex!important',
        flexDirection: 'column',
        alignItems: 'center',
    }

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
                                    breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?

                                    blogPosts.map(post => <div key={uuidv4()} className="col-md-4 mb-3">
                                        <PostMiniCard post={post} />
                                    </div>)

                                    : 
                                        <div className="col-12 mb-4">
                                            <Slider {...settings}>
                                                {
                                                    blogPosts.map(post => <div key={uuidv4()} className="col-md-4 mb-3">
                                                        <PostMiniCard post={post} />
                                                    </div>)
                                                }
                                            </Slider>
                                        </div>
                                }
                            </div>
                    }
                </div>
            </div>
            <div className="row mt-2" style={rowStyle}>
                <div style={{width: '205px'}}>
                    <Link to={PUBLIC_ROUTES.BLOG.path}
                        className="btn btn-bicolor btn-block d-flex my-2">
                        <span className="m-auto font-poppins font-14 bold">VER MÁS NOTICIAS</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default BlogPosts;