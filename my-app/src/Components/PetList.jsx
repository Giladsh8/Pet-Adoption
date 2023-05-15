import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import { usePetsContext } from "./PetsContext";

export default function PetList({ list }) {
  const { isAdmin } = usePetsContext();

  console.log(list);

  return (
    <>
      <div id="pet-list">
        {list &&
          list.map((pet) => {
            return (
              <div className="pet-list-card">
                <div className="pet-list-img">
                  <img src={pet.photo} alt="pet_img"></img>
                </div>
                <div className="pat-list-data">
                  <h1>{pet.name}</h1>
                  <p>
                    Adoption status:{" "}
                    <b>
                      <span className="adop-stat">{pet.adoptionStatus}</span>
                    </b>
                  </p>
                  <Link to={`/pets/${pet.petId}`}>
                    <button type="text" className="pet-list-button">
                      Want to know more? &gt;
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}
