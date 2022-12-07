import Styled from "styled-components"
export const SideBarWrapper = Styled.div`
     box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
     height: 100%;
     width: fit-content;
     .lst-sidebar {
         & > .nav-item  .nav-link.active {
               background: rgba(26 , 135,  84,.7);
               color: #fff;
               border-radius: 4px;
          }
     }

`