import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ logs }) => {

    const creationLogs = logs.creationLogs.data;
    const modificationLogs = logs.modificationLogs.data;
    const deletionLogs = logs.deletionLogs.data;

    // console.log("objecttt", logs.creationLogs)
    // console.log("creationLogs", JSON.stringify(creationLogs));
    // console.log("modificationLogs", JSON.stringify(modificationLogs));
    // console.log("deletionLogs", JSON.stringify(deletionLogs));
    
    const lineRef = useRef(null);
    const lineInstance = useRef(null);
    
    creationLogs.map(e => {
        let date = new Date(e.created_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        e.created_at = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    })

    modificationLogs.map(e => {
        let date = new Date(e.created_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        e.created_at = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    })

    deletionLogs.map(e => {
        let date = new Date(e.created_at);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        e.created_at = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    })
  
    let dates = [...creationLogs.map(e=>e.created_at), ...modificationLogs.map(e=>e.created_at), ...deletionLogs.map(e=>e.created_at)];
    dates = [...new Set(dates)];
    dates = dates.sort((a, b) => new Date(a) - new Date(b));
    
    let creationData = []
    for (let d = 0, count = 0; d < dates.length; d++) {
        for (let i = 0; i < creationLogs.length; i++) {
            if (dates[d] == creationLogs[i].created_at) {
                count++
            }
        }
        creationData.push(count)
    }
    
    let modificationData = []
    for (let d = 0, count = 0; d < dates.length; d++) {
        for (let i = 0; i < modificationLogs.length; i++) {
            if (dates[d] == modificationLogs[i].created_at) {
                count++
            }
        }
        modificationData.push(count)
    }

    let deletionData = []
    for (let d = 0, count = 0; d < dates.length; d++) {
        for (let i = 0; i < deletionLogs.length; i++) {
            if (dates[d] == deletionLogs[i].created_at) {
                count++
            }
        }
        deletionData.push(count)
    }
    
    

    // Line chart
    useEffect(() => {
        if (lineInstance.current) {
            lineInstance.current.destroy();
        }
        const myLineRef = lineRef.current.getContext('2d');

        lineInstance.current=new Chart(myLineRef, {
            type: "line",
            data: {
                labels: dates,//["2024-03-04", "2024-03-05", "2024-03-06", "2024-03-07"],
                datasets: [
                    {    
                        label: 'POST',
                        data: creationData,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgb(255, 99, 132)'
                    },
                    {   
                        label: 'PUT',
                        data: modificationData,
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgb(54, 162, 235)'
                    },
                    {   
                        label: 'DELETE',
                        data: deletionData,
                        borderColor: 'rgb(255, 205, 86)',
                        backgroundColor: 'rgb(255, 205, 86)'
                    },
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Number of Requests by Type Over Time'
                    }
                }
            }  
        });
    
        return () => {
            if (lineInstance.current) {
                lineInstance.current.destroy(); 
            }
        }
    })

    return (
        <>
            <canvas ref={lineRef} style={{width:"400px", height:"100px"}}/>
        </>
    )
}

export default LineChart;