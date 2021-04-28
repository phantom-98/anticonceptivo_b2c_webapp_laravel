import React, {Fragment, useEffect, useRef, useState} from 'react';
import * as Services from "../../../../../../Services";
import moment from "moment";
import DayGrid from "./DayGrid";
import TimeGrid from "./TimeGrid";
import Resume from "./Resume";

const Calendars = ({professionalId, priceHour, schedulesToBuy, setSchedulesToBuy, confirmHours}) => {

    const timeGridDay = useRef();

    const [weeklySchedules, setWeeklySchedules] = useState([]);

    useEffect(() => {
        getCalendar()
    }, [professionalId])


    useEffect(() => {
        const list = weeklySchedules.filter(w => w.selected == true)
        setSchedulesToBuy(list);
    }, [weeklySchedules])

    const getCalendar = (date = null) => {

        let url =
            Services.ENDPOINT.PANEL.COMPANY.PROFESSIONALS.GET_PROFESSIONAL_SCHEDULE;

        let params = {
            professional_id: professionalId,
            date: date ? date : moment().format('YYYY-MM-DD'),
        }

        Services.DoPost(url, params).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    renderSchedules(response.data.weekly_schedules)
                }
            });
        }).catch(error => {
            console.log(error);
        });
    }

    const dateClick = (e) => {
        getCalendar(e.dateStr)
        timeGridDay.current.getApi().changeView('timeGridDay', (e.dateStr));
    }

    const renderSchedules = (weeklySchedules) => {
        let list = [];

        weeklySchedules.map(ws => {

            list.push(
                {
                    id: Math.floor(Math.random() * 1000000001),
                    start: ws.start_date,
                    // end: moment(ws.start_date).add(60, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
                    editable: !ws.busy,
                    title: ws.busy ? 'No disponible' : 'Disponible',
                    busy: ws.busy,
                    color: ws.busy ? '#EFEAF4' : '#5B32B7',
                    selected: false,
                }
            )
        })

        setWeeklySchedules(list)
    }

    const setToBought = (dateSelected, action) => {

        const date = moment(dateSelected).format('YYYY-MM-DD HH:mm:ss')

        const list = weeklySchedules.map(ws => {

            if (ws.start == date) {
                return {
                    ...ws,
                    selected: action,
                    color: action ? '#F7B589' : '#5B32B7'
                }
            }
            return ws;
        })
        setWeeklySchedules(list);

    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-4">
                    <DayGrid dateClick={dateClick}/>
                </div>
                <div className="col-8">
                    <TimeGrid timeGridDay={timeGridDay}
                              weeklySchedules={weeklySchedules}
                              setToBought={setToBought}>

                        <Resume priceHour={priceHour} schedulesToBuy={schedulesToBuy} confirmHours={confirmHours}/>
                    </TimeGrid>
                </div>
            </div>
        </Fragment>
    );
};

export default Calendars;
