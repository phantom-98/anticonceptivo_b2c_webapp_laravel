import React from 'react';
import {Modal} from "react-bootstrap";
import CloseModal from "../../../components/general/CloseModal";
import Search from "./Search";

const SearchModal = ({showingSearch, hideSearch}) => {

    return (
        <Modal show={showingSearch}
               backdrop="static"
               keyboard={false}
               onHide={hideSearch}
               dialogClassName="search-modal">

        <Modal.Header>
            <CloseModal hideModal={hideSearch} />
            </Modal.Header>
            <Modal.Body className="px-2 mt-2">

                <div className="row">
                    <div className="col-12">
                        <Search/>
                    </div>
                </div>

            </Modal.Body>

        </Modal>
    );
}

export default SearchModal;