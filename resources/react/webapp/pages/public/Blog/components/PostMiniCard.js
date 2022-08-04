import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import moment from "moment";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PostMiniCard = ({post}) => {

    const [url, setUrl] = useState('')

    useEffect(() => {
        let _url = PUBLIC_ROUTES.POST.path.replace(':post_type_slug?', post.post_type.slug);
        _url = _url.replace(':post_slug?', post.slug);
        setUrl(_url);
    }, [])

    const coolDate = (postDate) =>{
        let date = moment(postDate).lang('es').format('ll');
        date = date.replace('de', '');
        date = date.replace('de', '');
        date = date.replace('.', '');
        return date.toUpperCase()
    }

    return (
        <Link to={url} style={{textDecoration: 'none'}}>

            <div className="card w-100 post-mini-card zoom">
                <LazyLoadImage
                    alt={post.title}
                    className="card-img-top"
                    title="Anticonceptivo"
                    rel="nofollow"
                    effect="blur"
                    src={post.public_principal_image}
                />
                <div className="mini-card-date">
                    {coolDate(post.created_at)}
                </div>
                <div className="card-body py-3 py-md-4"
                     style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>
                    <h5 className="card-title bold">{post.title}</h5>
                    <p className="card-text" dangerouslySetInnerHTML={{__html: (post.content).substring(0, 160)}}/>
                </div>
            </div>

        </Link>
    )
};

export default PostMiniCard
