import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  border-bottom: 1px solid #eee;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
  text-decoration: none;
  margin: 0;
`;

export const Actions = styled.nav``;

export const StyledLink = styled(Link)`
  font-size: 1em;
  color: #222;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-child) {
    margin-right: 15px;
  }
  &:focus {
    text-decoration: underline;
  }
`;
