import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Section, Form, Button } from "../../components";

function Register() {
  const history = useHistory();
  const [message, setMessage] = useState();
  const [color, setColor] = useState();

  function register(data, history) {
    fetch("http://localhost:8080/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "User has been successfully registered") {
          setMessage(data.msg);
          setColor("green");
          //history.push("/allWine");
        } else {
          setMessage(data.msg);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Section>
      <Form
        headline="Register"
        message={message}
        color={color}
        fields={[
          {
            name: "email",
            label: "Email",
            type: "email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
          },
        ]}
        callback={(data) => {
          register(data, history);
        }}
      >
        <Button color="primary">Register</Button>
      </Form>
    </Section>
  );
}

export default Register;
