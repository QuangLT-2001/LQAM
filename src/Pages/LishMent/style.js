import Styled from "styled-components"
export const LishMentItems = Styled.div`
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
.status {
     min-width: 125px;
     text-align: center;
     display: inline-block;
}
`
export const PaginationWrapper = Styled.div`
     .rs-pagination-btn[title] {
          display: none;
     }
     .rs-pagination-btn[title="Previous"], .rs-pagination-btn[title="Next"] {
          display: flex;

     }
     .rs-pagination-btn[title="Previous"]:before {
          content: "${props => props.page + " - " + props.pages + " trong số " + props.pages}";
          margin-right: 1rem;
          color: #000;
     }
`