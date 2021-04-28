import React,{Fragment} from 'react';

import ProfessionalCard from "./../components/ProfesionalCard";
import LazyLoading from "../../../../../components/LazyLoading";


const ProfessionalList = ({professionals, loaded}) => {


    return (
        <div className="row">
            <div className="col-12 mb-3">
                {loaded ? (
                        <Fragment>
                            {professionals.length > 0 ? (
                                professionals.map((professional, index) => {
                                    return (
                                        <div key={index} className="col-12 mb-3 px-0">
                                            <ProfessionalCard
                                                professional={professional}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <div
                                    className="alert col-12 mb-3 alert-primary fade show text-center"
                                    role="alert"
                                >
                                    <span className="font-12">
                                        No existen registros.
                                    </span>
                                </div>
                            )}
                        </Fragment>
                ) : (
                    <LazyLoading />
                )}
            </div>
        </div>
    );
};

export default ProfessionalList;
