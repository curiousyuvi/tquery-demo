import React from "react";
import "./style.css";
import { useHistory } from "react-router-dom";

const CharacterCard = ({ id, name, alias, image_url }) => {
  const history = useHistory();
  return (
    <div
      className="Character-card"
      onClick={() => {
        history.push(`${id}`);
      }}
    >
      <img src={image_url} alt={name} className="Character-card-image" />
      <h3>{name}</h3>
      <p>{alias}</p>
    </div>
  );
};

export default CharacterCard;
