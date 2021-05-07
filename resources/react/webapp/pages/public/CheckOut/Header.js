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
            <div className="col-auto">
                <div className="my-auto">
                    <Icon path={logoFull}/>
                </div>
            </div>
            <div className="col">
               <div className="row justify-content-end">
                   <div className="col-auto">
                       <Step title="DATOS PERSONALES" number="1" disabled={false} isHeader={true} isReady={ready.one}/>
                   </div>
                   <div className="col-auto">
                       <Step title="DATOS DE ENVÍO" number="2" disabled={!ready.one} isHeader={true} isReady={ready.two}/>
                   </div>
                   <div className="col-auto">
                       <Step title="PAGO" number="3" disabled={true} isHeader={true} isReady={ready.three}/>
                   </div>
               </div>
            </div>
        </div>
    );
};

export default Header
