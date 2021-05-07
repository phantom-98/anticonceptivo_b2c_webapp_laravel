import React, {useState} from 'react';

const QuantityInput = ({quantity, setQuantity}) => {



    const handleQuantity = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value)) {
            setQuantity(value)
        }
    }

    const addQuantity = () => {
        if (quantity <= 99) {
            setQuantity(quantity + 1)
        }
    }

    const subtractQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    return (
        <div className="quantity-input">
            <div className="quantity-input-button" onClick={subtractQuantity}>
                -
            </div>
            <div className="quantity-input-field">
                <input type="text" min="0" max="100" value={quantity} onChange={handleQuantity}/>
            </div>
            <div className="quantity-input-button" onClick={addQuantity}>
                +
            </div>
        </div>
    );
};

export default QuantityInput
