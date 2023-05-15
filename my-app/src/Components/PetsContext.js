import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
// import ReactDOM from "react-dom/client";
// import FirstGreet from "./FirstGreet";

export const PetsContext = createContext();

const refresh = () => window.location.reload(true);

export const usePetsContext = () => useContext(PetsContext);

export default function PetsContextProvider({ children }) {
  const [petsList, setPetsList] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [ifLiked, setIfLiked] = useState(false);
  const [isAdmin, setIsAdmin] = useState("");
  const [usersList, setUsersList] = useState([]);
  const [usersPetList, setUsersPetList] = useState([]);
  const [logedUserDetails, setLogedUserDetails] = useState([]);

  const getUsersPets = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/pets/usersPets/${userId}`
      );
      console.log(res.data);
      setUsersPetList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const root = ReactDOM.createRoot(document.getElementById("root"));
  const logout = async () => {
    try {
      const res = await axios.delete("http://localhost:8080/users/logout", {
        withCredentials: true,
      });
      console.log(res.data);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/userDetail", {
        withCredentials: true,
      });
      setLogedUserDetails(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkToken = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/tokenCheck", {
        withCredentials: true,
      });
      console.log(res.data);
      setCurrentName(res.data.name);
      setIsAdmin(res.data.admin);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/users/usersList", {
        withCredentials: true,
      });
      console.log(res.data);
      setUsersList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/pets/petsList");
      console.log(res.data);
      setPetsList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfLiked = async (petId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/pets/likedPets/${petId}`,
        { withCredentials: true }
      );
      console.log(res.data);
      setIfLiked(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendToLikedPets = async (likedPet) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/pets/likedPets",
        likedPet,
        { withCredentials: true }
      );
      console.log(res.data);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const deletFromLikedPets = async (del) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/pets/likedPets/${del}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  async function handleAdvencedSearch(advancedDetails) {
    try {
      const res = await axios.get(
        `http://localhost:8080/pets?type=${advancedDetails.petType}&adoptionStatus=${advancedDetails.petStatus}&height=${advancedDetails.petHeight}&weight=${advancedDetails.petWeight}&name=${advancedDetails.petName}`,
        { withCredentials: true }
      );
      console.log(res.data);
      setPetsList(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function login(userLogin) {
    try {
      const res = await axios.post(
        "http://localhost:8080/users/login",
        userLogin,
        { withCredentials: true }
      );
      console.log(res.data);
      setCurrentName(res.data.name);
      setIsAdmin(res.data.admin);
    } catch (err) {
      console.log(err);
    }
  }

  async function changePetStatus(adopt) {
    try {
      const res = await axios.put("http://localhost:8080/pets", adopt, {
        withCredentials: true,
      });
      console.log(res.data);
      refresh();
    } catch (err) {
      console.log(err);
    }
  }

  async function changePetStatusAvailable(adopt) {
    try {
      const res = await axios.put(
        "http://localhost:8080/pets/available",
        adopt,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      refresh();
    } catch (err) {
      console.log(err);
    }
  }

  async function addToActivities(adopt) {
    try {
      const res = await axios.post(
        "http://localhost:8080/pets/activities",
        adopt,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <PetsContext.Provider
      value={{
        petsList,
        login,
        currentName,
        changePetStatus,
        handleAdvencedSearch,
        sendToLikedPets,
        deletFromLikedPets,
        checkIfLiked,
        ifLiked,
        setPetsList,
        isAdmin,
        getAllUsers,
        usersList,
        changePetStatusAvailable,
        logout,
        addToActivities,
        getAllPets,
        getUsersPets,
        usersPetList,
        logedUserDetails,
        getUserDetails,
        checkToken,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
