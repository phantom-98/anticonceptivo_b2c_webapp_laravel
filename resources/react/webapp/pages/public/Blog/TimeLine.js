import React, {Fragment} from 'react';
import handIcon from '../../../assets/images/icons/hands-little.svg'
import Icon from "../../../components/general/Icon";

const TimeLine = () => {
    return (
        <div className="row no-gutters timeline">

            {
                [1, 2, 3].map((_, i) => {
                    return <Fragment>
                        <div className="col-md-2 timeline-item">
                            <div key={i}>
                                <div className="timeline-box">
                                    <div className="circle-timeline">
                                        <Icon path={handIcon}/>
                                    </div>
                                    <div className="timeline-line-vertical"/>
                                </div>
                                <div className="timeline-year">
                                    <span>{192 + i}</span>
                                </div>
                                <div className="timeline-box">
                                    <div className="timeline-resume">
                                        <p className="font-poppins font-11 regular color-6C6B6B">
                                            Wireframes can be pencil drawings or sketches on a whiteboard, or they can
                                            be
                                        </p>
                                        <p className="font-poppins font-12 bold pointer color-033F5D">
                                            LEER MÁS
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 timeline-item">
                            <div key={i * 50}>
                                <div className="timeline-box">
                                    <div className="timeline-resume">
                                        <p className="font-poppins font-11 regular color-6C6B6B">
                                            Wireframes can be pencil drawings or sketches on a whiteboard, or they can
                                            be
                                        </p>
                                        <p className="font-poppins font-12 bold pointer color-033F5D">
                                            LEER MÁS
                                        </p>
                                    </div>
                                </div>
                                <div className="timeline-year">
                                    <span>{192 + i + 1}</span>
                                </div>
                                <div className="timeline-box">
                                    <div className="timeline-line-vertical"/>
                                    <div className="circle-timeline">
                                        <Icon path={handIcon}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                })
            }

        </div>
    );
};

export default TimeLine
