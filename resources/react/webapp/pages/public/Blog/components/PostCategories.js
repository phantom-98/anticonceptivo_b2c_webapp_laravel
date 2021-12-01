import React, {useEffect, useState} from 'react';
import * as Services from "../../../../Services";
import {v4 as uuid} from 'uuid';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";

const PostCategories = () => {
    const [loaded, setLoaded] = useState(false);
    const [postCategories, setPostCategories] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {

        setLoaded(false);

        let url = Services.ENDPOINT.PUBLIC_AREA.BLOG.POST_CATEGORIES;
        let data = {}
        Services.DoGet(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setPostCategories(response.data.post_categories);
                },
            });
            setLoaded(true);
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const ItemCategory = ({category}) => {

        let url = PUBLIC_ROUTES.BLOG_LIST_BY_CATEGORY.path;
        url = url.replace(':post_type_slug', category.slug);

        return (<div className="col-md-6 mb-3">
                <Link to={url} style={{textDecoration: 'none'}}>
                    <div className="blog-card zoom" style={{
                        backgroundImage: `url(${category.image})`,
                        height: '355px'
                    }}>
                        <div className="blog-card-veil"/>
                        <div className="blog-card-content">
                            <div className="px-3 px-md-5 py-3 py-md-4 mt-auto">
                                <div className="font-poppins font-44 font-md-34 lh-44 lh-md-34 bold text-white mb-2">
                                    {category.name}
                                </div>
                                <div className="font-poppins font-18 font-md-16 lh-22 lh-md-20 regular text-white mb-2">
                                    {category.description}
                                </div>
                                <div className="pt-4">
                                    <Link to={url}>
                                        <span className="font-poppins font-12 bold text-white text-uppercase">
                                            Ver más
                                        </span>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    return (
        <div className="row">
            <div className="col-md-12">
                {
                    !loaded ? null :
                        <div className="row">

                            <div className="col-12">
                                <h2 className="blog-h2-title-box text-center pb-5">
                                    Categorías
                                </h2>
                            </div>

                            {
                                postCategories.map(category => <ItemCategory category={category} key={uuid()}/>)
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default PostCategories
