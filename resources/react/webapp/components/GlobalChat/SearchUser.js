import React from 'react';

const SearchUser = () => {
    return (
        <div className="row">
            <div className="col-12 mb-3">
                <img className="search-user-list-icon" src="/themes/web/assets/images/icons/search-user.svg" rel="nofollow"/>
                <input type="text" className="form-control search-user-list" placeholder="Buscar" />
            </div>
        </div>
    );
};

export default SearchUser;
