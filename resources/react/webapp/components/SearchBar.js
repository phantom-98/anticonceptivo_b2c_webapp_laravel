import React from 'react';

const SearchBar = () => {
    return (
        <div className="input-group search-filter-button mb-3">
            <input type="text" className="form-control form-control-custom" placeholder="¿Que estás buscando?"/>
            <div className="input-group-append">
                <button className="btn btn-secondary" type="button">
                    <img src="/themes/web/assets/images/icons/search-white.svg" rel="nofollow"/>
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
