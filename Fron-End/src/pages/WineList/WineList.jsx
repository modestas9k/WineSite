import React, { useEffect, useContext, useState } from "react";
import { Section } from "../../components";
import * as S from "./WineList.style";
import { AuthContext } from "../../contexts/AuthContext";

function WineList() {
  const Auth = useContext(AuthContext);
  const [wine, setWine] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/myWineList", {
      headers: {
        Authorization: `Bearer ${Auth.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWine(data);
      });
  }, [Auth.token]);
  console.log(wine);
  return (
    <>
      <Section>
        <S.H1>My Wine</S.H1>
        <S.BoxWrapper>
          <S.H3>All Wine Below</S.H3>
          <S.P>A short explanation how to do this </S.P>
          <S.Table>
            <S.Thead>
              <tr>
                <S.Th>Wine Name</S.Th>
                <S.Th>Region, Year</S.Th>
                <S.Th>Quantity</S.Th>
              </tr>
            </S.Thead>
            <tbody>
              {wine &&
                wine.map((item) => {
                  return (
                    <tr key={item.id}>
                      <S.Td color={item.type}>{item.name}</S.Td>
                      <S.Td color={item.type}>
                        {item.region}, {item.year}
                      </S.Td>
                      <S.Td color={item.type}>{item.Total}</S.Td>
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

export default WineList;
