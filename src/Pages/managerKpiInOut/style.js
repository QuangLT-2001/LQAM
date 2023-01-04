import Styled from "styled-components"
export const ManagerKpiInOutWrapper = Styled.div`

`
export const DropdownWrapper = Styled.div`
     position:relative;
     .label {
          cursor: pointer
     }
     .dropdown {
          position:absolute;
          top: 100%;
          left: 0;
          background:#fff;
          margin-top: 1rem;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          opacity: ${props => props.status ? 1 : 0};
          visibility: ${props => props.status ? "visible" : "hidden"};
          transition: .3s;
     }
`