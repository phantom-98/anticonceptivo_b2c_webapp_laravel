import React, {useState, useRef, useEffect, Fragment, useContext} from 'react';
import ReactDOM from 'react-dom';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import toastr from 'toastr';
import * as Services from "../../../../Services";
import {getShortSpanishDayName} from "../../../../helpers/HelperSchedule";
import { AuthContext } from "../../../../context/AuthProvider";


const Schedules = () => {

    const {auth} = useContext(AuthContext);

    const timeGridDay = useRef();
    const [schedules, setSchedules] = useState([]);

    const [week, setWeek] = useState(1);

    useEffect(() =>{
        index()
    }, [])

    const selectSlot = (e) => {
        // console.log(e);

        const slot = {
            id: Math.floor(Math.random() * 1000000001),
            title: 'Disponible',
            start: moment(e.startStr).format('YYYY-MM-DD HH:mm:ss'),
            // end: moment(e.endStr).format('YYYY-MM-DD HH:mm:ss'),
        };
        // console.log(o);
        setSchedules([
            ...schedules,
            slot
        ])
    }

    const UnSelectSlot = e => {
        const start = moment(e.event.start).format('YYYY-MM-DD HH:mm:ss')
        const list = schedules.filter(d => d.start != start);
        setSchedules(list)
    }

    const renderInitialSlots = (slots) => {

        let startOfWeek = moment().startOf('isoWeek');
        let endOfWeek = moment().endOf('isoWeek');

        let days = [];

        while (startOfWeek <= endOfWeek) {
            days.push({
                keyDay : startOfWeek.weekday(),
                date : startOfWeek,
                formatDate : startOfWeek.format('YYYY-MM-DD HH:mm:ss')
            });
            startOfWeek = startOfWeek.clone().add(1, 'd');
        }


        let slotTemp = []

        slots.map(slot => {

            // const date = days.find(d => d.keyDay === slot.key_day)

            slotTemp.push({
                id: Math.floor(Math.random() * 1000000001),
                title: 'Disponible',
                start: slot.start_at,
                color: '#5B32B7',
                // end: moment(e.endStr).format('YYYY-MM-DD HH:mm:ss'),
            })
        })

        setSchedules(slotTemp)
        // console.log(days);
    }

    const index = () =>{
        const data = {
            professional_id: auth.professional_id,
        }
        Services.DoPost(Services.ENDPOINT.PANEL.PROFESSIONAL.SCHEDULES.GET_LIST, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    // console.log(response.data.slots);
                    renderInitialSlots(response.data.professional_schedules)
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const store = () =>{
        const data = {
            professional_id: auth.professional_id,
            professional_schedules : schedules
        }
        Services.DoPost(Services.ENDPOINT.PANEL.PROFESSIONAL.SCHEDULES.UPDATE_SLOTS, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    // console.log(response.data);
                    toastr.success('Horario actualizado')
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const dayHeaderContent = (args) => {
        const day = moment(args.date).weekday()
        return getShortSpanishDayName(day) + ' ' + moment(args.date).locale('es').format('DD-MMM')
     }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 px-3 pb-3" style={{width: '100%'}}>
                    <FullCalendar
                        // eventClick={eventClick}
                        dayHeaderContent={dayHeaderContent}
                        ref={timeGridDay}
                        plugins={[timeGridPlugin, interactionPlugin]}
                        initialView="timeGridWeek"
                        viewClassNames="timeGridDay"
                        height="600px"
                        customButtons={{
                            nextWeek: {
                                text: <i className="fa fa-chevron-right" />,
                                click: function() {
                                    timeGridDay.current.getApi().next();
                                    setWeek(2);
                                },
                            },
                            prevWeek: {
                                text: <i className="fa fa-chevron-left" />,
                                click: function() {
                                    timeGridDay.current.getApi().prev();
                                    setWeek(1);
                                },
                            },
                        }}
                        headerToolbar={{
                            left: week == 2 ? 'prevWeek' : '',
                            center: 'title',
                            right: week == 1 ? 'nextWeek' : ''
                        }}
                        select={selectSlot}
                        events={schedules}
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
                        // scrollTime="08:00:00"
                        locale={'es'}
                        firstDay={1}
                        eventClick={UnSelectSlot}
                        // forceEventDuration={true}
                        // weekNumbers={true} para ver el numero de la semana
                        allDaySlot={false}
                        selectable={true}
                        slotDuration="01:00:00"
                        // slotWidth={200}
                        eventContent={(arg) => {
                            return <div className={`row font-signika font-12 h-100 px-3`}>
                                <div className="col-auto d-flex">
                                    <div className="my-auto">
                                        {moment(arg.event.start).format('HH:mm')} - {arg.event.title}
                                    </div>
                                </div>
                            </div>
                        }}
                    />
                </div>
            </div>

            <div className="row pt-4">
                <div className="col-md-4 offset-4">
                    <div className="form-group text-center">
                        <button className="btn btn-primary btn-rounded btn-form" onClick={store}>
                            <span className="font-12 regular">Guardar</span>
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Schedules;
