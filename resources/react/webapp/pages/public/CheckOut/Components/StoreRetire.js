import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import logoShort from "../../../../assets/images/logo.jpeg";
import Icon from "../../../../components/general/Icon";


const StoreRetire = ({
    saveDefaultAddress,
    name = 'default_address',
}) => {
    const [checked, setChecked] = useState(false)
    const setAddress=()=>{
        saveDefaultAddress("4003", null)
        setChecked(true)
    }

    return (
        <>
        <div className="row">
            <div className="col-auto d-flex pr-0">
                <div className="my-auto">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="radio"
                        name={name}
                        checked={checked}
                        className="mr-1"
                        onClick={() => setAddress()}
                        id={`custom-inline-radio-address-retirotienda`}
                    />
                </div>
            </div>

            <div className="col pl-0">
                <div className="row">
                    <div className="col-12">
                        <span className="font-poppins font-10 regular color-8E8E8E">
                            Retiro en Tienda: 
                        </span>
                    </div>
                    <div className="col-12">
                        <div className="font-poppins font-14 lh-18 regular color-484848">
                            Farmacias Oxfar, Antonio Bellet 147, Providencia
                        </div>
                        
                    </div>
                    
                </div>
               
            </div>
           
        </div>
         <div style={{textAlign:"center",position: "relative",overflow: "hidden", width: "90%", paddingTop: "56.25%", margin: "0 auto"}}>
            <br/>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.896243891384!2d-70.6175332!3d-33.42594929999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf63bef52a5f%3A0x1b3d0c24107d99c5!2sAntonio%20Bellet%20147%2C%207500025%20Providencia%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses-419!2smx!4v1690257068337!5m2!1ses-419!2smx" style={{border:"0",margin: "10px auto", position: "absolute",top: 0,left: 0, bottom: 0,right: 0, width: "100%",height: "100%"}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            
         </div>
         <div style={{textAlign:"center"}}>
         <br/>
            <Icon path={logoShort} style={{height: 47}}/>
            <br/>
            <b>Horarios:</b>
            <br/>
            8:00am a 21:00 hrs lunes a viernes <br/>
            Sábados 9:00am a 18:00 hrs <br/>
            Domingo cerrados. <br/>
            Telefono: +56 2 2437 0237
         </div>
         </>
    );
};

export default StoreRetire
