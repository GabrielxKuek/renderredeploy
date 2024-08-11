import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ logs, title }) => {

    const creationLogs = logs.creationLogs.length;
    const modificationLogs = logs.modificationLogs.length;
    const deletionLogs = logs.deletionLogs.length;

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
                labels:["POST", "PUT", "DELETE"],
                datasets:[/*
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
                    }*/
                   {
                    data: [creationLogs, modificationLogs, deletionLogs],
                    backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"]
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
            <canvas ref={barRef} style={{width:"200px", height:"175px"}}/>
        </>
    )
}

export default BarChart;