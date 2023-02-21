import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {  setShowallAnimals } from "./app/animalSlice"
import {  setAddSpecies } from "./app/speciesSlice"
import { useSelector } from "react-redux";


const Values = {
  id: "",
  name: "",
  image: "",
  species: ""
}

function Header() {
  const [showAddAnimalInput, setShowAddAnimalInput] = useState(false)
  const [valuesToSave, setValuesToSave] = useState(Values)

  const [showSpeciesForm, setShowSpeciesForm] = useState(false); 

  const speciesList = useAppSelector((store)=>{
    return store.myAllSpecies
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
    dispatch(setShowallAnimals(valuesToSave))

    // "Šito vajadzes kad pievienos pareizu input lauku"
    if (!speciesList.includes(valuesToSave.species)){
      dispatch(setAddSpecies(valuesToSave.species))
    }
    setShowAddAnimalInput(false);    
    setShowSpeciesForm(false)
     }
  }

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
            { showSpeciesForm ? 
              <>
            <label>Add species
            <input 
            type="text"
            placeholder="Animal species"
            name="species"
            onChange={(e) => handleInputChange(e)}
            />
            </label>
            </>
            //  : " not value"
             : 
            (
              <>
              <label htmlFor=""> Choose Species 
              <button
               className="button button-clear"
              onClick={ () => setShowSpeciesForm(true)}
              > add new species</button>
              </label>
              <select 
              name="species" 
              onChange={(e) => handleInputChange(e)}
              >
              <option value="" disabled>Select dropdiwn</option>
             {speciesList.map(species => (
              <option value={species}>{species}</option>
             ))}
              </select>
              </>
            )
            }
            <button>save my values</button>
          </form>
        </>
      }

    </section>
  )
}

export default Header
