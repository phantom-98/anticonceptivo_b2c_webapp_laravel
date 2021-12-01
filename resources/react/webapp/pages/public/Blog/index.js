import React, {Fragment} from 'react';
import {useParams} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import H2Title from "../../../components/general/H2Title";
import TimeLine from "./components/TimeLine";

const Blog = () => {

    const {post_type_slug} = useParams();

    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.BLOG.path.replace(':post_type_slug?', post_type_slug),
            name: PUBLIC_ROUTES.BLOG.title,
        },
    ];

    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >

                <TimeLine />



            </BasePanelTwo>
            {/*<BlogCarousel title="Contenidos relacionados"*/}
            {/*              showButton={true}*/}
            {/*              showOutstanding={true}*/}
            {/*              type={post_type_slug}/>*/}
            <Subscribe/>
        </Fragment>
    );
};

export default Blog
