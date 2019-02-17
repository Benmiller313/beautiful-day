export const selectStations = (state) => {
    const filter = state.stations.filter
    if(filter === 'all') {
        return state.stations.stationList
    } else {
        return state.stations.stationList.filter(station => station.daily_record_count > 0)    
    }
}