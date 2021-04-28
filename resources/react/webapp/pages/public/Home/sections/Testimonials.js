import React, {useState, useEffect} from 'react';
import CardTestimonial from "../components/CardTestimonial";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import * as Services from "../../../../Services";
import LazyLoading from "../../../../components/LazyLoading";

const Testimonials = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
    };

    useEffect(() => {
        getTestimonials();
    },[])

    const [testimonials, setTestimonials] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getTestimonials = () => {
        let url = Services.ENDPOINT.NO_AUTH.PRESENTATION.GET_TESTIMONIALS;
        Services.DoGet(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setTestimonials(response.data.testimonials);
                    setLoaded(true);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }


    return (
        <section className="py-5" id="testimonials">
            <div className="container" style={{maxWidth: '983px'}}>
                <div className="row">
                    <div className="col-12">
                        <h2 className="font-35 bold text-secondary text-center">
                            Testimonios
                        </h2>
                        <p className="font-epilogue font-16 light text-center color-121212">
                            Realizas el pago con garantía total sobre los fondos y empieza a trabajar :)
                        </p>
                    </div>
                </div>

                <div className="row justify-content-center pb-4 pt-5">
                    <div className="col-12">
                        <Slider {...settings}>
                            {
                                loaded ? 
                                    testimonials.map((testimonial,index) => {
                                        return (<div className="px-3" key={index}>
                                            <CardTestimonial
                                                name={testimonial.professional.full_name}
                                                area={testimonial.professional.areas[0].name}
                                                stars={testimonial.rating_point}
                                                imgPath={testimonial.professional.public_image}
                                                description={testimonial.rating_description}
                                            />
                                        </div>)
                                    })

                                : <LazyLoading/>
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
