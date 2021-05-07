import React from 'react';
import ReactDOM from 'react-dom';
import H3Panel from "../../../../components/general/H3Panel";

const PrivacyPolicies = () => {

    return (
        <div className="row">

            <H3Panel title="POLÍTICAS DE PRIVACIDAD"/>

            <div className="col-md-12">
                <p className="font-poppins font-14 regular color-484848">
                    Entendemos qué tu privacidad es importante, por lo que nuestro sitio posee los más altos estándares
                    de seguridad. Todos los datos que nos proporcionas se transmiten encriptados a nuestro servidor, el
                    cual posee las más altas barreras y medidas de protección, para así evitar cualquier alteración,
                    pérdida o acceso no autorizado a los mismos.
                </p>
                <p className="font-poppins font-14 regular color-484848">
                    Todos los contenidos incluidos en el Sitio (incluyendo textos, fotografías, imágenes, formularios,
                    videos, sonidos, entre otros) son propiedad exclusiva de ChileSale.
                </p>
                <p className="font-poppins font-14 regular color-484848">
                    ChileSale es una marca registrada y su uso está estrictamente prohibido para aquellos que no estén
                    expresamente autorizados por sus respectivos titulares (ya sea el uso de logotipos, marcas
                    comerciales,
                    patentes y de chilesale.cl).
                </p>
                <p className="font-poppins font-14 regular color-484848">
                    Somos propietarios de las licencias exclusivas de las marcas Eisen, Hallo y Koth Motors para su
                    importación, venta y distribución en Chile, toda venta al mayor de la marca debe ser autorizado por
                    ChileSale. Garantizamos la calidad de nuestros productos en sus más altos estándares de calidad, por
                    ende, la venta de terceros de productos o parciales de las marcas antes mencionadas no entrarán en
                    garantía.
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicies
