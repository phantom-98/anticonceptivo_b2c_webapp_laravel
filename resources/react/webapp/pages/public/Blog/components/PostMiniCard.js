import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";

const PostMiniCard = ({post}) => {

    const [url, setUrl] = useState('')

    useEffect(() => {
        let _url = PUBLIC_ROUTES.POST.path.replace(':post_type_slug?', post.post_type.slug);
        _url = _url.replace(':post_slug?', post.slug);
        setUrl(_url);
    }, [])

    return (
        <Link to={url} style={{textDecoration: 'none'}}>

            <div className="card w-100 post-mini-card zoom">
                <img className="card-img-top" src={post.public_principal_image} alt={post.title}/>
                <div className="card-body px-3 px-md-5 py-3 py-md-4">
                    <h5 className="card-title bold">{post.title}</h5>
                    <p className="card-text">
                        {
                            ((post.content).substring(0, 150)).replace(/(<([^>]+)>)/gi, '')
                        } ...
                    </p>
                </div>
            </div>

        </Link>
    )
};

export default PostMiniCard
