import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import StarView from "../StarView";
import * as Services from "../../Services";
import LazyLoading from "../LazyLoading";

const ProfessionalTasks = ({authId, orderId}) => {

    const [loaded, setLoaded] = useState(false);
    const [tasks, setTasks] = useState({});
    const [statuses, setStatuses] = useState([]);

    function MinuteToHours(minutes) {
        let duration = moment.duration(minutes, "minutes");
        return duration.hours();
    }

    useEffect(() => {
        index();
    }, []);

    const index = () => {
        let url = Services.ENDPOINT.PROFESSIONAL.QUOTATIONS.TASKS.GET_TASK;
        let data = {
            quotation_id: orderId,
            professional_id: authId
        };

        Services.DoPost(url, data).then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setTasks(response.data.tasks);
                        setStatuses(response.data.statuses)
                        setLoaded(true);
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    const handleStatus = (e, index) => {
        let list = [...tasks];
        let position = list.findIndex((o, i) => i === index);

        console.log(list);
        console.log(position);

        list[position] = {
            ...list[position],
            [e.target.name]: e.target.value
        };

        setTasks(list);
    };

    return loaded ? (
        tasks.map((task, index) => (
            <div className="row mb-4">
                <div className="col-8 mb-3">
                    <Card style={{ height: "100%" }}>
                        <Card.Body>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label className="font-14 bold text-primary">
                                        Nombre
                                    </label>
                                    <div className="font-12 light color-3B3B3B">
                                        {task.title}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="font-14 bold text-primary">
                                        Descripción
                                    </label>
                                    <div className="font-12 light color-3B3B3B">
                                        {task.description}
                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <Card>
                                <Card.Body>
                                    <div className="row">
                                        <div className="col-12 mb-3">
                                            <label className="font-14 bold text-primary">
                                                Evaluación
                                            </label>
                                            <div className="font-12 light color-3B3B3B mb-5">
                                                Todas estas borrascas que nos
                                                suceden son señales de que
                                                presto ha de serenar el tiempo y
                                                han de sucedernos bien las
                                                cosas; porque no es posible que
                                                el mal ni el bien sean durables,
                                                y de aquí.
                                            </div>
                                            <div className="mt-5">
                                                <StarView value={3} />
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col-4">
                            <div className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="font-14 bold text-primary">
                                                    Documento
                                                </label>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="font-12 light color-3B3B3B">
                                                            Ver Documento
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="text-right">
                                                            <img src="/themes/web/assets/images/Icon metro-file-empty.svg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="font-14 bold text-primary">
                                                    Horas
                                                </label>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="font-12 light color-3B3B3B">
                                                            {MinuteToHours(
                                                                task.total_minutes
                                                            )}{" "}
                                                            {MinuteToHours(
                                                                task.total_minutes
                                                            ) > 1
                                                                ? "Horas"
                                                                : "Hora"}
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="text-right">
                                                            <img src="/themes/web/assets/images/Icon feather-clock.svg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="mb-3">
                                <Card>
                                    <Card.Body>
                                        <div className="row">
                                            <div className="col-12 mb-3">
                                                <label className="font-14 bold text-primary">
                                                    Estado
                                                </label>
                                                <div className="font-12 light color-3B3B3B">
                                                    {/* {task.task_status.name} */}

                                                    <select
                                                        className="form-control form-control-custom"
                                                        id="task_status_id"
                                                        name="task_status_id"
                                                        value={
                                                            task.task_status.id
                                                        }
                                                        onChange={handleStatus}
                                                    >
                                                        {statuses
                                                            ? statuses.map(
                                                                  status => (
                                                                      <option
                                                                          key={
                                                                              status.id
                                                                          }
                                                                          value={
                                                                              status.id
                                                                          }
                                                                      >
                                                                          {
                                                                              status.name
                                                                          }
                                                                      </option>
                                                                  )
                                                              )
                                                            : null}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <LazyLoading />
    );
};

export default ProfessionalTasks;
