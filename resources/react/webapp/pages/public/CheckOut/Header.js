import React, {useEffect, useState} from 'react';
import Icon from "../../../components/general/Icon";
import logoFull from "../../../assets/images/logo-full.svg";
import Step from "../../../components/shopping/Step";


const Header = ({showFinal}) =>{

    const [ready, setReady] = useState({
        one : false,
        two : false,
        three : false
    })

    useEffect(() =>{
        if(showFinal !== 1){
            setReady({
                one : true,
                two : false,
                three : false
            })
        }else{
            setReady({
                one : false,
                two : false,
                three : false
            })
        }
    },[showFinal])

    return (
        <div className="row pb-4">
            <div className="col-sm-12 co-lg-auto pb-3 pb-md-0">
                <div className="my-auto">
                    <Icon path={logoFull} className="w-100"/>
                </div>
            </div>
            <div className="col-sm-12 col-lg">
               <div className="row justify-content-end">
                   <div className="col-12 col-md-auto py-1">
                       <Step title="DATOS PERSONALES" number="1" disabled={false} isHeader={true} isReady={ready.one}/>
                   </div>
                   <div className="col-12 col-md-auto py-1">
                       <Step title="DATOS DE ENVÍO" number="2" disabled={!ready.one} isHeader={true} isReady={ready.two}/>
                   </div>
                   <div className="col-12 col-md-auto py-1">
                       <Step title="PAGO" number="3" disabled={true} isHeader={true} isReady={ready.three}/>
                   </div>
               </div>
            </div>
        </div>
    );
};

export default Header
