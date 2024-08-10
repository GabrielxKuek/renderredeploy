import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ logs, title }) => {

    const creationLogs = logs.creationLogs;
    const modificationLogs = logs.modificationLogs;
    const deletionLogs = logs.deletionLogs;

    const barRef = useRef(null);
    const barInstance = useRef(null);

    // Stacked bar chart
    useEffect(() => {      
         
        if (barInstance.current) {
            barInstance.current.destroy();
        }
        const myBarRef = barRef.current.getContext('2d');

        barInstance.current=new Chart(myBarRef, {
            type: 'bar',
            data: {
                labels: ["Request Type"],
                datasets:[
                    {
                        label: "POST",
                        backgroundColor: "rgb(255, 99, 132)",
                        data: [creationLogs.length]
                    },
                    {
                        label: "PUT",
                        backgroundColor: "rgb(54, 162, 235)",
                        data: [modificationLogs.length]
                    },
                    {
                        label: "DELETE",
                        backgroundColor: "rgb(255, 205, 86)",
                        data: [deletionLogs.length]
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: title
                    }
                }
            }  
        }) 
    })

    return (
        <>
            <canvas ref={barRef} style={{width:"100px", height:"110px"}}/>
        </>
    )
}

export default BarChart;