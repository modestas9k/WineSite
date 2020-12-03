import styled from "styled-components";

export const H1 = styled.h1`
  margin: 2em auto;
  text-align: center;
`;

export const H3 = styled.h3`
  margin-top: 0.3em;
`;
export const P = styled.p`
  color: #96b7d9;
  font-size: 0.9em;
  margin-bottom: 2em;
`;

export const BoxWrapper = styled.div`
  background-color: #dae1e8;
  padding: 1em;
  border-radius: 5px;
`;
export const Table = styled.table`
  width: 100%;
  border: 2px solid #a9bdd1;
  text-align: center;
`;
export const Thead = styled.thead`
  font-weight: 600;
  border: 1px solid black;
  background-color: #dae1e8;
`;
export const Th = styled.th`
  padding: 10px;
`;
export const Td = styled.td`
  padding: 10px;
  background-color: ${(props) =>
    props.color === "Red" ? "#e6a3a1" : "#f5f4c1"};
`;
