import React from 'react';
import Icon from "../../../components/general/Icon";
import { v4 as uuidv4 } from 'uuid';

const TimeLine = ({timelines}) => {
    return (
        <div className="row no-gutters timeline">
            {
                timelines.map((data, i) => {
                    let timelineKey = uuidv4();
                    return (
                        i%2 == 0 ?
                            <div className="col-md-2 timeline-item">
                                <div key={timelineKey}>
                                    <div className="timeline-box">
                                        <div className="circle-timeline">
                                            <Icon path={data.public_icon}/>
                                        </div>
                                        <div className="timeline-line-vertical"/>
                                    </div>
                                    <div className="timeline-year">
                                        <span>{data.year}</span>
                                    </div>
                                    <div className="timeline-box">
                                        <div className="timeline-resume">
                                            <p className="font-poppins font-11 regular color-6C6B6B">
                                                {data.description}
                                            </p>
                                            <p className="font-poppins font-12 bold pointer color-033F5D">
                                                <a href={'#'}>LEER MÁS</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        :
                            <div className="col-md-2 timeline-item">
                                <div key={timelineKey}>
                                    <div className="timeline-box">
                                        <div className="timeline-resume">
                                            <p className="font-poppins font-11 regular color-6C6B6B">
                                                {data.description}
                                            </p>
                                            <p className="font-poppins font-12 bold pointer color-033F5D">
                                                <a href={'#'}>LEER MÁS</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="timeline-year">
                                        <span>{data.year}</span>
                                    </div>
                                    <div className="timeline-box">
                                        <div className="timeline-line-vertical"/>
                                        <div className="circle-timeline">
                                            <Icon path={data.public_icon}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    )
                })
            }

        </div>
    );
};

export default TimeLine
