import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "./app/hooks";

import { Animal, setLoading, setShowallAnimals } from "./app/animalSlice"



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
    if(!valuesToSave.name && !valuesToSave.image && !valuesToSave.species){
      alert("no values added")
    }
     else if  (valuesToSave.name.length < 3 ){
      alert("Name should contain atleast 3 characters")
    } else if (!valuesToSave.name.match(/^[A-Za-z]+$/)) {
      alert("Name should contain letters")
     } else if(valuesToSave.name.length > 30) {
      alert("Name shouldn't be longer then 30 characters")
     }
     else if (!valuesToSave.image.match(/jpg/) && !valuesToSave.image.match(/png/) && !valuesToSave.image.match(/webp/) && !valuesToSave.image.match(/gif/)) {
      alert("link doesn't contain jpg, png, webp, gif formats")
     }  
     else if (!valuesToSave.image.match(/^(ftp|http|https):\/\/[^ "]+$/)) {
      alert("not correct format to picture link")
     }
     else {

    setAllValuesSaved([...allValuesSaved, valuesToSave])
    setShowAddAnimalInput(false);
    localStorage.setItem("animals", JSON.stringify(allValuesSaved));
    
     }
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
              <option value="Bovid">Bovid</option>
              <option value="Feline">Feline</option>
              <option value="Canine">Canine</option>
              <option value="Mustelid">Mustelid</option>
              <option value="Hominid">Hominid</option>
              <option value="Cricetid Rodent">Cricetid rodent</option>
              <option value="Cervid">Cervid</option>
              <option value="Beaver">Beaver</option>
              <option value="Hyena">Hyene</option>
              <option value="Hippopotamus">Hippopotamus</option>
              <option value="Procyonid">Procyonid</option>
              <option value="Manatee">Manatee</option>
              <option value="Anteater">Anteater</option>
              <option value="Cebidae">Cebidae</option>
              <option value="Viverrid">Viverid</option>
              <option value="Cercopithecidea">Cercopithecidea</option>
            </select>
            <button>save my values</button>
          </form>
        </>
      }

    </section>
  )
}

export default Header
