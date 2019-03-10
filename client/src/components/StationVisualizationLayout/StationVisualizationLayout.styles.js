import styled from 'styled-components'

export const StationVisualizationContainer = styled.div`
    display: grid;
    grid-template-areas:
        "header header"
        "nav content";
    grid-template-columns: 300px 1fr;
    grid-template-rows: auto 1fr;
    grid-gap: 10px;

    height: 100%
`

export const Header = styled.div`
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`

export const Sidebar = styled.div`
    grid-area: nav;
    padding: 10px;
    border-right: 1px solid #e8e8e8
`

export const Content = styled.div`
    grid-area: content;
    padding: 10px;
`

    