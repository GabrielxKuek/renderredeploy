import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {

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
                labels: ["GET", "POST", "PUT", "DELETE"],
                datasets: [
                    {
                        data: [300, 50, 100, 20],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                            'rgb(0, 255, 0)'
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
            <canvas ref={pieRef} style={{width:"300px", height:"200px"}}/>
        </>
    )
}

export default PieChart;