import React from 'react';

import pastillas from '../../../assets/images/icons/navbar/pastillas.svg'
import masculino from '../../../assets/images/icons/navbar/masculino.svg'
import testEmbarazo from '../../../assets/images/icons/navbar/test-embarazo.svg'
import emergencia from '../../../assets/images/icons/navbar/emergencia.svg'
import jeringa from '../../../assets/images/icons/navbar/jeringa.svg'
import anticonceptivo from '../../../assets/images/icons/navbar/anticonceptivo.svg'
import femenino from '../../../assets/images/icons/navbar/femenino.svg'
import HeaderNavbarItem from "../../components/HeaderNavbarItem";

const HeaderNavbar = () =>{
    return (
        <div className="header-navbar bg-0869A6">
            <div className="container">
                <div className="row">

                    <HeaderNavbarItem icon={pastillas} text={`Pastillas`} />
                    <HeaderNavbarItem icon={masculino} text={`Masculino`} />
                    <HeaderNavbarItem icon={testEmbarazo} text={`Test de Embarazo`} />
                    <HeaderNavbarItem icon={emergencia} text={`Anticoncepción De Emergencia`} />
                    <HeaderNavbarItem icon={jeringa} text={`Duración largo Plazo`} />
                    <HeaderNavbarItem icon={anticonceptivo} text={`Métodos Alternativos`} />
                    <HeaderNavbarItem icon={femenino} text={`Salud Femenina`} />

                </div>
            </div>
        </div>
    );
};

export default HeaderNavbar
