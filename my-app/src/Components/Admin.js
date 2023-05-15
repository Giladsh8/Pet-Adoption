import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePetsContext } from "./PetsContext";
import UsersList from "./UsersList";
import PetList from "./PetList";
import UsersPetList from "./UsersPetList";

export default function Admin() {
  const { getAllUsers, usersList, getAllPets, petsList, checkToken } =
    usePetsContext();
  const [petclicked, setPetClicked] = useState(false);
  const [Usersclicked, setUsersClicked] = useState(true);

  useEffect(() => {
    getAllUsers();
    getAllPets();
    checkToken();
  }, []);

  const togglePetsUsers = () => {
    setPetClicked((current) => !current);
    setUsersClicked((current) => !current);
  };
  return (
    <>
      <header className="admin-buttons">
        <button onClick={togglePetsUsers}>Pets</button>
        <button onClick={togglePetsUsers}>Users</button>
      </header>

      {Usersclicked && (
        <div className="admin-page">
          <div className="users">
            <UsersList usersList={usersList} />
          </div>
          <div className="admin-pets">
            <UsersPetList />
          </div>
        </div>
      )}
      {petclicked && (
        <>
          <button className="add-pet">
            <Link to="/addpet">add pet</Link>
          </button>
          <div>
            <PetList list={petsList} />
          </div>
        </>
      )}
    </>
  );
}
