const DataCard = ({logsArgument, title, unit}) => {
    
    const logs = logsArgument;
    let logsPerMin = 0
    // console.log("logs" + JSON.stringify(logs));
    // console.log("length" + logs.data.length)

    if (logs.length > 0) {
        let dates = logs.map(e => new Date(e.created_at));
        const minDate = new Date(Math.min(...dates));
        const maxDate = new Date(Math.max(...dates));
        const timeDifference = Math.abs(maxDate - minDate);
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    
        logsPerMin = (logs.length / minutesDifference).toPrecision(3)
    }
    // console.log("logsPerMin" + logsPerMin)
    return (
        <>
            <div className="card text-center">
                <div className="card-header">{title}</div>
                <div className="card-body bold">{logsPerMin} {unit}</div>
            </div>
        </>
    )
}

export default DataCard