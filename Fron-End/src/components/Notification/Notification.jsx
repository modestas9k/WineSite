import React from "react";
import * as S from "./Notification.style";

function Notification({ message, color }) {
  return (
    <div>
      <S.Text color={color}>{message}</S.Text>
    </div>
  );
}

export default Notification;
