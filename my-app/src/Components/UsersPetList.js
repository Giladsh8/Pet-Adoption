import React from "react";
import { usePetsContext } from "./PetsContext";
import { Link } from "react-router-dom";

export default function UsersPetList() {
  const { usersPetList } = usePetsContext();

  return (
    <>
      {usersPetList &&
        usersPetList.map((list) => {
          return (
            <div className="users-pets">
              <p className="users-pets-id">
                <b>PetId: </b> {list.petId}
                <Link to={`/pets/${list.petId}`}>
                  <button type="text" className="arrow-button">
                    &gt;
                  </button>
                </Link>
              </p>
              <div className="users-pets-status">
                <p>{list.adoptionStatus}</p>
                <p>{list.active}</p>
              </div>
              <p className="users-pets-date">Date: {list.created_at}</p>
            </div>
          );
        })}
    </>
  );
}
