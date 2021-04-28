import React, {useState, useEffect} from 'react';

import {Card, Form} from "react-bootstrap";
import * as Services from "../../../../../Services";
import {formatMoney} from "../../../../../helpers/GlobalUtils";

const Filter = ({professionals, setProfessionalsWithFilter, search}) => {

    const [max, setMax] = useState(10000);
    const [rangePrice, setRangePrice] = useState(0);
    const [areas, setAreas] = useState();
    const [countries, setCountries] = useState();
    const [regions, setRegions] = useState();


    const [filterList, setFilterList] = useState(
        {
            area: 0,
            country: '',
            rangePrice: 0,
        }
    );

    useEffect(() => {
        index();
        if(professionals.length){
            const max = getMaxPrice(professionals)
            setRangePrice(max)
            setMax(max + 1000);
        }
    }, [])

    useEffect(() => {

        let professionalList = professionals

        let professionalTemp = [];

        if (filterList.area > 0) {

            professionalTemp = []

            professionalList.map(professional => {

                professional.areas.map(area => {
                    if (area.id == filterList.area) {
                        professionalTemp.push(professional);
                    }
                })


            })

            professionalList = professionalTemp;

        }

        if (filterList.rangePrice > 0) {
            professionalList = professionalList.filter(professional => professional.price_hour <= filterList.rangePrice)
        }

        if(filterList.country){
            professionalList = professionalList.filter(professional => professional.country == filterList.country)
        }

        setProfessionalsWithFilter(professionalList);

    }, [filterList]);

    useEffect(() =>{
        if (search.length > 0) {
            let professionalList = professionals;
            professionalList = professionalList.filter(professional => {
                const name = (professional.full_name).toLowerCase();
                const description = professional.professional_description ? (professional.professional_description).toLowerCase() : '';

                if(name.includes(search) || description.includes(search)){
                    return professional;
                }
            })
            setProfessionalsWithFilter(professionalList);
        }else{
            setProfessionalsWithFilter(professionals);
        }
    }, [search])

    const index = () => {
        let url = Services.ENDPOINT.PANEL.COMPANY.PROFESSIONALS.GET_RESOURCES;

        Services.DoPost(url)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setAreas(response.data.areas)
                        setCountries(response.data.countries)
                        // setRegions(response.data.regions)

                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    const handleFilterList = e => {
        setFilterList({
            ...filterList,
            [e.target.name]: e.target.value
        });
    };

    const getMaxPrice = (professionals) => {
        const maxPeak = professionals.reduce((p, c) => p.price_hour > c.price_hour ? p : c);
        return maxPeak.price_hour;
    }

    return (
        <div className="mb-3">
            <Card>
                <Card.Body>
                    <div className="row">
                        <div className="col-12">
                            <h2 className="font-signika font-20 bold text-secondary mb-4">
                                Buscador de profesionales
                            </h2>
                        </div>
                        <div className="col-12">
                            <h3 className="font-epilogue font-14 medium text-primary mb-1">
                                Actividad Profesional
                            </h3>
                        </div>

                        <div className="col-12 mb-3">
                            <select
                                className="form-control form-control-custom"
                                id="area"
                                name="area"
                                value={filterList.area}
                                onChange={handleFilterList}
                            >
                                <option value="0">Todas las profesiones</option>
                                {areas
                                    ? areas.map(area => (
                                        <option key={area.id} value={area.id}>
                                            {area.name}
                                        </option>
                                    ))
                                    : null}
                            </select>
                        </div>

                        <div className="col-12 mb-3">
                            <select
                                className="form-control form-control-custom"
                                id="country"
                                name="country"
                                value={filterList.country}
                                onChange={handleFilterList}
                            >
                                <option value="0">Todos los países</option>
                                {countries
                                    ? countries.map(country => (
                                          <option
                                              key={country.id}
                                              value={country.name}
                                          >
                                              {country.name}
                                          </option>
                                      ))
                                    : null}
                            </select>
                        </div>

                        <div className="col-12 mb-3">
                            <select
                                className="form-control form-control-custom"
                                id="region"
                                name="region"
                                value={filterList.region}
                                onChange={handleFilterList}
                            >
                                <option value="0">Todas las regiones</option>
                                {regions
                                    ? regions.map(region => (
                                          <option
                                              key={region.id}
                                              value={region.id}
                                          >
                                              {region.name}
                                          </option>
                                      ))
                                    : null}
                            </select>
                        </div>

                        {/* <div className="col-12 mt-2">
                            <h3 className="font-14 medium text-primary mb-1">
                                Actividad Profesional
                            </h3>
                        </div>

                        <div className="col-12 mb-3">
                            <div className="row">
                                <div className="col">
                                    <div className="selectable active">
                                        <div className="m-auto">Todos</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="selectable">
                                        <div className="m-auto">Empresa</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="selectable">
                                        <div className="m-auto">
                                            Profesional
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 mt-2">
                            <h3 className="font-14 medium text-primary mb-1">
                                Modo de trabajo
                            </h3>
                        </div>

                        <div className="col-12 mb-3">
                            <div className="row">
                                <div className="col">
                                    <div className="selectable active">
                                        <div className="m-auto">Remoto</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="selectable">
                                        <div className="m-auto">Presencial</div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="selectable">
                                        <div className="m-auto">Ambos</div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        <div className="col-12 mt-2">
                            <h3 className="font-epilogue font-14 medium text-primary mb-1">
                                Valor Hora
                            </h3>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="row">
                                <div className="col-6">
                                    <span className="font-12 regular color-3B3B3B">
                                        $0
                                    </span>
                                </div>
                                <div className="col-6 text-right">
                                    <span className="font-12 regular color-3B3B3B">
                                        {formatMoney(rangePrice)}
                                    </span>
                                </div>
                                <div className="col-12">
                                    <Form.Control
                                        type="range"
                                        name="rangePrice"
                                        id="rangePrice"
                                        min="100"
                                        max={max}
                                        step="100"
                                        value={rangePrice}
                                        onChange={e =>
                                            setRangePrice(e.target.value)
                                        }
                                        onMouseUp={handleFilterList}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <div className="col-12 mt-2">
                            <h3 className="font-14 medium text-primary mb-1">
                                Calificación
                            </h3>
                        </div>
                        <div className="col-12 mb-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="rating-filter"
                                    id="rating-filter-5"
                                    value="5"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="rating-filter-5"
                                >
                                    <StarView htmlFor="" value={5} size={15} />
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="rating-filter"
                                    id="rating-filter-4"
                                    value="4"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="rating-filter-4"
                                >
                                    <StarView htmlFor="" value={4} size={15} />
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="rating-filter"
                                    id="rating-filter-3"
                                    value="3"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="rating-filter-3"
                                >
                                    <StarView htmlFor="" value={3} size={15} />
                                </label>
                            </div>
                        </div> */}
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Filter;
