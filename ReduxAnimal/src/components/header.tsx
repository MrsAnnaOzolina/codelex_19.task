import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "./app/hooks";

import { Animal, setLoading, setShowallAnimals } from "./app/counterSlice"

const Values = {
  id: "",
  name: "",
  image: "",
  species: ""
}

function Header() {
  const [showAddAnimalInput, setShowAddAnimalInput] = useState(false)
  const [valuesToSave, setValuesToSave] = useState(Values)
  const [allValuesSaved, setAllValuesSaved] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("animals")!;
    const initialValue = JSON.parse(saved);
    return initialValue || [];

  })
  const dispatch = useAppDispatch()


  const handleInputChange = (g: any) => {
    const target = g.target;
    const value = target.value;
    const name: string = target.name;


    setValuesToSave({
      ...valuesToSave,
      [name]: value,
      id: uuidv4()

    });
  }

  const saveChangesSubmit = (e: any) => {
    e.preventDefault();
    setAllValuesSaved([...allValuesSaved, valuesToSave])
    setShowAddAnimalInput(false);
    localStorage.setItem("animals", JSON.stringify(allValuesSaved));

  }

  localStorage.setItem("animals", JSON.stringify(allValuesSaved));
  dispatch(setShowallAnimals(allValuesSaved))

  return (

    <section className="Section container" id="hero" style={{ display: "grid", justifyContent: "center" }}>
      <div className="Hero">
        <h1 className="Hero__title">Animals</h1>
      </div>
      <p className="Hero__description">Add you animal here:</p>
      <button onClick={() => setShowAddAnimalInput(!showAddAnimalInput)}>Add Animal</button>
      {showAddAnimalInput &&
        <>

          <form
            action=""
            onSubmit={(e) => { saveChangesSubmit(e) }}
          >
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Animal name"
              name="name"
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="">Image</label>
            <input
              type="text"
              placeholder="Animal image"
              name="image"
              onChange={(e) => handleInputChange(e)}
            />
            <label htmlFor="">Choose species</label>
            <select
              id="ageRangeField"
              name="species"
              onChange={(e) => handleInputChange(e)}
            >
              <option value="bovid">Bovid</option>
              <option value="feline">Feline</option>
              <option value="canine">Canine</option>
              <option value="mustelid">Mustelid</option>
              <option value="hominid">Hominid</option>
              <option value="cricetid">Cricetid rodent</option>
              <option value="cervid">Cervid</option>
              <option value="beaver">Beaver</option>
              <option value="hyena">Hyene</option>
              <option value="hippopotamus">Hippopotamus</option>
              <option value="procyonid">Procyonid</option>
              <option value="manatee">Manatee</option>
              <option value="anteater">Anteater</option>
              <option value="cebidae">Cebidae</option>
              <option value="viverrid">Viverid</option>
              <option value="cercopithecidea">Cercopithecidea</option>
            </select>
            <button>save my values</button>
          </form>
          {/* 
    <button onClick={()=> { localStorage.setItem("animals", JSON.stringify(allValuesSaved));
}}>Add to list</button> */}
        </>
      }
    </section>
  )
}

export default Header
