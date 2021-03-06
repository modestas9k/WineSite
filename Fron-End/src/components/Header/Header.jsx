import React from "react";
import * as S from "./Header.style";
import { Section } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

function Header() {
  const Auth = useContext(AuthContext);

  function logOut(auth) {
    auth.setToken("");
    localStorage.removeItem("token");
  }
  return (
    <S.Container>
      <Section>
        <S.Header>
          <S.StyledLink to="/">
            <S.Logo>WineSite</S.Logo>
          </S.StyledLink>
          <S.Actions>
            {!Auth.token && (
              <>
                <S.StyledLink to="/register">Register</S.StyledLink>
                <S.StyledLink to="/login">Login In</S.StyledLink>
              </>
            )}
            {Auth.token && (
              <>
                <S.StyledLink to="/allWine">Wine Types</S.StyledLink>
                <S.StyledLink to="/addWineType">Add Type</S.StyledLink>
                <S.StyledLink to="/myWine">My List</S.StyledLink>
                <S.StyledLink to="/addMyWine">Add Wine</S.StyledLink>
                <S.StyledLink to="/" onClick={() => logOut(Auth)}>
                  Logout
                </S.StyledLink>
              </>
            )}
          </S.Actions>
        </S.Header>
      </Section>
    </S.Container>
  );
}

export default Header;
