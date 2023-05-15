import { useState, useEffect } from "react";
import React from "react";

import { usePetsContext } from "./PetsContext";
import PetList from "./PetList";

export default function Search() {
  const { handleAdvencedSearch, petsList, checkToken } = usePetsContext();

  const [chooseAdvanced, setChooseAdvanced] = useState(false);
  const [advancedDetails, setAdvancedDetails] = useState({
    petType: "",
    petStatus: "",
    petHeight: "",
    petWeight: "",
    petName: "",
  });

  useEffect(() => {
    checkToken();
  }, []);

  const handleInputChange = (e) => {
    setAdvancedDetails({
      ...advancedDetails,
      [e.target.name]: e.target.value,
    });
  };
  console.log(advancedDetails);

  const searchAdvanced = async (e) => {
    e.preventDefault();
    handleAdvencedSearch(advancedDetails);
  };

  return (
    <div>
      <h3>Basic Search</h3>
      <form onSubmit={searchAdvanced}>
        <div className="basic-search">
          <label for="type">Choose a Pet type:</label>
          <select
            className="search-item"
            name="petType"
            id="type"
            value={advancedDetails.petType}
            onChange={handleInputChange}
          >
            <option selected>Pet Type</option>
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="other">Other</option>
          </select>
          <button className="search-button" type="submit">
            Search
          </button>
        </div>
        <button onClick={() => setChooseAdvanced(!chooseAdvanced)}>
          Advanced search
        </button>
        {chooseAdvanced && (
          <div className="advanced-search">
            <label for="petStatus">Choose Pet Status:</label>
            <select
              className="search-item"
              id="petStatus"
              name="petStatus"
              value={advancedDetails.petStatus}
              onChange={handleInputChange}
            >
              <option selected>Pet Status</option>
              <option value="available">Available</option>
              <option value="fosterd">Fosterd</option>
              <option value="adopted">Adopted</option>
            </select>
            <label for="petHeight">Choose Pet Height:</label>
            <select
              className="search-item"
              id="petHeight"
              name="petHeight"
              value={advancedDetails.petHeight}
              onChange={handleInputChange}
            >
              <option selected>Pet Height</option>
              <option value="short">Short (15-45cm)</option>
              <option value="average">Average (46-80cm)</option>
              <option value="tall">Tall (+81cm)</option>
            </select>

            <label for="petWeight">Choose Pet Weight:</label>
            <select
              className="search-item"
              id="petWeight"
              name="petWeight"
              value={advancedDetails.petWeight}
              onChange={handleInputChange}
            >
              <option selected>Pet Weight</option>
              <option value="small">Small (2-10kg)</option>
              <option value="medium">Medium (11-30kg)</option>
              <option value="big">Big (+30kg)</option>
            </select>
            <div className="search-item">
              <label for="petName">Pet Name</label>
              <input
                type="text"
                id="petName"
                placeholder="Name"
                name="petName"
                value={advancedDetails.petName}
                onChange={handleInputChange}
              ></input>
            </div>
            <button className="search-button" type="submit">
              Search
            </button>
          </div>
        )}
      </form>
      <PetList list={petsList} />
    </div>
  );
}
