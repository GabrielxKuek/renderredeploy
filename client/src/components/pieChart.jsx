import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = ({ logs }) => {

    console.log(logs)
    const creationLogs = logs.creationLogs;
    const modificationLogs = logs.modificationLogs;
    const deletionLogs = logs.deletionLogs;

    const pieRef = useRef(null);
    const pieInstance = useRef(null);
 
    // Pie chart
    useEffect(() => {
        if (pieInstance.current) {
            pieInstance.current.destroy()
        }
        const myPieRef = pieRef.current.getContext('2d');

        pieInstance.current=new Chart(myPieRef, {
            type: "pie",
            data: {
                labels: ["POST", "PUT", "DELETE"],
                datasets: [
                    {
                        data: [creationLogs.length, modificationLogs.length, deletionLogs.length],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                        ],
                    }
                ]
            },
            options: {
                responsive: true
            }  
        });

        return () => {
            if (pieInstance.current) {
                pieInstance.current.destroy(); 
            }
        }
    }, []);

    return (
        <>
            <canvas ref={pieRef} style={{width:"300px", height:"50px"}}/>
        </>
    )
}

export default PieChart;