import React, {useState} from 'react';

const SearchBar = ({setSearch}) => {

    const [localSearch, setLocalSearch] = useState('');

    const sendSearch = () => {
        setSearch(localSearch)
    }

    return (

        <form onSubmit={(e) => {
            e.stopPropagation()
            e.preventDefault()
            sendSearch()
        }}>
            <div className="input-group search-filter-button mb-3">
                <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="¿Que estás buscando?"
                    value={localSearch}
                    onChange={(e) => {
                        setLocalSearch(e.target.value)
                        if ((e.target.value).length === 0) {
                            sendSearch()
                        }
                    }}
                />
                <div className="input-group-append">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={sendSearch}
                    >
                        <img src="/themes/web/assets/images/icons/search-white.svg" rel="nofollow"/>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
