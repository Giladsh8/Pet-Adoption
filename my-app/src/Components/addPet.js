import axios from "axios";
import React, { useState, useEffect } from "react";
import { usePetsContext } from "./PetsContext";

export default function AddPet({ petDetails, setMoveToEditPet }) {
  const { checkToken } = usePetsContext();

  useEffect(() => {
    checkToken();
  }, []);
  const [petInputs, setPetInputs] = useState({
    photo: petDetails?.photo || "",
    type: petDetails?.type || "",
    name: petDetails?.name || "",
    adoptionStatus: petDetails?.adoptionStatus || "",
    height: petDetails?.height || "",
    weight: petDetails?.weight || "",
    color: petDetails?.color || "",
    bio: petDetails?.bio || "",
    hypoallergenic: petDetails?.hypoallergenic || true,
    dietaryrRestrictions: petDetails?.dietaryrRestrictions || "",
    breed: petDetails?.breed || "",
  });
  const [petImage, setPetImage] = useState("");

  const handleInputChange = (e) => {
    if (e.target.type === "checkbox") {
      setPetInputs({ ...petInputs, [e.target.name]: e.target.checked });
      return;
    }
    setPetInputs({ ...petInputs, [e.target.name]: e.target.value });
  };

  const handleAddPet = async (e) => {
    if (petDetails) {
      e.preventDefault();
      const res = await axios.put(
        `http://localhost:8080/pets/${petDetails.petId}`,
        petInputs,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        alert("Updated succesfully");
        console.log(res.data);
      }
      setMoveToEditPet(false);
    } else {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:8080/pets",
        petInputs,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Added succesfully");
        console.log(response.data);
      }
    }
  };

  const handleImg = (e) => {
    setPetImage(e.target.files[0]);
  };

  return (
    <>
      <form onSubmit={handleAddPet} className="add-pet-form">
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Link to photo
          </span>
          <input
            type="url"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            value={petInputs.photo}
            onChange={handleInputChange}
            name="photo"
          ></input>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          value={petInputs.type}
          onChange={handleInputChange}
          name="type"
        >
          <option selected>Pet type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="Other">Other</option>
        </select>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="Name"
          aria-label=".form-control-sm example"
          value={petInputs.name}
          onChange={handleInputChange}
          name="name"
        ></input>
        <select
          className="form-select"
          aria-label="Default select example"
          value={petInputs.adoptionStatus}
          onChange={handleInputChange}
          name="adoptionStatus"
        >
          <option selected>Status</option>
          <option value="Available">Available</option>
          <option value="Fosterd">Fosterd</option>
          <option value="Adopted">Adopted</option>
        </select>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Height (cm)
          </span>
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={petInputs.height}
            onChange={handleInputChange}
            name="height"
          ></input>
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">
            Weight (kg)
          </span>
          <input
            type="number"
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            value={petInputs.weight}
            onChange={handleInputChange}
            name="weight"
          ></input>
        </div>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="Color"
          aria-label=".form-control-sm example"
          value={petInputs.color}
          onChange={handleInputChange}
          name="color"
        ></input>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            value={petInputs.bio}
            onChange={handleInputChange}
            name="bio"
          ></textarea>
          <label for="floatingTextarea">Bio</label>
        </div>
        <div>
          <input
            type="checkbox"
            checked={petInputs.hypoallergenic}
            id="hypo-check"
            onChange={handleInputChange}
            name="hypoallergenic"
          ></input>
          <label for="hypo-check" id="hypo">
            Hypoallergenic
          </label>
        </div>
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea"
            value={petInputs.dietaryrRestrictions}
            onChange={handleInputChange}
            name="dietaryrRestrictions"
          ></textarea>
          <label for="floatingTextarea">Dietary restrictions</label>
        </div>
        <input
          className="form-control form-control-sm"
          type="text"
          placeholder="Breed"
          aria-label=".form-control-sm example"
          value={petInputs.breed}
          onChange={handleInputChange}
          name="breed"
        ></input>
        {petDetails ? (
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        ) : (
          <button type="submit" className="add-pet-button">
            Add pet
          </button>
        )}
      </form>
    </>
  );
}
