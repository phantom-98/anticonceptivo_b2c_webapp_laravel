import React from "react";


export const formatProjectStatus = (TYPE) => {
    switch (TYPE) {
        case "CREATED":
            return <span className="badge badge-info">CREADO</span>;
        case "APPROVED":
            return <span className="badge badge-success">APROBADO</span>;
        case "REJECTED":
            return <span className="badge badge-danger">RECHAZADO</span>;
        case "CANCELED":
            return <span className="badge badge-danger">CANCELADO</span>;
        case "ACCEPTED":
            return <span className="badge badge-info">INICIADO</span>;
        case "IN_PROGRESS":
            return <span className="badge badge-warning">EN PROGRESO</span>;
        case "FINISHED":
            return <span className="badge badge-success">TERMINADO</span>;
        default:
            return <span className="badge badge-secondary">SIN ESTADO</span>;
    }
}

export const formatQuotationStatus = TYPE => {
    switch (TYPE) {
        case "CREATED":
            return <span className="badge badge-info">ENVIADA</span>;
        case "CANCELED":
            return <span className="badge badge-danger">CANCELADA</span>;
        case "REJECTED":
            return <span className="badge badge-danger">RECHAZADA</span>;
        case "ACCEPTED":
            return <span className="badge badge-success">ACEPTADA</span>;
        case "EXPIRED":
            return <span className="badge badge-warning">EXPIRADA</span>;
        case "PAID":
            return <span className="badge badge-success">PAGADA</span>;
        default:
            return <span className="badge badge-secondary">SIN ESTADO</span>;
    }
};

export const formatTaskStatus = (TYPE, icon = null) => {

    switch (TYPE) {
        case "TODO":
            return <span className="badge badge-info">PENDIENTE {icon}</span>;
        case "DOING":
            return <span className="badge badge-info">EN PROGRESO {icon}</span>;
        case "PAUSED":
            return <span className="badge badge-warning">PAUSADA {icon}</span>;
        case "DONE":
            return <span className="badge badge-success">REALIZADA {icon}</span>;
        case "IN_REVISION":
            return <span className="badge badge-info">EN REVISIÓN {icon}</span>;
        case "FINISHED":
            return <span className="badge badge-success">TERMINADA {icon}</span>;
        case "APPROVED":
            return <span className="badge badge-success">APROBADA {icon}</span>;
        case "REJECTED":
            return <span className="badge badge-danger">RECHAZADO {icon}</span>;
        case "NEED_FIX":
            return <span className="badge badge-warning">NECESITA CORRECCIÓN</span>;
        default:
            return <span className="badge badge-secondary">SIN ESTADO</span>;
    }
};

export const formatPaymentStatus = TYPE => {
    switch (TYPE) {
        case "CREATED":
            return <span className="badge badge-info">CREADA</span>;
        case "REJECTED":
            return <span className="badge badge-danger">RECHAZADA</span>;
        case "CANCELED":
            return <span className="badge badge-danger">CANCELADA</span>;
        case "PROCESSING":
            return <span className="badge badge-warning">EN PROCESO</span>;
        case "PAID":
            return <span className="badge badge-success">PAGADA</span>;
        case "WAITING":
            return <span className="badge badge-warning">EN ESPERA</span>;
        default:
            return <span className="badge badge-secondary">SIN ESTADO</span>;
    }
};
