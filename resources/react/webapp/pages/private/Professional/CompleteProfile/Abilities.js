import React, {useState, useEffect} from 'react';
import DivCheckBox from "../../../../components/DivCheckBox";
import * as Services from "../../../../Services";

const Abilities = ({professional, setProfessional, setShowingSection}) => {

    const [areas, setAreas] = useState([]);
    const [selectedAreas, setSelectedAreas] = useState([]);


    useEffect(()=>{
        if('areas' in professional){
            let list = [];
            professional.areas.map(area => list.push(area.id));
            setSelectedAreas(list);
        }
    },[professional]);

    useEffect(()=>{
        getResources();
    },[]);

    const getResources = () => {
        let url = Services.ENDPOINT.PANEL.COMMON.COMPLETE_PROFILE.RESOURCES.ABILITIES;
        Services.DoGet(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setAreas(response.data.areas);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const handleSelectedAreas = (AreaId) => {
        if (!selectedAreas.includes(AreaId)) {
            setSelectedAreas([
                ...selectedAreas, AreaId
            ]);
        }else{
            const listAreas = selectedAreas.filter((aId) => aId !== AreaId);
            setSelectedAreas(listAreas);
        }
    }

    const store = () => {
        let url = Services.ENDPOINT.PANEL.PROFESSIONAL.COMPLETE_PROFILE.ABILITIES;
        let data = {
            professional_id: professional.id,
            professional_areas: selectedAreas
        }
        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProfessional(response.data.professional)
                    setShowingSection('basicInfo');
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const back = () => {
        setShowingSection('terms')
    }

    const controlNext = () => {
        if (selectedAreas.length > 0) {
            return <button type="button" onClick={store} className="btn btn-form btn-primary btn-rounded px-4">
                <span>Siguiente</span>
            </button>;
        }
        return <button type="button" className="btn btn-form btn-primary btn-rounded disabled px-4">
            <span>Siguiente</span>
        </button>
    }

    return (
        <form noValidate className="form needs-validation av-invalid" onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
        }}>
            <div className="row">
                <div className="col-md-12">
                    <h4 className="font-signika font-25 bold text-primary mb-4">
                        {professional.full_name}, ¿Listo para trabajar?
                    </h4>
                    <p className="font-epilogue font-14 light color-3C3C3E lh-25">
                        Necesitamos saber más de ti. Las habilidades nos ayudan para acercarte a los clientes que te
                        necesitan. <br/>¿En que rubro te especializas?
                    </p>
                </div>
                <div className="col-12 py-3">
                    <div className="row">
                        {
                            areas.map((area, index) => {
                                return <div className="col-md-3 mb-3" key={index} onClick={() => handleSelectedAreas(area.id, index)}>
                                    <DivCheckBox subtitle={area.name} active={selectedAreas.includes(area.id) ? true : false} />
                                </div>;
                            })
                        }
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col-6">
                            <button type="button" onClick={back}
                                    className="btn btn-form btn-outline-primary btn-rounded px-4">
                                <span>Anterior</span>
                            </button>
                        </div>
                        <div className="col-6 text-right">
                            {
                                controlNext()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Abilities;
