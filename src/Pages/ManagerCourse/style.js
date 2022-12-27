import Styled from "styled-components"
export const ManagerCourseWrapper = Styled.div`

`
export const FormManagerCourseEditWrapper = Styled.div`

`;
export const FormAddContentWrapper = Styled.div`

`
export const DisplayFile = Styled.div`
     display: flex;
     align-items: center;
     .icon__close {
          cursor: pointer;
     }

`
export const SlideShowImage = Styled.div`
     width: 100%;
     display: flex;
     margin: 1rem 1rem 1rem 71px;
     overflow-x: auto;
     .slide-show-item {
          max-width: 140px;
          min-width: 140px;
          width: 140px;
          height: 100px;
          border-radius: 5px;
          overflow: hidden;
          margin-right: 1rem;
          margin-bottom: 1rem;
          position: relative;
          .icon__close {
               position: absolute;
               top: 0;
               right: 0;
               display: flex;
               justify-content: center;
               align-items: center;
               width: 20px;
               height: 20px;
               border-radius: 50%;
               border: 1px solid currentColor;
               background: #000;
               margin: .35rem;
               color: #fff;
               cursor: pointer;
          }
          .name__image {
               width: 100px;
               text-overflow: ellipsis;
               white-space: nowrap;
               overflow: hidden;
               position: absolute;
               top: 0;
               left: 0;
               color: #fff;
               padding: .55rem;
               display: none;
          }
          & > img {
               width: 100%;
               height: 100%;
               object-fit: cover;
          }
          .process {
               position: absolute;
               bottom: 0;
               left: 50%;
               transform: translateX(-50%);
               width: 95%;
               border-radius: 5px;
               text-align: center;
               padding: .15rem;
               border: 1px solid;
               background: #fff;
               margin: .35rem 0;
          }
     }
`
export const ManagerCourseDetailWrapper = Styled.div`
     .rs-table-cell {
          border: none !important;
     }
     .text-decoration-underline, .hover-underline:hover {
          cursor: pointer;
          text-decoration: underline;
     }


`
export const FormCourseModalWrapper = Styled.div`
     .rs-modal-content {
          padding: 0;
     }

`
export const SlideShowItems = Styled.div`
    max-width: 100px;
          min-width: 100px;
          width: 100px;
          height: 100px;
          border-radius: 5px;
          overflow: hidden;
          margin-right: 1rem;
          margin-bottom: 1rem;
          cursor: pointer;
          &.active {
               border: 2px solid;
          }
     & > img {
          width: 100%;
          height: 100%;
          object-fit:cover;
     }
`
export const FormEditCourseWrapper = Styled.div`


`