import React, {useEffect, useState} from 'react';
import ListItem from "./ListItem";
import Icon from "../../../../../components/general/Icon";
import plusIcon from '../../../../../assets/images/icons/plus-green.svg'

const List = ({addresses, showEdit, showCreate}) => {





    return (
        <div className="row">
            <div className="col-md-12 py-2">
                {
                    addresses.map((address, index) => (<ListItem key={index} address={address} showEdit={showEdit}/>))
                }
            </div>
            <div className="col-md-12">
                <Icon path={plusIcon} />  <span onClick={() => showCreate()} className="link pointer font-12 regular">Agregar nueva dirección</span>
            </div>
        </div>
    );
};

export default List
