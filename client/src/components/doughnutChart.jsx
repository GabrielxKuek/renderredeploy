import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DonutChart = ({ logs }) => {

    const requestLogs = logs.requestLogs

    const donutRef = useRef(null);
    const donutInstance = useRef(null);

    // Uses dummy data as a placeholder if there are no requests available
    let data = requestLogs.length > 0 ? [
        requestLogs.filter(e => e.error_message != "NO_ERROR").length,
        requestLogs.filter(e => e.error_message == "NO_ERROR").length,
    ] : [10, 95]

    // Stacked bar chart
    useEffect(() => {      
         
        if (donutInstance.current) {
            donutInstance.current.destroy();
        }
        const myDonutRef = donutRef.current.getContext('2d');
        
        donutInstance.current=new Chart(myDonutRef, {
            type: 'doughnut',
            data: {
                labels: ["Error Request", "Success Request"],
                datasets:[
                    {
                        label: "Error and Success Request Data",
                        backgroundColor: ['rgb(255, 99, 132)', 'rgb(0, 255, 120)'],
                        data: data
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Request Success Rate'
                    }
                }
            }  
        })
    })

    return (
        <>
            <canvas ref={donutRef} style={{width:"300px", height:"50px"}}/>
        </>
    )
}

export default DonutChart;