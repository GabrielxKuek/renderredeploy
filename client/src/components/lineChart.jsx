import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {

    const lineRef = useRef(null);
    const lineInstance = useRef(null);

    // Line chart
    useEffect(() => {
        if (lineInstance.current) {
            lineInstance.current.destroy();
        }
        const myLineRef = lineRef.current.getContext('2d');

        lineInstance.current=new Chart(myLineRef, {
            type: "line",
            data: {
                labels: ["2024-03-04", "2024-03-05", "2024-03-06", "2024-03-07"],
                datasets: [
                    {   
                        label: 'GET',
                        data: [300, 50, 100, 120],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgb(255, 99, 132)'
                    },
                    {   
                        label: 'POST',
                        data: [200, 70, 80, 10],
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgb(54, 162, 235)'
                    },
                    {   
                        label: 'PUT',
                        data: [240, 100, 80, 15],
                        borderColor: 'rgb(255, 205, 86)',
                        backgroundColor: 'rgb(255, 205, 86)'
                    },
                    {   
                        label: 'DELETE',
                        data: [160, 60, 50, 60],
                        borderColor: 'rgb(0, 255, 0)',
                        backgroundColor: 'rgb(0, 255, 0)'
                    },
                ]
            },
            options: {
                responsive: true
            }  
        });
    
        return () => {
            if (lineInstance.current) {
                lineInstance.current.destroy(); 
            }
        }
    }, [])

    return (
        <>
            <canvas ref={lineRef} style={{width:"400px", height:"200px"}}/>
        </>
    )
}

export default LineChart;