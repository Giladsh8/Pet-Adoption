import { Route, Routes } from "react-router-dom";
import FirstGreet from "./Components/FirstGreet";
import Search from "./Components/Search";
import AddPet from "./Components/addPet";
import PetList from "./Components/PetList";
import PetPage from "./PetPage";
import PetsContextProvider from "./Components/PetsContext";
import Header from "./Components/Header";
import MyPets from "./Components/MyPets";
import Admin from "./Components/Admin";
import Signup from "./Components/Signup";

function App() {
  return (
    <div>
      <PetsContextProvider>
        <Header></Header>
        <Routes>
          <Route path="/" element={<FirstGreet />}></Route>
          <Route path="/pets" element={<PetList />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/addPet" element={<AddPet />}></Route>
          <Route path="/pets/:petId" element={<PetPage />}></Route>
          <Route path="/myPets" element={<MyPets />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </PetsContextProvider>
    </div>
  );
}

export default App;
