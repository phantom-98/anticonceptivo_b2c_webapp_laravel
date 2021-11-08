import React from 'react';
import { Card } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';
import Collapsible from 'react-collapsible';
import UseWindowDimensions from "../../../components/customHooks/UseWindowDimensions";

const FaqAnswers = ({faqs}) => {

    const { height, width } = UseWindowDimensions();

    const triggerStyle = {
        fontSize: width >= 768 ? 16 : 14,
        fontFamily: 'Poppins, sans - serif !important',
        textDecoration: 'underline',
        color: '#224F6B',
    }

    return(
            faqs.map((item, index) => {
                let questionKey = uuidv4();
                return (
                    <Card key={questionKey} className="my-4" style={{borderRadius: 15}}> 
                        <Card.Body> 
                            <Collapsible 
                                key={questionKey} 
                                trigger={`${item.question}`}
                                transitionTime={300}
                                triggerStyle={triggerStyle}
                            >
                                <div className="mt-3 font-poppins" style={{ fontSize: width >= 768 ? 14 : 12, color: '#949494'}} dangerouslySetInnerHTML={{ __html: item.answer }} />
                            </Collapsible>
                        </Card.Body> 
                    </Card> 
                )
            })
        
        
    );
}

export default FaqAnswers;