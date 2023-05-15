import React from "react";
import "../style.css";
import { usePetsContext } from "./PetsContext";

export default function ({ usersList }) {
  const { getUsersPets } = usePetsContext();

  const usersPetsList = (list) => {
    getUsersPets(list);
  };
  return (
    <>
      {usersList &&
        usersList.map((item) => {
          return (
            <div className="user-detail">
              <div className="user-items Uname">
                <b>
                  {item.firstName} <span>{item.lastName}</span>
                </b>
              </div>
              <div className="user-items Uemail">{item.email}</div>
              <div className="user-items Uphone">0{item.phone}</div>
              <div className="user-items Uadmin">
                {item.admin === 1 ? "administrator" : "pet owner"}
              </div>
              {item.admin === 0 ? (
                <button
                  onClick={() => usersPetsList(item.userId)}
                  className="user-item Ubutton-pets"
                >
                  User's Pets
                </button>
              ) : (
                <button className="user-item Ubutton-pets" disabled>
                  User's Pets
                </button>
              )}
            </div>
          );
        })}
    </>
  );
}
