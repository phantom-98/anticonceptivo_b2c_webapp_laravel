import React from 'react';

import {Redirect} from "react-router-dom";
import BaseTemplate from "../template";
import ProfessionalMiddleware from "./middleware/ProfessionalMiddleware";

import DummyComponent from "../pages/private/DummyComponent";
import Profile from "../pages/private/Professional/Profile";
import Schedule from "../pages/private/Professional/Schedule";
import Payments from "../pages/private/Professional/Payments";
import Account from "../pages/private/Professional/Account";
import Dashboard from "../pages/private/Professional/Dashboard";
import Projects from "../pages/private/Professional/Projects";
import ShowProject from "../pages/private/Professional/Projects/ShowProject";
import Quotations from "../pages/private/Professional/Quotations";
import ShowQuotation from "../pages/private/Professional/Quotations/ShowQuotation";
import GlobalChat from "../pages/private/Professional/GlobalChat";
import BaseNoLayout from "../template/BaseNoLayout";
import CompleteProfile from "../pages/private/Professional/CompleteProfile";
import Completed from "../pages/private/Professional/CompleteProfile/Completed";
import CreateLiquidation from "../pages/private/Professional/Payments/CreateLiquidation";
import LiquidationDetail from "../pages/private/Professional/Payments/LiquidationDetail";
import OfflineEvaluation from "../pages/private/Professional/OfflineEvaluation";
import Notifies from "../pages/private/Professional/Notifies";


const PANEL_PROFESSIONAL_ROUTES = {
    GLOBAL_CHAT: {
        path: "/panel/profesional/mensajes",
        title: "Mensajes",
        exact: true,
        component: GlobalChat,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    NOTIFIES: {
        path: "/panel/profesional/notificaciones",
        title: "Notificaciones",
        exact: true,
        component: Notifies,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    PAYMENTS: {
        path: "/panel/profesional/pagos",
        title: "Pagos",
        exact: true,
        component: Payments,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    LIQUIDATIONS_CREATE: {
        path: "/panel/profesional/pagos/crear-liquidacion",
        title: "Solicitar Pagos",
        exact: true,
        component: CreateLiquidation,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    LIQUIDATIONS_DETAILS: {
        path: "/panel/profesional/pagos/:liquidation_id",
        title: "Detalle Solicitud de Pago",
        exact: true,
        component: LiquidationDetail,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    SCHEDULES: {
        path: "/panel/profesional/disponibilidad",
        title: "Mi Agenda",
        exact: true,
        component: Schedule,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    QUOTATIONS: {
        path: "/panel/profesional/solicitudes",
        title: "Solicitudes",
        exact: true,
        component: Quotations,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    QUOTATIONS_SHOW: {
        path: "/panel/profesional/solicitudes/:quotation_id",
        title: "Detalle de la solicitud",
        exact: true,
        component: ShowQuotation,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    PROJECTS: {
        path: "/panel/profesional/mis-objetivos",
        title: "Objetivos",
        exact: true,
        component: Projects,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    PROJECTS_SHOW: {
        path: "/panel/profesional/mis-objetivos/:project_id",
        title: "Detalle del objetivo",
        exact: true,
        component: ShowProject,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    ACCOUNT_PERSONAL_INFO_REDIRECT: {
        path: "/panel/profesional/cuenta",
        title: "Información Personal",
        exact: true,
        component: props => (
            <Redirect to="/panel/profesional/cuenta/informacion-personal" />
        ),
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    ACCOUNT_PERSONAL_INFO: {
        path: "/panel/profesional/cuenta/informacion-personal",
        title: "Información Personal",
        exact: true,
        component: props => <Account {...props} page="personal" />,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    ACCOUNT_PERSONAL_PASSWORD: {
        path: "/panel/profesional/cuenta/cambiar-contrasena",
        title: "Cambiar Contraseña",
        exact: true,
        component: props => <Account {...props} page="password" />,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    ACCOUNT_PERSONAL_BANK: {
        path: "/panel/profesional/cuenta/informacion-bancaria",
        title: "Información Bancaría",
        exact: true,
        component: props => <Account {...props} page="bank-info" />,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    ACCOUNT_PERSONAL_CLOSE_ACCOUNT: {
        path: "/panel/profesional/cuenta/cerrar-cuenta",
        title: "Cerrar Cuenta",
        exact: true,
        component: props => <Account {...props} page="close-account" />,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    OFFLINE_EVALUATIONS: {
        path: "/panel/profesional/offline-validation/:token",
        title: "Tareas",
        exact: true,
        component: OfflineEvaluation,
        layout: props => <BaseNoLayout {...props} bg="one"/>,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    PROFILE: {
        path: "/panel/profesional/perfil",
        title: "Mi Perfil",
        exact: true,
        component: Profile,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    COMPLETE_PROFILE: {
        path: "/panel/profesional/completar-perfil",
        title: "Completar perfil",
        exact: true,
        component: CompleteProfile,
        layout: props => <BaseNoLayout {...props} bg="none"/>,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    COMPLETED_PROFILE: {
        path: "/panel/profesional/perfil-completado",
        title: "Perfil Completado",
        exact: true,
        component: Completed,
        layout: props => <BaseNoLayout {...props} bg="one"/>,
        middleware: props => <ProfessionalMiddleware {...props} />
    },
    DASHBOARD: {
        path: "/panel/profesional/perfil",
        title: "Inicio",
        exact: true,
        component: Profile,
        layout: props => <BaseTemplate {...props} menu="professional" />,
        middleware: props => <ProfessionalMiddleware {...props} />
    }
};

export default PANEL_PROFESSIONAL_ROUTES;
