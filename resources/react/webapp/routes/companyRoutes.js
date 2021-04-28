import React from 'react';

import BaseTemplate from "../template";
import CompanyMiddleware from "./middleware/CompanyMiddleware";

import DummyComponent from '../pages/private/DummyComponent';
import PaymentTasks from "../pages/private/Company/Payments/PaymentTasks";
import Payments from "../pages/private/Company/Payments";
import ProfessionalAvailability from "../pages/private/Company/ProfessionalDetail/ProfessionalAvailability";
import ProfessionalContact from "../pages/private/Company/ProfessionalDetail/ProfessionalContact";
import ProfessionalProfile from "../pages/private/Company/ProfessionalDetail/ProfessionalProfile";
import Professionals from "../pages/private/Company/Professionals";
import Dashboard from "../pages/private/Company/Dashboard";
import GlobalChat from "../pages/private/Company/GlobalChat";
import Projects from "../pages/private/Company/Projects";
import CreateProject from "../pages/private/Company/Projects/CreateProject";
import ShowProject from "../pages/private/Company/Projects/ShowProject";
import Quotations from "../pages/private/Company/Quotations";
import ShowQuotation from "../pages/private/Company/Quotations/ShowQuotation";
import OrderPay from "../pages/private/Company/Payments/OrderPay";
import BaseNoLayout from "../template/BaseNoLayout";
import CompleteProfile from "../pages/private/Company/CompleteProfile";
import Completed from "../pages/private/Company/CompleteProfile/Completed";
import Notifies from "../pages/private/Company/Notifies";
import OfflineEvaluation from "../pages/private/Company/OfflineEvaluation";
import Account from "../pages/private/Company/Account";

const PANEL_COMPANY_ROUTES = {
    ACCOUNT_PERSONAL_INFO: {
        path: "/panel/empresa/cuenta/informacion-empresarial",
        title: "Información Empresarial",
        exact: true,
        component: props => <Account {...props} page="personal" />,
        layout: props => <BaseTemplate {...props} menu="company" />,
        middleware: props => <CompanyMiddleware {...props} />
    },
    ACCOUNT_PERSONAL_PASSWORD: {
        path: "/panel/empresa/cuenta/cambiar-contrasena",
        title: "Cambiar Contraseña",
        exact: true,
        component: props => <Account {...props} page="password" />,
        layout: props => <BaseTemplate {...props} menu="company" />,
        middleware: props => <CompanyMiddleware {...props} />
    },
    ACCOUNT_AGENT_INFO: {
        path: "/panel/empresa/cuenta/informacion-representante",
        title: "Información Representante",
        exact: true,
        component: props => <Account {...props} page="agent" />,
        layout: props => <BaseTemplate {...props} menu="company" />,
        middleware: props => <CompanyMiddleware {...props} />
    },
    ACCOUNT_BILLING_INFO: {
        path: "/panel/empresa/cuenta/informacion-facturacion",
        title: "Información Bancaría",
        exact: true,
        component: props => <Account {...props} page="bank-info" />,
        layout: props => <BaseTemplate {...props} menu="company" />,
        middleware: props => <CompanyMiddleware {...props} />
    },
    OFFLINE_EVALUATIONS: {
        path: "/panel/empresa/offline-validation/:token",
        title: "Tareas",
        exact: true,
        component: OfflineEvaluation,
        layout: props => <BaseNoLayout {...props} bg="one"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PAYMENT_TASKS: {
        path: "/panel/empresa/profesionales/mis-pagos/:orderId/tareas",
        title: "Tareas",
        exact: true,
        component: PaymentTasks,
        layout: props => <BaseTemplate {...props} menu="company" />,
        middleware: props => <CompanyMiddleware {...props} />
    },
    GLOBAL_CHAT: {
        path: "/panel/empresa/mensajes",
        title: "Mensajes",
        exact: true,
        component: GlobalChat,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    NOTIFIES: {
        path: "/panel/empresa/notificaciones",
        title: "Notificaciones",
        exact: true,
        component: Notifies,
        layout: props => <BaseTemplate {...props} menu="company" />,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PAYMENTS: {
        path: "/panel/empresa/mis-pagos",
        title: "Pagos",
        exact: true,
        component: Payments,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    QUOTATIONS: {
        path: "/panel/empresa/solicitudes",
        title: "Solicitudes",
        exact: true,
        component: Quotations,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    QUOTATIONS_SHOW: {
        path: "/panel/empresa/solicitudes/:quotation_id",
        title: "Detalle de la solicitud",
        exact: true,
        component: ShowQuotation,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PROJECTS: {
        path: "/panel/empresa/mis-objetivos",
        title: "Objetivos",
        exact: true,
        component: Projects,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PROJECTS_CREATE: {
        path: "/panel/empresa/mis-objetivos/nuevo-objetivo",
        title: "Nuevo Objetivo",
        exact: true,
        component: CreateProject,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PROJECTS_SHOW: {
        path: "/panel/empresa/mis-objetivos/:project_id",
        title: "Detalle del objetivo",
        exact: true,
        component: ShowProject,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    COMPLETE_PROFILE: {
        path: "/panel/empresa/completar-perfil",
        title: "Completar perfil",
        exact: true,
        component: CompleteProfile,
        layout: props => <BaseNoLayout {...props} bg="none"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    COMPLETED_PROFILE: {
        path: "/panel/empresa/perfil-completado",
        title: "Perfil Completado",
        exact: true,
        component: Completed,
        layout: props => <BaseNoLayout {...props} bg="one"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PROFESSIONAL_AVAILABILITY: {
        path: "/panel/empresa/profesionales/:username/disponibilidad",
        title: "Disponibilidad",
        exact: true,
        component: ProfessionalAvailability,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PROFESSIONAL_CONTACT: {
        path: "/panel/empresa/profesionales/:username/contacto",
        title: "Contacto",
        exact: true,
        component: ProfessionalContact,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PROFESSIONAL_PROFILE_REDIRECT: {
        path: "/panel/empresa/profesionales/:username",
        title: "Perfil",
        exact: true,
        component: ProfessionalProfile,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PROFESSIONAL_PROFILE: {
        path: "/panel/empresa/profesionales/:username/perfil",
        title: "Perfil",
        exact: true,
        component: ProfessionalProfile,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    PROFESSIONAL_LIST: {
        path: "/panel/empresa/profesionales",
        title: "Profesionales",
        exact: true,
        component: Professionals,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    ORDER_PAY: {
        path: "/panel/empresa/pagar/:orderAuthToken",
        title: "Pagar Orden",
        exact: true,
        component: OrderPay,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    },
    DASHBOARD: {
        path: "/panel/empresa/",
        title: "Inicio",
        exact: true,
        component: Professionals,
        layout: props => <BaseTemplate {...props} menu="company"/>,
        middleware: props => <CompanyMiddleware {...props} />
    }
};

export default PANEL_COMPANY_ROUTES;
