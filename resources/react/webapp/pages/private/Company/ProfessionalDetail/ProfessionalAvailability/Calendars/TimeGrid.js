import React from 'react';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Card} from "react-bootstrap";

const TimeGrid = ({timeGridDay, weeklySchedules, setToBought, children}) => {

    return (
        <div className="row">
            <div className="col-12">
                <div className="mb-3">
                    <Card>
                        <Card.Body>
                            <div className="row">
                                <div className="col-12">
                                    <FullCalendar
                                        ref={timeGridDay}
                                        plugins={[timeGridPlugin, interactionPlugin]}
                                        initialView="timeGridDay"
                                        viewClassNames="timeGridDay"
                                        headerToolbar={{
                                            left: '',
                                            center: 'title',
                                            right: ''
                                        }}
                                        events={weeklySchedules}
                                        eventTimeFormat={{ // like '14:30:00'
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            meridiem: false
                                        }}
                                        slotLabelFormat={{
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            // meridiem: 'long',
                                            // hour12: true,

                                        }}
                                        height="380px"
                                        scrollTime="10:00:00"
                                        locale={'es'}
                                        allDaySlot={false}
                                        selectable={true}
                                        slotDuration="01:00:00"
                                        eventContent={(arg) => {

                                            let busy = false;
                                            let selected = false;

                                            if (arg.event.extendedProps.busy) {
                                                busy = arg.event.extendedProps.busy;
                                            }

                                            if (arg.event.extendedProps.selected) {
                                                selected = arg.event.extendedProps.selected;
                                            }

                                            return <div className={`row font-signika font-12 h-100 px-3`}>
                                                <div className="col-auto d-flex">
                                                    <div className="my-auto">
                                                        {arg.event.title}
                                                    </div>
                                                </div>
                                                <div className="col d-flex">

                                                    {
                                                        !busy ? <div className="my-auto ml-auto">
                                                            {
                                                                selected ?
                                                                    <div className="select-event-schedule"
                                                                         onClick={() => setToBought(arg.event.start, false)}>Deseleccionar</div>
                                                                    :
                                                                    <div className="select-event-schedule"
                                                                         onClick={() => setToBought(arg.event.start, true)}>Seleccionar</div>
                                                            }
                                                        </div> : null
                                                    }
                                                </div>
                                            </div>
                                        }}
                                    />
                                </div>
                                <div className="col-12">
                                    {
                                        children
                                    }
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>

    );
};

export default TimeGrid;
