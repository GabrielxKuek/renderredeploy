import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const StackedBarChart = ({ logs }) => {

    const creationLogs = logs.creationLogs;
    const modificationLogs = logs.modificationLogs;
    const deletionLogs = logs.deletionLogs;

    const stackedBarRef = useRef(null);
    const stackedBarInstance = useRef(null);

    // Get all sites then only include unique records
    let sites = [...creationLogs.map(e=>e.site_id), ...modificationLogs.map(e=>e.site_id), ...deletionLogs.map(e=>e.site_id)];
    sites = [...new Set(sites)];

    let siteData = {
        creationData: [],
        modificationData: [],
        deletionData: []
    }
    for (let i = 0; i < sites.length; i++) {
        siteData.creationData.push(creationLogs.filter(e => e.site_id == sites[i]).length);
        siteData.modificationData.push(modificationLogs.filter(e => e.site_id == sites[i]).length);
        siteData.deletionData.push(deletionLogs.filter(e => e.site_id == sites[i]).length);
    }
    
    // Stacked bar chart
    useEffect(() => {      
         
        if (stackedBarInstance.current) {
            stackedBarInstance.current.destroy();
        }
        const myStackedBarRef = stackedBarRef.current.getContext('2d');

        stackedBarInstance.current=new Chart(myStackedBarRef, {
            type: 'bar',
            data: {
                labels: sites,
                datasets:[
                    {
                        label: "POST",
                        backgroundColor: "rgb(255, 99, 132)",
                        data: siteData.creationData
                    },
                    {
                        label: "PUT",
                        backgroundColor: "rgb(54, 162, 235)",
                        data: siteData.modificationData
                    },
                    {
                        label: "DELETE",
                        backgroundColor: "rgb(255, 205, 86)",
                        data: siteData.deletionData
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                      stacked: true,
                    },
                    y: {
                      stacked: true
                    }
                  }
            }  
        })
    })

    return (
        <>
            <canvas ref={stackedBarRef} style={{width:"100px", height:"50px"}}/>
        </>
    )
}

export default StackedBarChart;