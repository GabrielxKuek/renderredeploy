import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ logs }) => {

    const creationLogs = logs.creationLogs;
    const modificationLogs = logs.modificationLogs;
    const deletionLogs = logs.deletionLogs;

    const stackedBarRef = useRef(null);
    const stackedBarInstance = useRef(null);

    // Stacked bar chart
    useEffect(() => {      
         
        if (stackedBarInstance.current) {
            stackedBarInstance.current.destroy();
        }
        const myStackedBarRef = stackedBarRef.current.getContext('2d');

        stackedBarInstance.current=new Chart(myStackedBarRef, {
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
                responsive: true
            }  
        })
    })

    return (
        <>
            <canvas ref={stackedBarRef} style={{width:"100px", height:"50px"}}/>
        </>
    )
}

export default BarChart;