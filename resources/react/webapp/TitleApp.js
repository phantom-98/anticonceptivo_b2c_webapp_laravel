import {useEffect} from "react";
import {withRouter} from "react-router-dom";


const TitleApp = ({children, location: {pathname}}) => {
    // console.log('TitleApp', pathname);
    // useEffect(() => {
    //     const routes = Object.values(Routes);
    //     const path = (pathname).toString();
    //     let current = routes.find(r => r.URL === path);
    //     document.title = 'Ikiru | ' + (current ? current.TITLE : '');
    // }, [pathname]);

    return children;
};

export default withRouter(TitleApp);
