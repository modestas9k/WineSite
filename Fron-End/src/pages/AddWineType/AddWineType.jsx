import React, { useContext, useState } from "react";
import { Section, Input, Button, Notification } from "../../components";
import * as S from "./AddWineTypes.style";
import { AuthContext } from "../../contexts/AuthContext";

function AddWineType() {
  const [message, setMessage] = useState();
  const [color, setColor] = useState();
  const [fieldValues, setFieldValues] = useState();
  const Auth = useContext(AuthContext);

  function AddWine(data) {
    fetch("http://localhost:8080/addWineType", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Auth.token}`,
      },
      body: JSON.stringify({
        wineName: data.wineName,
        type: data.type,
        year: data.year,
        region: data.region,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Wine type has been added successfully") {
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
        <S.H1>Add Wine Types</S.H1>
        <S.Form
          onSubmit={(e) => {
            e.preventDefault();
            AddWine(fieldValues);
          }}
        >
          <S.H3>Add a Wine Types</S.H3>
          <S.P>A short explanation how to do this</S.P>
          {message && <Notification color={color} message={message} />}
          <Input
            label="Wine Name"
            placeholder="Vorat"
            name="wineName"
            type="text"
            handleChange={(e) => {
              setFieldValues({ ...fieldValues, wineName: e.target.value });
            }}
          />
          <Input
            label="Region"
            placeholder="Lithuania"
            name="region"
            type="text"
            handleChange={(e) => {
              setFieldValues({ ...fieldValues, region: e.target.value });
            }}
          />
          <S.Split>
            <Input
              label="Type"
              placeholder="White"
              name="type"
              type="select"
              SelectOptions={[
                { type: "White", id: 1 },
                { type: "Red", id: 2 },
              ]}
              handleChange={(e) => {
                setFieldValues({ ...fieldValues, type: e.target.value });
              }}
            />
            <Input
              label="Year"
              placeholder="2017"
              name="year"
              type="number"
              handleChange={(e) => {
                setFieldValues({ ...fieldValues, year: e.target.value });
              }}
            />
          </S.Split>
          <S.ButtonWrapper>
            <Button color="primary">Add</Button>
          </S.ButtonWrapper>
        </S.Form>
      </Section>
    </>
  );
}

export default AddWineType;
