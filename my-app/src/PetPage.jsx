import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { usePetsContext } from "./Components/PetsContext";
import AddPet from "./Components/addPet";

export default function PetPage() {
  const {
    changePetStatus,
    sendToLikedPets,
    deletFromLikedPets,
    checkIfLiked,
    ifLiked,
    changePetStatusAvailable,
    addToActivities,
    isAdmin,
    checkToken,
  } = usePetsContext();
  const params = useParams();
  const [petDetails, setPetDetails] = useState("");
  const [isOwned, setIfOwned] = useState("");
  const [moveToEditPet, setMoveToEditPet] = useState(false);

  useEffect(() => {
    showPetDetails();
    checkIfLiked(params.petId);
    checkIfPetOwned();
    checkToken();
  }, []);

  console.log(ifLiked);
  const showPetDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/pets/${params.petId}`,
        { withCredentials: true }
      );
      console.log("vookie", res.data);
      setPetDetails(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfPetOwned = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/pets/checkOwned/${params.petId}`,
        { withCredentials: true }
      );
      console.log(res.data);
      setIfOwned(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const addLikedPet = () => {
    const likedPet = {
      petId: petDetails.petId,
      name: petDetails.name,
    };
    sendToLikedPets(likedPet);
  };

  const deletLikedPet = () => {
    deletFromLikedPets(petDetails.petId);
  };

  const changeAdopt = () => {
    const adoptInfo = {
      adoptionStatus: "Adopted",
      petId: petDetails.petId,
      active: "Active",
    };
    changePetStatus(adoptInfo);
    addToActivities(adoptInfo);
  };

  const changeFoster = () => {
    const fosterInfo = {
      adoptionStatus: "Fosterd",
      petId: petDetails.petId,
      active: "Active",
    };
    changePetStatus(fosterInfo);
    addToActivities(fosterInfo);
  };

  const changeAvailable = () => {
    const availableInfo = {
      adoptionStatus: "Available",
      petId: petDetails.petId,
    };
    changePetStatusAvailable(availableInfo);
    addToActivities(availableInfo);
  };
  const editPet = () => {
    setMoveToEditPet((curret) => !curret);
  };
  return (
    <>
      <div className="pet-page">
        <div className="petCard">
          <div className="photoStatus">
            <img
              className="pet-photo"
              src={petDetails.photo}
              alt="Pet_photo"
              width="350"
              height="275"
            ></img>
            <p className="pet-status">{petDetails.adoptionStatus}</p>
          </div>
          {ifLiked ? (
            <button className="like-button" onClick={deletLikedPet}>
              Remove From Favorits
            </button>
          ) : (
            <button className="like-button" onClick={addLikedPet}>
              Add to Favorites
            </button>
          )}
          <div className="allDetails">
            <div className="name-logoPet">
              <p className="pet-name">{petDetails.name}</p>
              {petDetails.type === "dog" ? (
                <svg
                  className="svg"
                  width="80"
                  height="80"
                  viewBox="0 0 98 98"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M75.79 59.48V63.07C76.52 63.07 93.51 63.34 93.51 80.78C93.51 85.17 92.15 88.51 89.46 90.72C84.46 94.84 76.06 94.29 72.72 93.87V87.87C72.72 69.47 64.63 58.62 58.13 49.87C53.64 43.87 49.74 38.62 49.31 32.27C50.3148 31.7609 51.2009 31.0453 51.91 30.17C53.54 28.17 53.97 25.3 53.17 21.79C49.66 6.46001 39.02 0.890015 32.72 0.890015H27.11C19.2 0.890015 15.97 5.89001 15.11 9.51001L2.96 11.69C2.65995 11.7433 2.37847 11.8723 2.14223 12.0648C1.90598 12.2573 1.72278 12.5069 1.61 12.79C1.51 13.04 -0.830003 18.99 2.03 23.72C3.81 26.66 7.10001 28.39 11.79 28.86C14.98 29.17 19.39 29.74 20.79 30.97C21.44 31.54 21.45 32.39 21.3 34.66C21.25 35.47 21.19 36.37 21.19 37.39C20.99 38.92 19.19 53.48 19.19 58.02C19.2359 60.853 19.6872 63.6649 20.53 66.37C21 68.22 21.59 70.53 22.29 73.8C23.73 80.61 22.39 90 21.78 93.55H13.52V97.13H23.27C23.6834 97.1315 24.0845 96.9899 24.4053 96.7293C24.7262 96.4686 24.9469 96.1049 25.03 95.7C25.14 95.16 27.75 82.31 25.8 73.06C25.09 69.71 24.49 67.37 24 65.48C23.2372 63.0648 22.8263 60.5524 22.78 58.02C22.78 55.54 23.39 49.63 23.93 44.82L48.59 42.04C50.5461 45.544 52.7765 48.8878 55.26 52.04C61.76 60.76 69.14 70.64 69.14 87.85V96.85L70.58 97.14C72.7779 97.5342 75.007 97.7284 77.24 97.72C81.71 97.72 87.53 96.93 91.74 93.47C95.3 90.55 97.11 86.27 97.11 80.75C97.09 59.72 76 59.48 75.79 59.48ZM24.33 41.23C24.57 39.23 24.75 37.84 24.75 37.8C24.7549 37.7234 24.7549 37.6466 24.75 37.57C24.75 36.63 24.8 35.78 24.85 34.96C25.27 28.54 23.65 26.5 12.1 25.35C8.6 25.01 6.24 23.86 5.1 21.95C3.69 19.63 4.23 16.59 4.64 15.1L16.98 12.89C17.3682 12.8174 17.722 12.6197 17.9874 12.3272C18.2528 12.0347 18.4153 11.6634 18.45 11.27C18.45 11 19.1 4.55002 27.11 4.55002H32.72C37.63 4.55002 46.63 9.47001 49.63 22.64C50.17 25.03 49.98 26.83 49.06 27.99C47.89 29.46 45.39 30.2 41.62 30.2C33.9 30.2 33.67 12.67 33.67 12.49H30.08C30.08 13.36 30.21 33.79 41.62 33.79C43.0141 33.8037 44.4066 33.6899 45.78 33.45C45.9824 35.226 46.3953 36.9716 47.01 38.65L24.33 41.23Z"
                    fill="#101C1D"
                  />
                  <path
                    d="M22.9701 7.92999C22.4944 7.93264 22.0391 8.12344 21.7037 8.46072C21.3683 8.798 21.18 9.25433 21.18 9.73V12.51C21.1616 12.757 21.1943 13.0051 21.2762 13.2389C21.358 13.4727 21.4872 13.687 21.6557 13.8685C21.8242 14.0501 22.0283 14.1949 22.2554 14.2939C22.4824 14.393 22.7274 14.4441 22.9751 14.4441C23.2227 14.4441 23.4677 14.393 23.6948 14.2939C23.9218 14.1949 24.1259 14.0501 24.2944 13.8685C24.4629 13.687 24.5921 13.4727 24.6739 13.2389C24.7558 13.0051 24.7885 12.757 24.7701 12.51V9.73C24.7674 9.25342 24.577 8.79711 24.24 8.46011C23.903 8.12312 23.4466 7.93262 22.9701 7.92999Z"
                    fill="#101C1D"
                  />
                  <path
                    d="M44.72 93.64C41.03 86.72 40.1201 80.49 42.0201 75.11C45.0201 66.68 54.02 63 54.08 62.96L52.75 59.64C52.32 59.81 42.18 63.92 38.65 73.9C36.55 79.81 37.25 86.45 40.71 93.65H31.9V97.23H61.71V93.64H44.71H44.72Z"
                    fill="#101C1D"
                  />
                </svg>
              ) : petDetails.type === "cat" ? (
                <svg
                  className="svg"
                  width="71"
                  height="88"
                  viewBox="0 0 81 98"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.19 14.93C14.7126 14.93 14.2548 15.1196 13.9172 15.4572C13.5796 15.7948 13.39 16.2526 13.39 16.73V19.51C13.4238 19.9629 13.6276 20.3863 13.9605 20.6953C14.2934 21.0042 14.7308 21.1759 15.185 21.1759C15.6392 21.1759 16.0766 21.0042 16.4095 20.6953C16.7424 20.3863 16.9462 19.9629 16.98 19.51V16.73C16.9813 16.4941 16.936 16.2603 16.8466 16.0419C16.7573 15.8236 16.6256 15.6251 16.4593 15.4578C16.2929 15.2905 16.0951 15.1578 15.8773 15.0672C15.6595 14.9766 15.4259 14.93 15.19 14.93Z"
                    fill="#101C1D"
                  />
                  <path
                    d="M80.51 46.9L79.18 43.56C75.0683 45.4352 71.8302 48.8129 70.13 53C67.71 59 68.41 66.3 72.22 74.76C75.91 82.94 76.58 88.81 74.15 91.76C71.72 94.71 66.73 94.42 63.81 93.97V75.74C63.81 56.74 55.34 52.85 48.53 49.69C43.61 47.4 40.36 45.88 40.36 39.55C40.36 23.47 37.36 16.71 34 10.66C28.91 1.46 22.52 0.119986 22.25 0.0699865C21.989 0.0207491 21.7203 0.0292571 21.4629 0.0949041C21.2055 0.160551 20.9656 0.28175 20.76 0.449991C20.5572 0.618393 20.3939 0.82927 20.2816 1.06773C20.1693 1.30619 20.1107 1.56641 20.11 1.83V8.36999H17.73C14.5 8.36999 8.63002 10.17 7.73002 16.7H5.23002C5.05373 16.7013 4.87855 16.7283 4.71 16.78C3.25 17.23 0.770033 19.28 0.770033 24.17C0.759329 25.3058 0.975315 26.4324 1.40535 27.4837C1.83538 28.535 2.47081 29.4899 3.27446 30.2927C4.0781 31.0954 5.0338 31.7297 6.08561 32.1585C7.13743 32.5873 8.2642 32.802 9.40001 32.79C9.80001 32.79 10.27 32.79 10.76 32.74C12.17 32.67 14.3 32.55 14.9 33.36C15.17 33.74 15.66 35.04 14.2 38.94C11.6963 46.1235 10.4021 53.6727 10.37 61.28C10.3699 63.6775 10.7618 66.0589 11.53 68.33C12.03 70.1 12.66 72.33 13.43 75.96C14.84 82.62 13.54 90.51 12.91 93.62H4.63002V97.2H14.38C14.7795 97.2028 15.1683 97.0713 15.4839 96.8264C15.7995 96.5815 16.0235 96.2376 16.12 95.85C16.24 95.39 18.94 84.51 16.97 75.22C16.17 71.45 15.5 69.08 14.97 67.35C14.3028 65.396 13.9649 63.3448 13.97 61.28C14.0151 55.4842 14.8151 49.719 16.35 44.13L36.79 40.13C37.02 48.27 42.11 50.64 47.03 52.93C53.52 55.93 60.23 59.07 60.23 75.73V96.8L61.59 97.14C63.381 97.5508 65.2125 97.7588 67.05 97.76C70.35 97.76 74.39 97.03 76.91 94.02C80.33 89.92 79.91 82.94 75.51 73.28C72.13 65.77 71.43 59.43 73.44 54.41C74.7746 51.1106 77.2971 48.4311 80.51 46.9ZM17.79 31.24C16.05 28.86 12.79 29.04 10.57 29.16C10.14 29.16 9.75001 29.16 9.40001 29.16C8.74079 29.1694 8.08639 29.0465 7.47551 28.7986C6.86462 28.5507 6.30967 28.1827 5.84349 27.7165C5.3773 27.2503 5.00936 26.6954 4.76143 26.0845C4.51349 25.4736 4.39058 24.8192 4.40001 24.16C4.40001 21.5 5.31003 20.57 5.70003 20.28H9.44002C9.91475 20.28 10.37 20.0914 10.7057 19.7557C11.0414 19.42 11.23 18.9647 11.23 18.49C11.23 12.2 17.11 11.96 17.77 11.95H21.94C22.4148 11.95 22.87 11.7614 23.2057 11.4257C23.5414 11.09 23.73 10.6347 23.73 10.16V4.50999C25.59 5.57999 28.36 7.81999 30.89 12.39C33.79 17.62 36.41 23.45 36.76 36.48L17.59 40.23C19.13 36.01 19.2 33.16 17.79 31.24Z"
                    fill="#101C1D"
                  />
                  <path
                    d="M35.0099 93.64C31.2199 86.57 30.3599 80.89 32.4599 76.72C35.4599 70.72 43.83 69.67 43.92 69.66L43.4899 66.09C43.0699 66.14 33.18 67.39 29.27 75.09C26.78 79.99 27.3699 86.23 30.9899 93.65H24.2V97.23H51.9999V93.64H34.9999H35.0099Z"
                    fill="#101C1D"
                  />
                </svg>
              ) : (
                <svg
                  className="svg"
                  width="84"
                  height="90"
                  viewBox="0 0 94 102"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.39 45.45V48.85C15.4238 49.3029 15.6276 49.7263 15.9605 50.0352C16.2934 50.3442 16.7308 50.5159 17.185 50.5159C17.6392 50.5159 18.0766 50.3442 18.4095 50.0352C18.7424 49.7263 18.9462 49.3029 18.98 48.85V45.45C18.9462 44.9971 18.7424 44.5737 18.4095 44.2647C18.0766 43.9557 17.6392 43.7841 17.185 43.7841C16.7308 43.7841 16.2934 43.9557 15.9605 44.2647C15.6276 44.5737 15.4238 44.9971 15.39 45.45Z"
                    fill="#101C1D"
                  />
                  <path
                    d="M53.42 97.48C45.75 83.54 46.15 76.12 47.88 72.35C48.4147 71.1427 49.2147 70.0716 50.2207 69.2163C51.2266 68.361 52.4125 67.7436 53.69 67.41L53.01 63.89C51.1876 64.3313 49.4887 65.1796 48.0409 66.3711C46.593 67.5626 45.4337 69.0665 44.65 70.77C41.75 77.01 43.34 85.99 49.35 97.48H35.52V101.07H68.77V97.48H53.42Z"
                    fill="#101C1D"
                  />
                  <path
                    d="M83.9 81.19C81.5517 81.1919 79.2789 82.0204 77.48 83.53V75.27C77.48 51.01 64.92 48.38 54.82 46.27C48.43 44.93 43.33 43.87 41.33 38.27C45.33 30.38 42.01 12.27 37.56 5.61998C36.2497 3.50598 34.2181 1.93809 31.841 1.2064C29.464 0.474712 26.9023 0.62874 24.63 1.63998L23.63 2.11998V34.23H19.83L4.65317e-05 45.13V57.35C-0.0120533 58.6818 0.241995 60.0025 0.747292 61.2348C1.25259 62.4671 1.99895 63.586 2.94257 64.5259C3.88618 65.4658 5.00804 66.2077 6.24229 66.7081C7.47654 67.2085 8.79832 67.4573 10.13 67.44H11.38C13.84 67.37 17.57 67.28 18.95 69.07C19.78 70.15 19.82 72.01 19.06 74.6C16.31 84.03 20.62 93.03 23.39 97.5H17.33V101.09H30.57L28.21 98.17C28.12 98.06 19.21 86.86 22.51 75.61C23.61 71.85 23.36 68.91 21.79 66.88C19.3 63.64 14.47 63.77 11.28 63.88H10.13C9.26757 63.8937 8.41122 63.733 7.61244 63.4074C6.81365 63.0819 6.08893 62.5982 5.4818 61.9854C4.87467 61.3727 4.39766 60.6436 4.07945 59.8418C3.76123 59.0401 3.60837 58.1823 3.63004 57.32V47.22L20.79 37.78H27.21V4.51999C28.6178 4.15062 30.1081 4.25619 31.4497 4.82033C32.7913 5.38446 33.9093 6.3756 34.63 7.63998C38.53 13.49 41.63 31.18 37.91 37.16L37.48 37.84L37.71 38.62C40.13 46.85 47.25 48.34 54.14 49.78C64.32 51.91 73.94 53.93 73.94 75.27V91.2C73.94 93.1778 74.5265 95.1112 75.6253 96.7557C76.7242 98.4002 78.2859 99.6819 80.1132 100.439C81.9405 101.196 83.9511 101.394 85.891 101.008C87.8308 100.622 89.6126 99.6696 91.0111 98.2711C92.4096 96.8725 93.3621 95.0907 93.7479 93.1509C94.1338 91.2111 93.9357 89.2004 93.1788 87.3731C92.422 85.5459 91.1402 83.9841 89.4958 82.8853C87.8513 81.7865 85.9179 81.2 83.94 81.2L83.9 81.19ZM83.9 97.62C82.6303 97.62 81.389 97.2435 80.3333 96.538C79.2775 95.8326 78.4547 94.8299 77.9687 93.6568C77.4828 92.4837 77.3557 91.1929 77.6034 89.9475C77.8511 88.7021 78.4626 87.5582 79.3604 86.6604C80.2583 85.7625 81.4022 85.1511 82.6476 84.9034C83.8929 84.6556 85.1838 84.7828 86.3569 85.2687C87.53 85.7546 88.5326 86.5774 89.2381 87.6332C89.9435 88.689 90.32 89.9302 90.32 91.2C90.3214 92.0444 90.1563 92.8808 89.8344 93.6614C89.5125 94.442 89.04 95.1516 88.4438 95.7496C87.8477 96.3476 87.1396 96.8223 86.3599 97.1467C85.5803 97.471 84.7444 97.6387 83.9 97.64V97.62Z"
                    fill="#101C1D"
                  />
                </svg>
              )}
            </div>
            <div className="bhw">
              <p>
                <b>Breed</b> <br />
                {petDetails.breed}
              </p>
              <p>
                <b>Height</b> <br />
                {petDetails.height} cm
              </p>
              <p>
                <b>Weight</b> <br />
                {petDetails.weight}kg
              </p>
            </div>
            <div className="cbdh">
              <p>
                <b>color</b> {petDetails.color}
              </p>
              <p>
                <b>Bio</b> {petDetails.bio}
              </p>
              <p>
                <b>Dietary Restrictions</b> {petDetails.dietaryrRestrictions}
              </p>
              <p>
                <b>Hypoallergenic</b> {petDetails.hypoallergenic ? "Yes" : "No"}
              </p>
            </div>
          </div>
          {isOwned && (
            <div>
              <div className="pet-buttons">
                <button
                  disabled={petDetails.adoptionStatus === "Adopted"}
                  onClick={changeAdopt}
                >
                  Adopt
                </button>
                <button
                  disabled={
                    petDetails.adoptionStatus === "Fosterd" ||
                    petDetails.adoptionStatus === "Adopted"
                  }
                  onClick={changeFoster}
                >
                  Foster
                </button>
                {isAdmin ? <button onClick={editPet}>Edit Pet</button> : ""}
              </div>

              <button
                className="return-button"
                disabled={petDetails.adoptionStatus === "Available"}
                onClick={changeAvailable}
              >
                Return back to Adoption center &gt;
              </button>
            </div>
          )}
        </div>

        {moveToEditPet && (
          <div className="edit-pet">
            <AddPet
              petDetails={petDetails}
              setMoveToEditPet={setMoveToEditPet}
            />
          </div>
        )}
      </div>
    </>
  );
}
