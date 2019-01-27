export const selectStations = (state) => {
    const filter = state.stations.filter
    if(filter === 'all') {
        return state.stations.stationList
    } else {
        return state.stations.stationList.filter(station => station.has_daily_data)    
    }

}