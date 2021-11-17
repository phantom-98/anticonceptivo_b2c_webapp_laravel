import React, {Fragment, useState, useEffect} from 'react';
import BasePanelTwo from "../../../template/BasePanelTwo";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {Card} from "react-bootstrap";
import ClaimItem from "./ClaimItem";
import Pagination from "react-js-pagination";
import { v4 as uuidv4 } from 'uuid';
import ModalClaim from "./ModalClaim";
import * as Services from "../../../Services";
import toastr from "toastr";
import moment from "moment";
import Swal from 'sweetalert2'

const Claim = () => {

    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.CLAIM.path,
            name: PUBLIC_ROUTES.CLAIM.title,
        }
    ];

    const defaultData = {
        first_name: '',
        email: '',
        phone: '',
        phone_code: '+56',
        // subject: '',
        message:'',
    }

    const [data, setData] = useState(defaultData);
    const [claims, setClaims] = useState([]);

    const [activePage, setActivePage] = useState(1);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'col-6 btn btn-bicolor btn-block',
            title: 'mt-4'
        },
        buttonsStyling: false
    })

    const colors = [
        '#033F5D',
        '#0869A6',
        '#005A86',
        '#00DBAE',
        '#009BE8',
    ]

    const [show, setShow] = useState(false);

    const showClaim = () => setShow(true)
    const hideClaim = () => setShow(false)

    const [pickedColor, setPickedColor] = useState([]);

    // useEffect(() => {
    //     setActivePage(1);
    // },[itemsCountPerPage])

    useEffect(() => {
        getData();
    },[])

    useEffect(() => {
        if (claims.length) {
            let total = claims.length;
            let count = 0;
            let list = [];

            while (count <= total / 5) {
                list.push.apply(list, colors);
                count++;
            }

            setTotalItemsCount(total);
            setPageRangeDisplayed(Math.ceil(total/itemsCountPerPage));
            setPickedColor(list);
        }
    }, [claims])

    const getData = () => {
        let url = Services.ENDPOINT.NO_AUTH.CLAIM.GET_DATA;
        Services.DoGet(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setClaims(response.data.claims);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const saveClaim = () => {
        let url = Services.ENDPOINT.NO_AUTH.CLAIM.SUBMIT;
        let dataForm = {
            ...data
        }
        Services.DoPost(url,dataForm).then(response => {
            Services.Response({
            response: response,
            success: () => {
                getData();
                hideClaim();
                setData(defaultData);
                swalWithBootstrapButtons.fire({
                    title: '<span style="color: #0869A6;">Su reclamo #'+response.data.claim_id+' ha sido ingresado exitosamente.</span>',
                    confirmButtonText: 'Confirmar',
                    reverseButtons: true
                })
            },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const handleData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >
                <div className="panel mb-4">
                    <div className="panel-body">
                        <div className="row">
                            <div className="col">
                                <h3 className="base-panel-one-title text-center" style={{letterSpacing: '2px'}}>LIBRO DE RECLAMOS</h3>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col font-poppins font-20 color-033F5D text-center">
                                Para ingresar un reclamo presiona <a className="font-poppins font-20 bold color-033F5D" style={{cursor:'pointer'}} onClick={showClaim}>aquí</a>
                            </div>
                        </div>
                        <div className="row">
                            {
                                claims.map((claim, index) => {
                                    const uuid = uuidv4();
                                    const position = index+1;
                                    const init = activePage === 1 ? 0 : (activePage - 1) * parseInt(itemsCountPerPage);
                                    const finish = init+parseInt(itemsCountPerPage);

                                    return position > init && position <= finish ?
                                        <div className="col-10 offset-1 mt-3" key={uuid}>
                                            <Card className="card-claim">
                                                <Card.Body>
                                                    <ClaimItem
                                                        name={claim.first_name}
                                                        date={moment(claim.created_at).format('DD/MM/YYYY')}
                                                        description={claim.message}
                                                        color={pickedColor[index]}
                                                    />
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    : null;
                                })
                            }
                        </div>
                        {
                            claims.length ?

                            <div className="row">
                                <div className="col-12 mt-5">
                                    <Pagination
                                        activePage={activePage}
                                        itemsCountPerPage={itemsCountPerPage}
                                        totalItemsCount={totalItemsCount}
                                        pageRangeDisplayed={pageRangeDisplayed}
                                        onChange={e => setActivePage(e)}
                                        itemClass={'paginator-buttons'}
                                        innerClass={'paginator-ul'}
                                        // hideNavigation={true}
                                        hideDisabled={true}
                                        hideFirstLastPages={true}
                                    />
                                    {totalItemsCount ? <label className="font-poppins font-12 regular paginator-label">Páginas</label> : null}
                                </div>
                            </div>

                            : null
                        }
                    </div>
                </div>
            </BasePanelTwo>
            <ModalClaim
                show={show}
                hide={hideClaim}
                data={data}
                handleData={handleData}
                saveClaim={saveClaim}
            />
        </Fragment>
    );
};

export default Claim
