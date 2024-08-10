// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

const DataCard = ({ logs }) => {

    const requestLogs = logs.requestLogs;
    let logsPerMin = 0

    if (requestLogs.length > 0) {
        let dates = requestLogs.map(e => new Date(e.created_at));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        const timeDifference = Math.abs(maxDate - minDate);
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    
        logsPerMin = (requestLogs.length / minutesDifference).toPrecision(3)
    }
    return (
        <>
            <div className="card text-center">
                <div className="card-header">Requests per Minute</div>
                <div className="card-body bold">{logsPerMin} requests/min</div>
            </div>
        </>
    )
}

export default DataCard