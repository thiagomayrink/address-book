import styled from "styled-components";

export default styled.div`
  padding-top: 18px;
  width: 100%;
  background-color: #fff;

  display: flex;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 600px) {
    border-radius: 0;
    min-height: 100vh;
    height: auto;
    width: 100%;
  }
`;
