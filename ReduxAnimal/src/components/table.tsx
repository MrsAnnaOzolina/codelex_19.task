
import { useEffect,useState } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {Animal, setLoading, setShowallAnimals } from "./app/animalSlice"

const Table =() => {
const [hideTable, setHideTable] = useState(true)
const dispatch = useAppDispatch()
const {allAnimals, loading} = useAppSelector((store)=>{
  return store.myAllAnimals
})

useEffect (()=>{
  dispatch(setLoading(true))
  let data = localStorage.getItem('animals')!;
  data = JSON.parse(data);
  //@ts-ignore
  dispatch(setShowallAnimals(data))
  dispatch(setLoading(false))
  

},[])

const [allValuesSaved, setAllValuesSaved]= useState(allAnimals)
// console.log(allValuesSaved)

const deleteItem =(e:any)=> {
  const serachId = allAnimals.filter(allAnimals => allAnimals.id != e.target.name)
  console.log(serachId)

  localStorage.setItem("animals", JSON.stringify(serachId));
  dispatch(setShowallAnimals(serachId))

}

if(loading){
  return <h1>Loading... </h1>
}
    return (
  
 <div>
   {allAnimals ? 
   <div>
    <form 
    onSubmit={()=> setHideTable(false)}
    >
    <label htmlFor="">
    Search  your favorite species
    </label>
    <input type="text"  placeholder="search species"/>
    </form>
 
    <table style={{margin: "30px"}}>
  <thead>
    <tr>
      <th>Animal name</th>
      <th>Picture</th>
      <th>Species</th>
      <th>Delete</th>
    </tr>
  </thead>
 
  <tbody>

   {allAnimals.map(({id, name,image,species})=> {
    return <tr key={id}>
      <th>{name}</th>
      <th><img src={image} alt="image" width="100px"/></th>
      <th>{species}</th>
      <th><button 
      name={`${id}`}  
      key={id}
      onClick={(e)=> {deleteItem(e)}}
      >X</button></th>
      </tr>
  
   })

   }

  </tbody> 
</table>  </div> : <div><h4 style={{display: "flex", justifyContent: "center", color: "red"}}>No animals added , please add animals</h4></div>

}
 </div>
    )
  }
  
  export default Table
  