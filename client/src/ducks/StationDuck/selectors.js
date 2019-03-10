import { createSelector } from 'reselect'

const selectStations = state => state.stations.stationList
const selectFilters = state => state.stations.filters

export const selectFilteredStations = createSelector(
    [selectStations, selectFilters],
    (stationList, filters) => {
        if (filters.aggregatedData === false && filters.name === '') {
            return stationList
        }
        return stationList.filter(station => {
            if (station.name.indexOf('DUNCAN') >= 0) {
                console.log('hmm')
            }
    
            const aggreagate = filters.aggregatedData ? station.daily_record_count > 0 : true
            const nameSearch = station.name.toUpperCase().indexOf(filters.name) >= 0
            return aggreagate && nameSearch
        })
    }
)