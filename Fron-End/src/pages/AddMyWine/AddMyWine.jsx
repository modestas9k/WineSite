import React, { useContext, useState, useEffect } from "react";
import { Section, Input, Button, Notification } from "../../components";
import * as S from "./AddMyWine.style";
import { AuthContext } from "../../contexts/AuthContext";

function AddWineType() {
  const [message, setMessage] = useState();
  const [color, setColor] = useState();
  const [fieldValues, setFieldValues] = useState();
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

  function AddWine(data) {
    fetch("http://localhost:8080/addMyWine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token}`,
      },
      body: JSON.stringify({
        wine_id: data.wine_id,
        quantity: data.quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Wine Quantity change added!") {
          setMessage(data.msg);
          setColor("green");
        } else {
          setMessage(data.msg);
        }
      });
    console.log(data);
  }

  return (
    <>
      <Section>
        <S.H1>Add Wine</S.H1>
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            AddWine(fieldValues);
          }}
        >
          <S.H3>Add a Wine quantity or reduce</S.H3>
          <S.P>To remove wine quantity add "-" in front (exp. -1)</S.P>
          {message && <Notification color={color} message={message} />}

          <Input
            label="Wine name"
            placeholder="Select wine"
            name="name"
            type="select"
            SelectOptions={wine}
            handleChange={(e) => {
              setFieldValues({ ...fieldValues, wine_id: e.target.value });
            }}
          />
          <Input
            label="Quantity"
            placeholder="1"
            name="quantity"
            type="number"
            handleChange={(e) => {
              setFieldValues({ ...fieldValues, quantity: e.target.value });
            }}
          />

          <S.ButtonWrapper>
            <Button color="primary">Add</Button>
          </S.ButtonWrapper>
        </S.Form>
      </Section>
    </>
  );
}

export default AddWineType;
