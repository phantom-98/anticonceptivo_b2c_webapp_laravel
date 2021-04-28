import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Card} from "react-bootstrap";
import moment from "moment";

const DayGrid = ({dateClick}) => {

    return (
        <div className="row">
            <div className="col-12">
                <div className="mb-3">
                    <Card>
                        <Card.Body>
                            <div className="dataByMonthCanvas">
                                <FullCalendar
                                    viewClassNames="dataByMonth"
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    initialView={"dayGridMonth"}
                                    events={[]}
                                    headerToolbar={{
                                        left: 'prev',
                                        center: 'title',
                                        right: 'next'
                                    }}
                                    firstDay={1}
                                    selectable={true}
                                    dateClick={dateClick}
                                    locale={'es'}
                                    validRange={{
                                        start: moment().format('YYYY-MM-DD'),
                                    }}

                                />
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
        ;
};

export default DayGrid;
