import React from "react";

const bigVariant = {
    width: '3rem',
    height: '3rem'
}

export const SpinnerBorderPrimary = ({big}) => (
    <div className="d-flex justify-content-center">
        <div className="spinner-border text-primary" style={big ? bigVariant : {}} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

export const SpinnerBorderSecondary = ({big}) => (
    <div className="d-flex justify-content-center">
        <div className="spinner-border text-secondary" style={big ? bigVariant : {}} role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);
