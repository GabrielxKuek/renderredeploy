

const ScrollTable = ({ logs }) => {
    
    const creationLogs = logs.creationLogs
    const modificationLogs = logs.modificationLogs
    const deletionLogs = logs.deletionLogs

    let users = [...creationLogs.map(e => e.user_id), ...modificationLogs.map(e => e.user_id), ...deletionLogs.map(e => e.user_id)]
    users = [...new Set(users)]
    users = users.map(e => {
        return {
            user_id: e.user_id,
            creationCount: 0,
            modificationCount: 0,
            deletionCount: 0,
            total: 0
        };
    })

    users.map(user => {
        creationLogs.map(cLog => {
            if (cLog.user_id == user.user_id) {
                user.creationCount++;
            }
        });
        modificationLogs.map(mLog => {
            if (mLog.user_id == user.user_id) {
                user.modificationCount++;
            }
        });
        deletionLogs.map(dLog => {
            if (dLog.user_id == user.user_id) {
                user.deletionCount++;
            }
        });
        user.total = user.creationCount + user.modificationCount + user.deletionCount;
    })

    // Sort users in descending order by total requests and only include the highest 20 records
    users = users.sort((a, b) => b.total - a.total);
    users = users.slice(0,20);
    return (
        <>
            <table className="table-bordered table-striped table-condensed table-fixed">
                <thead>
                    <th className="col">user_id</th>
                    <th className="col">POST</th>
                    <th className="col">PUT</th>
                    <th className="col">DELETE</th>
                    <th className="col">Total</th>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.user_id}>
                                <td>{user.user_id}</td>
                                <td>{user.creationCount}</td>
                                <td>{user.modificationCount}</td>
                                <td>{user.deletionCount}</td>
                                <td>{user.total}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default ScrollTable;