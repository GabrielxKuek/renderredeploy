import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ logs, title }) => {
    const creationLogs = logs?.creationLogs?.data || [];
    const modificationLogs = logs?.modificationLogs?.data || [];
    const deletionLogs = logs?.deletionLogs?.data || [];

    const barRef = useRef(null);
    const barInstance = useRef(null);

    useEffect(() => {
        // Clean up existing chart instance if it exists
        if (barInstance.current) {
            barInstance.current.destroy();
        }

        const myBarRef = barRef.current.getContext('2d');

        barInstance.current = new Chart(myBarRef, {
            type: 'bar',
            data: {
                labels: ['Creation', 'Modification', 'Deletion'],
                datasets: [
                    {
                        label: 'Logs Count',
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                            'rgb(255, 205, 86)',
                        ],
                        data: [
                            creationLogs.length,
                            modificationLogs.length,
                            deletionLogs.length,
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: title,
                    },
                    legend: {
                        display: true,
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: (tooltipItem) => {
                                return `Count: ${tooltipItem.raw}`;
                            },
                        },
                    },
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                    },
                },
            },
        });

        // Cleanup chart instance on unmount
        return () => {
            if (barInstance.current) {
                barInstance.current.destroy();
            }
        };
    }, [logs, title]); // Depend on logs and title to update chart when they change

    return (
        <>
            <canvas ref={barRef} style={{ width: '200px', height: '175px' }} />
        </>
    );
};

export default BarChart;
