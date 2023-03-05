import {
  useGetCharacter,
  useTQueryClient,
  useUpdateCharacter,
} from "@curiousyuvi/tquery-actions";
import React from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import CharacterCard from "../../components/CharacterCard/CharacterCard";
import "./CharacterPage.style.css";
import { useState, useEffect } from "react";

const CharacterPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, invalidateQuery } = useGetCharacter(id);
  const query = useQuery();

  const [name, setName] = useState(data?.name || "");
  const [alias, setAlias] = useState(data?.alias || "");
  const [imageURL, setImageURL] = useState(data?.image_url || "");

  useEffect(() => {
    setName(data?.name);
  }, [data?.name]);

  useEffect(() => {
    setAlias(data?.alias);
  }, [data?.alias]);

  useEffect(() => {
    setImageURL(data?.image_url);
  }, [data?.image_url]);

  const queryClient = useTQueryClient();
  const history = useHistory();

  const mutation = useUpdateCharacter(() => {
    invalidateQuery(queryClient, data?.id);
    alert("Character updated!");
    history.goBack();
  });

  const handleSubmit = () => {
    mutation.mutate({ id: data?.id, name, alias, image_url: imageURL });
  };

  return (
    <div className="Character-wrapper">
      {query.get("edit") ? (
        <>
          <label>Name</label>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <label>Alias</label>
          <input
            value={alias}
            onChange={(e) => {
              setAlias(e.target.value);
            }}
          />
          <label>Image URL (can leave empty)</label>
          <input
            value={imageURL}
            onChange={(e) => {
              setImageURL(e.target.value);
            }}
          />
          <button onClick={handleSubmit} className="Submit-button">
            Submit
          </button>
        </>
      ) : isLoading ? (
        <div className="Center-wrapper">LOADING...</div>
      ) : isError ? (
        <div className="Center-wrapper">ERROR</div>
      ) : (
        <>
          <CharacterCard {...data} />
          <a className="Edit-button" href={`/${id}?edit=true`}>
            Edit
          </a>
        </>
      )}
    </div>
  );
};

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export default CharacterPage;
