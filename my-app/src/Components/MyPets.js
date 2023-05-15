import axios from "axios";
import React, { useEffect, useState } from "react";
import PetList from "./PetList";
import { usePetsContext } from "./PetsContext";

export default function MyPets() {
  const { checkToken } = usePetsContext();

  const [likedList, setLikedList] = useState("");
  const [fosterdList, setFosterdList] = useState("");
  const [adoptedList, setAdoptedList] = useState("");

  const getLikedPets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/pets/listliked", {
        withCredentials: true,
      });
      console.log(res.data);
      setLikedList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getFosterdPets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/pets/fosterd", {
        withCredentials: true,
      });
      setFosterdList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAdoptedPets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/pets/adopted", {
        withCredentials: true,
      });
      console.log(res.data);
      setAdoptedList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLikedPets();
    getFosterdPets();
    getAdoptedPets();
    checkToken();
  }, []);

  return (
    <>
      <div className="my-pets">
        <h3>Liked Pets</h3>
        {likedList.length === 0 ? (
          <p className="no-list">No Liked Pets yet....</p>
        ) : (
          <PetList list={likedList} />
        )}

        <h3>Fosterd Pets</h3>
        {fosterdList.length === 0 ? (
          <p className="no-list">No Fosterd Pets yet....</p>
        ) : (
          <PetList list={fosterdList} />
        )}
        <h3>Adopted Pets</h3>
        {adoptedList.length === 0 ? (
          <p className="no-list">No Fosterd Pets yet....</p>
        ) : (
          <PetList list={adoptedList} />
        )}
      </div>
    </>
  );
}
