import React, {Fragment} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";

const PillsDropDown = ({laboratories, subscriptions, formats, categorySlug}) => {

    const categoryUrl =  PUBLIC_ROUTES.SHOP_FILTER.path.replace(':category?',categorySlug);


    // need to split laboratories in 2 columns if there are more than 5 laboratories and add them in array
    let laboratories1 = laboratories.slice(0, Math.round(laboratories.length / 2));
    let laboratories2 = laboratories.slice(Math.round(laboratories.length / 2), laboratories.length);
    const laboratoriesArray = [laboratories1, laboratories2];

    console.log(laboratoriesArray);

    return (
        <Fragment>
            <div className="row mt-1">
                <div className="col-4">
                    <h3 className="pills-sub-header-title">FORMATO</h3>
                    {
                        formats.map((format) => {
                            let formatKey = uuidv4();
                            let formatUrl = categoryUrl.replace(':type?','formato');
                            formatUrl = formatUrl.replace(':filter?',format);
                            return (
                                <Link to={formatUrl} style={{textDecoration: 'none'}} key={formatKey}>
                                    <span className="font-poppins py-1 font-12 text-black my-auto d-block">{format} pastillas</span>
                                </Link>
                            )
                        })
                    }
                    {/* <h3 className="pills-sub-header-title mt-3">SUSCRIPCIÓN</h3> */}

                    <Link to={'/tienda/pastillas'} style={{textDecoration: 'none'}} className="pills-subscription-color">
                        <div className="pills-sub-header-title mt-3">SUSCRIPCIÓN</div>
                    </Link>

                    {
                        subscriptions.map((subscription) => {
                            let subscriptionKey = uuidv4();
                            let subscriptionUrl = categoryUrl.replace(':type?','suscripcion');
                            subscriptionUrl = subscriptionUrl.replace(':filter?', subscription.months);
                            return (
                                <Link to={subscriptionUrl} style={{textDecoration: 'none'}} key={subscriptionKey}>
                                    <span className="font-poppins py-1 font-12 text-black my-auto d-block ">{subscription.cicles} Meses / {subscription.months} Ciclos</span>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="col-8">
                    <h3 className="pills-sub-header-title">LABORATORIO</h3>
                    <div className='row'>
                    {
                        laboratoriesArray.map((laboratories, index) => {
                            return(
                                <div className="col-6">
                                    {
                                        laboratories.map((laboratory) => {
                                            let laboratoryKey = uuidv4();
                                            let laboratoryUrl = categoryUrl.replace(':type?', 'laboratorio');
                                            laboratoryUrl = laboratoryUrl.replace(":filter?", laboratory.name.replace(' ','-').toLowerCase());

                                            return (
                                                <Link to={laboratoryUrl} style={{textDecoration: 'none', pointerEvents: 'auto'}} key={laboratoryKey}>
                                                    <span key={laboratoryKey} className="font-poppins py-1 font-12 text-black my-auto d-block pills-span">{laboratory.name}</span>
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default PillsDropDown
