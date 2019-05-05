export const FETCH_STATIONS = 'FETCH_STATIONS'
export const FETCH_STATIONS_SUCCESS = 'FETCH_STATIONS_SUCCESS'
export const FETCH_STATIONS_ERROR = 'FETCH_STATIONS_ERROR'
export const FETCH_PROJECTS = 'FETCH_PROJECTS'
export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'
export const SET_STATION_FILTER = 'SET_STATION_FILTER'
export const FETCH_STATION_GRAPH_ALL = 'FETCH_STATION_GRAPH_ALL'
export const FETCH_STATION_GRAPH_ALL_SUCCESS = 'FETCH_STATION_GRAPH_ALL_SUCCESS'
export const FETCH_COMBINED_GRAPH = 'FETCH_COMBINED_GRAPH'
export const FETCH_COMBINED_GRAPH_SUCCESS = 'FETCH_COMBINED_GRAPH_SUCCESS'
export const SET_SELECTED_PROJECT = 'SET_SELECTED_PROJECT'
export const CLEAR_SELECTED_PROJECT = 'CLEAR_SELECTED_PROJECT'
export const SHOW_PROJECT_MODAL = 'SHOW_PROJECT_MODAL'
export const CLOSE_PROJECT_MODAL = 'CLOSE_PROJECT_MODAL'

export const fetchStations = () => ({
    type: FETCH_STATIONS
})

export const fetchStationsSuccess = (stations) => ({
    type: FETCH_STATIONS_SUCCESS,
    payload: stations,
})

export const fetchStationsError = (error) => ({
    type: FETCH_STATIONS_ERROR,
    error: error,
})

export const fetchProjects = () => ({
    type: FETCH_PROJECTS,
})

export const fetchProjectsSuccess = (data) => ({
    type: FETCH_PROJECTS_SUCCESS,
    payload: data,
})

export const setStationFilter = (filter) => ({
    type: SET_STATION_FILTER,
    payload: filter,
})

export const fetchStationGraphAll = (stationId) => ({
    type: FETCH_STATION_GRAPH_ALL,
    payload: stationId,
})

export const fetchStationGraphAllSuccess = (data) => ({
    type: FETCH_STATION_GRAPH_ALL_SUCCESS,
    payload: data,
})

export const fetchCombinedGraph = (stations) => ({
    type: FETCH_COMBINED_GRAPH,
    payload: stations,
})

export const fetchCombinedGraphSuccess = (data) => ({
    type: FETCH_COMBINED_GRAPH_SUCCESS,
    payload: data,
})

export const setSelectedProject = (project) => ({
    type: SET_SELECTED_PROJECT,
    payload: project,
})

export const clearSelectedProject = () => ({
    type: CLEAR_SELECTED_PROJECT,
})

export const showProjectModal = (project) => ({
    type: SHOW_PROJECT_MODAL,
    payload: project,
})

export const closeProjectModal = () => ({
    type: CLOSE_PROJECT_MODAL,
})