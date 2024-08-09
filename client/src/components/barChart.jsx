import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ argument }) => {

    const stackedBarRef = useRef(null);
    const stackedBarInstance = useRef(null);

    // Stacked bar chart
    useEffect(() => {      
        console.log(argument[0])  
        if (stackedBarInstance.current) {
            stackedBarInstance.current.destroy();
        }
        const myStackedBarRef = stackedBarRef.current.getContext('2d');

        stackedBarInstance.current=new Chart(myStackedBarRef, {
            type: 'bar',
            data: {
                labels: ["Chocolate", "Vanilla", "Strawberry"],
                datasets:[
                    {
                        label: "Blue",
                        backgroundColor: "blue",
                        data: [3,7,4]
                    },
                    {
                        label: "Red",
                        backgroundColor: "red",
                        data: [4,3,5]
                    },
                    {
                        label: "Green",
                        backgroundColor: "green",
                        data: [7,2,6]
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
            <canvas ref={stackedBarRef} style={{width:"220px", height:"50px"}}/>
        </>
    )
}

export default BarChart;