import React, {Fragment, useEffect, useState} from 'react';
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BlogCarousel from "../../../components/sections/BlogCarousel";
import {Link} from "react-router-dom";
import * as Services from "../../../Services";
import {CONFIG} from "../../../Config";
import { v4 as uuidv4 } from 'uuid';
import LazyLoading from "../../../components/LazyLoading";
import moment from "moment";
import Pagination from "react-js-pagination";

const Blog = ({match}) => {

    const [posts, setPosts] = useState([]);
    const [blogName, setBlogName] = useState('');
    const [loading, setLoading] = useState(true);

    const [activePage, setActivePage] = useState(1);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    useEffect(() => {
        getData(match.params.post_type_slug);
    },[match.params.post_type_slug])

    useEffect(() => {
        setActivePage(1);
    },[itemsCountPerPage])

    useEffect(() => {
        if (posts.length) {
            let total = posts.length;

            setTotalItemsCount(total);
            setPageRangeDisplayed(Math.ceil(total/itemsCountPerPage));
        }
    }, [posts])


    const getData = (slug) => {
        let url = Services.ENDPOINT.PUBLIC_AREA.BLOG.POSTS;
        let data = {
            post_type_slug: slug
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setPosts(response.data.posts);
                    setBlogName(response.data.blog_name);
                    setLoading(false);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
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
    ];

    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >
                {
                    !loading ? 
                        <Fragment>
                            <div className="row">
                                <div className="col">
                                    <h3 className="font-poppins font-46 bold color-009BE8" style={{letterSpacing: '2px'}}>{blogName}</h3>
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
                                                    id=""
                                                    onChange={(e) => setItemsCountPerPage(e.target.value)}
                                                    value={itemsCountPerPage}    
                                                >
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="30">30</option>
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
                            <div className="row mb-5">
                                {
                                    posts.map((post, index) => {
                                        const postKey = uuidv4();
                                        const position = index+1;
                                        const init = activePage === 1 ? 0 : (activePage - 1) * parseInt(itemsCountPerPage);
                                        const finish = init+parseInt(itemsCountPerPage);
                                        let postUrl = PUBLIC_ROUTES.POST.path.replace(':post_slug?', post.slug);
                                        postUrl = postUrl.replace(':post_type_slug?', match.params.post_type_slug);
                                        
                                        return position > init && position <= finish ?
                                            <div className="col-md-6 mb-3" key={postKey}>
                                                <div className="panel" style={{borderRadius: '12px'}}>
                                                    <div className="panel-body p-3">
                                                        <Link to={postUrl} style={{textDecoration : 'none'}}>
                                                            <div className="row">
                                                                <div className="col-md-auto">
                                                                    <div className="blog-list-img">
                                                                        <img src={post.public_principal_image} alt={CONFIG.APP_NAME}/>
                                                                    </div>
                                                                </div>
                                                                <div className="col pl-0">
                                                                    <div className="font-poppins font-14 regular color-009BE8 mb-1">
                                                                        {moment(post.published_at).lang('es').format('DD MMM YYYY')}
                                                                    </div>
                                                                    <div className="font-poppins font-20 lh-24 bold color-033F5D  mb-2">
                                                                        {post.title}
                                                                    </div>
                                                                    <div>
                                                                        <Link to={postUrl}>
                                                                            <span className="font-poppins font-12 bold color-009BE8
                                                                            text-uppercase">
                                                                                    Leer más
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        : null;
                                    })
                                }
                            </div>
                            {
                                posts.length ? 
                                <div className="row">
                                    <div className="col-12 mt-5">
                                        <Pagination
                                            activePage={activePage}
                                            itemsCountPerPage={itemsCountPerPage}
                                            totalItemsCount={totalItemsCount}
                                            pageRangeDisplayed={pageRangeDisplayed}
                                            onChange={e => setActivePage(e)}
                                            itemClass={'paginator-buttons'}
                                            innerClass={'paginator-ul'}
                                            // hideNavigation={true}
                                            hideDisabled={true}
                                            hideFirstLastPages={true}
                                        />
                                        <label className="font-poppins font-12 regular paginator-label">Páginas</label>
                                    </div>
                                </div>

                                : null
                            }
                        </Fragment>
                    : <LazyLoading/>
                }
            </BasePanelTwo>
            <BlogCarousel title="Contenidos relacionados" showButton={true} showOutstanding={true}/>
            <Subscribe/>
        </Fragment>
    );
};

export default Blog
