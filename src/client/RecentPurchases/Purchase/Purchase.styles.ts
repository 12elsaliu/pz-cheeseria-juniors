import styled from 'styled-components';

export const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid lightblue;
  border-radius: 20px;
  margin: 20px;
  padding:10px;

  div {
    flex: 1;
  }

  .information,
  .buttons {
    display: flex;
    justify-content: space-between;
  }

  .total{
    font-weight: bold
  }

  img {
    max-width: 80px;
    max-height:80px;
    object-fit: cover;
    margin-left: 40px;
    margin-top:20px;
    border-radius:5px;
  }
`;
