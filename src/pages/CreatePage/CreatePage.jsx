import {
  useCreateCharacter,
  useGetCharacters,
  useTQueryClient,
} from "@curiousyuvi/tquery-actions";
import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./CreatePage.style.css";
import { useState } from "react";

const CreatePage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [alias, setAlias] = useState("");
  const [imageURL, setImageURL] = useState("");

  const queryClient = useTQueryClient();
  const history = useHistory();
  const { invalidateQuery } = useGetCharacters();

  const mutation = useCreateCharacter(() => {
    invalidateQuery(queryClient);
    alert("Character created!");
    history.goBack();
  });

  const handleCreate = () => {
    mutation.mutate({ id, name, alias, image_url: imageURL });
  };

  return (
    <div className="Create-wrapper">
      <label>ID</label>
      <input
        value={id}
        type="number"
        onChange={(e) => {
          setId(e.target.value);
        }}
      />
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
      <button onClick={handleCreate} className="Create-button-2">
        Create
      </button>
    </div>
  );
};

const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};

export default CreatePage;
