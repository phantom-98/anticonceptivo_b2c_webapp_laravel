import React, {useState, useEffect} from 'react';
import DivCheckBox from "../../../../DivCheckBox";

const Areas = ({model, setModel, areas}) => {

    const validateExists = (areaId) => {
        return model.areas.find(a => a.id == areaId);
    }

    const addArea = (areaId) => {
        let area = areas.find(a => a.id == areaId)
        setModel({
            ...model,
            areas: [...model.areas, {
                id : area.id
            }]
        })
    }

    const destroyArea = (areaId) => {
        const list = model.areas.filter(a => a.id !== areaId)
        setModel({
            ...model,
            areas: list
        })
    }

    const handleSelectedAreas = (areaId) => {
        if (validateExists(areaId)) {
            destroyArea(areaId)
        } else {
            addArea(areaId);
        }
    }


    return (
        <div className="row pb-4">
            <div className="col-12">
                <h3 className="font-signika font-24 bold text-primary">
                    Áreas
                </h3>
            </div>

            <div className="col-12">
                <div className="row">
                    {
                        areas.map((area, index) => {
                            return <div className="col-md-3 mb-3" key={index}
                                        onClick={() => handleSelectedAreas(area.id)}>
                                <DivCheckBox subtitle={area.name} active={validateExists(area.id)}/>
                            </div>;
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Areas;
