import React, {useEffect, useState} from 'react';
import Icon from "../../../../components/general/Icon";
import {v4 as uuidv4} from 'uuid';
import * as Services from "../../../../Services";
import LazyLoading from "../../../../components/LazyLoading";
import H2Title from "../../../../components/general/H2Title";

const TimeLine = ({}) => {

    const [loaded, setLoaded] = useState(false);
    const [timelines, setTimelines] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {

        setLoaded(false);

        let url = Services.ENDPOINT.PUBLIC_AREA.HISTORY;
        let data = {}
        Services.DoGet(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setTimelines(response.data.time_lines);
                },
            });
            setLoaded(true);
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    if (!loaded) {
        return <LazyLoading height={200}/>
    }

    const TimeLineOne = ({timeline}) => {
        return (
            <div className="col-md-2 timeline-item">
                <div>
                    <div className="timeline-box">
                        <div className="circle-timeline">
                            <Icon path={timeline.public_icon}/>
                        </div>
                        <div className="timeline-line-vertical"/>
                    </div>
                    <div className="timeline-year">
                        <span>{timeline.year}</span>
                    </div>
                    <div className="timeline-box">
                        <div className="timeline-resume">
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: timeline.description
                                }}
                            />
                            {timeline.post
                                ?
                                <p className="font-poppins font-12 bold pointer color-033F5D">
                                    <a href={timeline.post.url}>LEER MÁS</a>
                                </p>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const TimeLineTwo = ({timeline}) => {
        return (<div className="col-md-2 timeline-item" style={{marginBottom: "50px"}}>
            <div>
                <div className="timeline-box">
                    <div className="timeline-resume">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: timeline.description
                            }}
                        />
                        {timeline.post
                            ?
                            <p className="font-poppins font-12 bold pointer color-033F5D">
                                <a href={timeline.post.url}>LEER MÁS</a>
                            </p>
                            :
                            null
                        }
                    </div>
                </div>
                <div className="timeline-year">
                    <span>{timeline.year}</span>
                </div>
                <div className="timeline-box">
                    <div className="timeline-line-vertical"/>
                    <div className="circle-timeline">
                        <Icon path={timeline.public_icon}/>
                    </div>
                </div>
            </div>
        </div>)
    }

    return (

        <div className="row">
            <div className="col-md-12">
                <div className="panel">
                    <div className="panel-body">

                        {
                            !loaded ? <LazyLoading height={200}/> :

                                <div className="row">
                                    <div className="col-12 pt-4 mb-5">
                                        <H2Title text="HISTORIA DE LOS ANTICONCEPTIVOS"/>
                                    </div>
                                    <div className="col-12">
                                        <div className="row no-gutters timeline">
                                            {
                                                timelines.map((timeline, i) => {
                                                    return (
                                                        i % 2 === 0 ?
                                                            <TimeLineOne timeline={timeline} key={uuidv4()}/>
                                                            :
                                                            <TimeLineTwo timeline={timeline} key={uuidv4()}/>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                </div>

                        }


                    </div>
                </div>
            </div>
        </div>

    );
};

export default TimeLine
