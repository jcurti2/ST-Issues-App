import { React, useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'

const LightRailStations = () => {

    const [trainStopInfo, setTrainStopInfo] = useState()
    const [trainStops, setTrainStops] = useState()

    const getTrainStops = async () => {
        let res = await axios.get(`https://api.pugetsound.onebusaway.org/api/where/stops-for-route/40_100479.json?key=28080be6-8167-4a43-b188-e40b6d354ff9`)
        const stops = res.data.data.references.stops
        console.log(stops);
        setTrainStops(stops);
    }

    const getTrainStopInfo = async (trainStop) => {
        let res = await axios.get(`https://api.pugetsound.onebusaway.org/api/where/arrivals-and-departures-for-stop/${trainStop.id}.json?key=28080be6-8167-4a43-b188-e40b6d354ff9`)
        let time = res.data.data.entry.arrivalsAndDepartures

        setTrainStopInfo(time)
    }

    useEffect(() => {
        getTrainStops()
    }, [])

    return (
        <div>
            <div className="row align-items-start">
                <div className="col">
                    <div className="dropdown">

                        <button className='btn btn-light dropdown-toggle' type="button" data-bs-toggle="dropdown" aria-expanded="false">Train Stations</button>

                        <ul className="dropdown-menu">

                            {trainStops && trainStops.sort((a, b) => a.name.localeCompare(b.name)).map((trainStop) => (
                                <li className='dropdown-item' onClick={() => getTrainStopInfo(trainStop)}>{trainStop.name} {trainStop.direction}
                                </li>
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
            <div className="col">
                <div>
                    {trainStopInfo && trainStopInfo.map((trainStopInfo) => (
                        <div classname='trainTime' key={trainStopInfo.tripId}>
                            {trainStopInfo.predictedArrivalTime > 0 && (moment(trainStopInfo.predictedArrivalTime).format("dddd, Do MMM YYYY, h:mm A"))}
                        </div>
                        //would like to only show upcoming trains, not past trains.
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LightRailStations
