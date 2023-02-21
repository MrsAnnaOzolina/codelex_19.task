
import { useEffect, useRef, useState , useMemo} from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setLoading, setShowallAnimals,setRemoveAnimals } from "./app/animalSlice"

const Table = () => {
  const [searchValue, setSearchValue] = useState("")
  
  const dispatch = useAppDispatch()
 

  const { allAnimals, loading } = useAppSelector((store) => {
    return store.myAllAnimals
  })

  const species = useMemo(()=>{
if(!searchValue){
  return allAnimals
} return allAnimals.filter((species) => {
  return species.species.toLowerCase().includes(searchValue.toLocaleLowerCase())})

  }, [searchValue, allAnimals])


  if (loading) {
    return <h1>Loading... </h1>
  }
  return (

    <div>
      {allAnimals.length > 0 ?
        <div>
          <form
          >
            <label htmlFor="">
              Search  your favorite species
            </label>
            <input type="text" 
            placeholder="search species" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} 
            />
          </form>

          <table style={{ margin: "30px" }}>
            <thead>
              <tr>
                <th>Animal name</th>
                <th>Picture</th>
                <th>Species</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>

              {species.map(({ id, name, image, species }) => {
                return <tr key={id}>
                  <th>{name}</th>
                  <th><img src={image} alt="image" width="100px" /></th>
                  <th>{species}</th>
                  <th><button
                    name={`${id}`}
                    key={id}
                    onClick={() =>  dispatch(setRemoveAnimals(id)) }
                  >X</button></th>
                </tr>

              })

              }
            </tbody>
          </table>  </div>
        :
        <div>
          <h4
            style={{
              display: "flex",
              justifyContent: "center",
              color: "red"
            }}
          >
            No animals added , please add animals
          </h4>
        </div>
      }
    </div>
  )
}

export default Table
