import React, {useContext} from 'react';
import { Card } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import Collapsible from 'react-collapsible';
import { AppContext } from "../../../context/AppProvider";
import {BREAKPOINTS} from "../../../helpers/vars";

const FaqAnswers = ({faqs}) => {
    const {breakpoint} = useContext(AppContext)

    const triggerStyle = {
        fontSize: breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? 16 : 14,
        fontFamily: 'Poppins, sans - serif !important',
        textDecoration: 'underline',
        color: '#033F5D',
    }

    return(
            faqs.map((item, index) => {
                let questionKey = uuidv4();
                return (
                    <Card key={questionKey} className="my-2" style={{borderRadius: 15}}>
                        <Card.Body>
                            <Collapsible
                                key={questionKey}
                                trigger={`${item.question}`}
                                transitionTime={300}
                                triggerStyle={triggerStyle}
                            >
                                <div className="mt-3 font-poppins" style={{ fontSize: breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? 14 : 12, color: '#6C6B6B'}} dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </Collapsible>
                        </Card.Body>
                    </Card>
                )
            })


    );
}

export default FaqAnswers;
