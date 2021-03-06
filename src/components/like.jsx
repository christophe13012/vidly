import React from "react";

const Like = ({ like, onClick }) => {
  const classe = like ? "fa fa-heart" : "fa fa-heart-o";
  return (
    <i
      onClick={onClick}
      className={classe}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    />
  );
};

export default Like;
