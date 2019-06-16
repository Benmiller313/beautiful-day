import styled from 'styled-components'

import { BRAND_BLUE } from '../../constants/style'

const ProjectPin = styled.div`
  transform:translate(-50%, -50%);
  height: 10px;
  width: 10px;
  border: 2px solid white;
  border-radius: 50%;
  background-color: ${BRAND_BLUE};
`

export default ProjectPin
