import { useGetCharacters } from "@curiousyuvi/tquery-actions";
import React from "react";
import "./Home.style.css";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

const Home = () => {
  const { data, isLoading, isError } = useGetCharacters();
  return (
    <>
      {isLoading ? (
        <div className="Center-wrapper">LOADING...</div>
      ) : isError ? (
        <div className="Center-wrapper">ERROR</div>
      ) : (
        <div className="Home-wrapper">
          <h1>Characters</h1>
          <div className="Cards-wrapper">
            {[
              <a href="/create" className="Create-button">
                + Create
              </a>,
              ...data?.map((character) => {
                return <CharacterCard key={character.id} {...character} />;
              }),
            ]}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
