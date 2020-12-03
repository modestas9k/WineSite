import React, { useEffect, useContext, useState } from "react";
import { Section } from "../../components";
import * as S from "./AllWine.style";
import { AuthContext } from "../../contexts/AuthContext";

function AllWine() {
  const Auth = useContext(AuthContext);
  const [wine, setWine] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/allWineTypes", {
      headers: {
        Authorization: `Bearer ${Auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWine(data);
      });
  }, [Auth.token]);

  return (
    <>
      <Section>
        <S.H1>Wine Types</S.H1>
        <S.BoxWrapper>
          <S.H3>All Wine Types Below</S.H3>
          <S.P>A short explanation of this</S.P>
          <S.Table>
            <S.Thead>
              <tr>
                <S.Th>Wine Name</S.Th>
                <S.Th>Region</S.Th>
                <S.Th>Year</S.Th>
              </tr>
            </S.Thead>
            <tbody>
              {wine &&
                wine.map((item) => {
                  return (
                    <tr key={item.id}>
                      <S.Td color={item.type}>{item.name}</S.Td>
                      <S.Td color={item.type}>{item.region}</S.Td>
                      <S.Td color={item.type}>{item.year}</S.Td>
                    </tr>
                  );
                })}
            </tbody>
          </S.Table>
        </S.BoxWrapper>
      </Section>
    </>
  );
}

export default AllWine;
