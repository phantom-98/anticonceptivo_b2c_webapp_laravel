import React, {Fragment, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";

const BaseNoLayout = (props) => {

    const [bg, setBg] = useState('');

    useEffect(() => {

        switch (props.bg) {

            case 'one':
                setBg('/themes/web/assets/images/bg/bg-auth-one.svg')
                break;
            case 'two':
                setBg('/themes/web/assets/images/bg/bg-auth-two.svg')
                break;
            default :
                setBg('')

        }

    }, [props.bg])

    return (
        <Fragment>
            <div className="bg-auth" style={{backgroundImage: 'url(' + bg + ')'}}>
                <div className="d-flex" style={{height: '130px'}}>
                  <div className="pl-5 my-auto">
                      <Link to="/" className="pointer">
                          <img id="logo-navbar" src="/themes/web/assets/images/logo.svg" rel="nofollow"/>
                      </Link>
                  </div>
                </div>
                <div className="container">
                    <div className="row d-flex" style={{minHeight: 'calc(100vh - 236px)'}}>
                        <div className="col-12 my-auto">
                            {
                                props.children
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default BaseNoLayout;
