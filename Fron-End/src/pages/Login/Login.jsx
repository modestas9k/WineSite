import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Section, Form, Button } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
  const history = useHistory();
  const authTokenContext = useContext(AuthContext);
  const [message, setMessage] = useState();

  function login(data, AuthContext, history) {
    fetch("http://localhost:8080/login", {
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
        if (data.token) {
          AuthContext.setToken(data.token);
          localStorage.setItem("token", data.token);
          history.push("/allWine");
        } else {
          return setMessage(data.msg || "Error");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Section>
      <Form
        headline="Login"
        message={message}
        fields={[
          {
            name: "email",
            label: "Email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
          },
        ]}
        callback={(data) => {
          login(data, authTokenContext, history);
        }}
      >
        <Button color="primary">Login</Button>
      </Form>
    </Section>
  );
}

export default Login;
