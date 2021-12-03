import React, {Fragment, useContext, useEffect, useState} from 'react';
import Icon from "../../../../components/general/Icon";
import {v4 as uuidv4} from 'uuid';
import * as Services from "../../../../Services";
import LazyLoading from "../../../../components/LazyLoading";
import H2Title from "../../../../components/general/H2Title";
import {AppContext} from "../../../../context/AppProvider";
import {BREAKPOINTS} from "../../../../helpers/vars";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const TimeLine = ({}) => {

    const {breakpoint} = useContext(AppContext)

    const [loaded, setLoaded] = useState(false);
    const [timelines, setTimelines] = useState([]);

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 4500,
        centerMode: true,
    };
    
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
                                <p className="font-poppins font-12 bold pointer color-033F5D readMoreHistory">
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
                            <p className="font-poppins font-12 bold pointer color-033F5D readMoreHistory">
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

    const Desktop = () => {

        return <div className="row">
            <div className="col-md-12">
                <div className="panel">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-12 pt-4 mb-5">
                                <H2Title text="HISTORIA DE LOS ANTICONCEPTIVOS"/>
                            </div>
                            <div className="col-12">
                                <div className="row no-gutters timeline">
                                    {
                                        timelines.map((timeline, i) => {
                                            return i % 2 === 0 ?
                                                <TimeLineOne timeline={timeline} key={uuidv4()}/>
                                                :
                                                <TimeLineTwo timeline={timeline} key={uuidv4()}/>
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    }

    const Mobile = () => {

        return (<div className="row">
            <div className="col-12 pt-3 mb-3">
                <H2Title className="text-left" text="HISTORIA DE LOS ANTICONCEPTIVOS"/>
            </div>
            <div className="col-12">
                <div className="row no-gutters timeline">
                    <div className="col-12">
                        <Slider {...settings}>
                            {
                                timelines.map((timeline) => {
                                    return <div className="card-timeline mt-2 py-4 px-4" key={uuidv4()}>
                                        <TimeLineOne timeline={timeline}/>
                                    </div>
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>)
    }


    if (!loaded) return <LazyLoading height={200}/>

    return (
        breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
            <Desktop/>
            :
            <Mobile/>

    );
};

export default TimeLine
