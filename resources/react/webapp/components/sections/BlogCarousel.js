import React, { Fragment, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import H2Title from "../general/H2Title";
import { Link } from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";
import * as Services from "../../Services";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import LazyLoading from "../LazyLoading";

const BlogCarousel = ({
    title,
    showButton = true,
    buttonTitle = " VER MÁS",
    showOutstanding = false,
    type,
}) => {
    const [ready, setReady] = useState(false);

    const [posts, setPosts] = useState([]);
    const [outstandings, setOutstandings] = useState([]);

    useEffect(() => {
        getData();
    }, [type]);

    const getData = () => {
        setReady(false);
        let url = Services.ENDPOINT.PUBLIC_AREA.BLOG.CAROUSEL;
        let data = {
            show_outstanding: showOutstanding,
            type: type,
            default: !type ? true : false,
        };
        Services.DoPost(url, data)
            .then((response) => {
                Services.Response({
                    response: response,
                    success: () => {
                        setOutstandings(response.data.outstandings);
                        setPosts(response.data.posts);
                        setReady(true);
                    },
                });
            })
            .catch((error) => {
                Services.ErrorCatch(error);
            });
    };

    const postRoute = (typeSlug, postSlug) => {
        let temp = PUBLIC_ROUTES.POST.path.replace(
            ":post_type_slug?",
            typeSlug
        );
        temp = temp.replace(":post_slug?", postSlug);

        return temp;
    };

    return (
        <div style={{ background: "#FAFAFA" }}>
            {!ready ? (
                <LazyLoading />
            ) : (
                <div className="container pb-4">
                    <div
                        className={`row pb-5 mb-5 ${
                            showOutstanding ? "" : "pt-5"
                        }`}
                    >
                        {showOutstanding ? (
                            <Fragment>
                                <div className="col-12 py-4">
                                    <H2Title text="CONTENIDO DESTACADO" />
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        {outstandings.map(
                                            (outstanding, index) => {
                                                let outstandingKey = uuidv4();
                                                let outstandingLink = postRoute(
                                                    outstanding.post_type.slug,
                                                    outstanding.slug
                                                );
                                                return (
                                                    <div
                                                        className="col-md-6 mb-3"
                                                        key={outstandingKey}
                                                    >
                                                        <Link
                                                            to={outstandingLink}
                                                        >
                                                            <div
                                                                className="blog-card"
                                                                style={{
                                                                    backgroundImage: `url(${outstanding.public_principal_image})`,
                                                                    height: "355px",
                                                                }}
                                                            >
                                                                <div className="blog-card-veil" />
                                                                <div className="blog-card-context">
                                                                    <div className="font-poppins font-14 regular text-white mb-1">
                                                                        {moment(
                                                                            outstanding.published_at
                                                                        )
                                                                            .lang(
                                                                                "es"
                                                                            )
                                                                            .format(
                                                                                "DD MMM YYYY"
                                                                            )}
                                                                    </div>
                                                                    <div className="font-poppins font-24 lh-24 bold text-white  mb-2">
                                                                        {
                                                                            outstanding.title
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        <Link
                                                                            to={
                                                                                outstandingLink
                                                                            }
                                                                        >
                                                                            <h3
                                                                                className="font-poppins font-12 bold text-white
                                                                            text-uppercase"
                                                                            >
                                                                                Leer
                                                                                más
                                                                            </h3>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </Fragment>
                        ) : null}

                        {posts.length ? (
                            <div
                                className={`col-12  ${
                                    showOutstanding ? "py-5" : "py-4"
                                }`}
                            >
                                <H2Title text={title} />
                            </div>
                        ) : null}

                        <div className="col-12">
                            <div className="row">
                                {posts.map((post, index) => {
                                    let postKey = uuidv4();
                                    let postLink = postRoute(
                                        post.post_type.slug,
                                        post.slug
                                    );
                                    return (
                                        <div
                                            className="col-md-3 mb-3"
                                            key={postKey}
                                        >
                                            <Link to={postLink}>
                                                <div
                                                    className="blog-card"
                                                    style={{
                                                        backgroundImage: `url('${post.public_principal_image}')`,
                                                    }}
                                                >
                                                    <div className="blog-card-veil" />
                                                    <div className="blog-card-context">
                                                        <div className="font-poppins font-14 regular text-white mb-1">
                                                            {moment(
                                                                post.published_at
                                                            )
                                                                .lang("es")
                                                                .format(
                                                                    "DD MMM YYYY"
                                                                )}
                                                        </div>
                                                        <h1 className="font-poppins font-24 lh-24 bold text-white  mb-2">
                                                            {post.title}
                                                        </h1>
                                                        <div>
                                                            <Link to={postLink}>
                                                                <h3
                                                                    className="font-poppins font-12 bold text-white
                                                                text-uppercase"
                                                                >
                                                                    Leer más
                                                                </h3>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* {
                            showButton ?
                                <div className="col-12 pt-4 d-flex">
                                    <Link to={type ? PUBLIC_ROUTES.BLOG.path.replace(':post_type_slug?',type) : } className="btn btn-bicolor m-auto d-flex">
                                        <span className="my-auto font-poppins font-14 bold text-white px-5">
                                            {buttonTitle}
                                        </span>
                                    </Link>
                                </div>
                                : null
                        } */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogCarousel;
