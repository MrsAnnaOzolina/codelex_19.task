
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setLoading, setShowallAnimals } from "./app/animalSlice"

const Table = () => {
  // const [hideTable, setHideTable] = useState(true)
  const dispatch = useAppDispatch()
  const { allAnimals, loading } = useAppSelector((store) => {
    return store.myAllAnimals
  })

  useEffect(() => {
    dispatch(setLoading(true))
    let data = localStorage.getItem('animals')!;
    data = JSON.parse(data);
    //@ts-ignore
    dispatch(setShowallAnimals(data))
    dispatch(setLoading(false))


  }, [])

  const deleteItem = (e: any) => {
    const serachId = allAnimals.filter(allAnimals => allAnimals.id != e.target.name)
    console.log(serachId)

    localStorage.setItem("animals", JSON.stringify(serachId));
    window.location.reload()

  }

  const [saveInputToSearch, setSaveInputToSearch] = useState("")
  const changeInput = (e) => {
    setSaveInputToSearch(e.target.value)
  }
  const searchValue = (e) => {
    e.preventDefault();
    if (saveInputToSearch === "Bovid" ||
      saveInputToSearch === "Feline" ||
      saveInputToSearch === "Canine" ||
      saveInputToSearch === "Mustelid" ||
      saveInputToSearch === "Homind" ||
      saveInputToSearch === "Cricetid Rodent" ||
      saveInputToSearch === "Cervid" ||
      saveInputToSearch === "Beaver" ||
      saveInputToSearch === "Hyena" ||
      saveInputToSearch === "Hippopotamus" ||
      saveInputToSearch === "Procyonid" ||
      saveInputToSearch === "Manatee" ||
      saveInputToSearch === "Anteater" ||
      saveInputToSearch === "Cebidae" ||
      saveInputToSearch === "Viverrid" ||
      saveInputToSearch === "Cercopithecidea") {
      const serachId = allAnimals.filter(allAnimals => allAnimals.species.match(saveInputToSearch))
      console.log(serachId)
      dispatch(setShowallAnimals(serachId))
    }
    else {
      let data = localStorage.getItem('animals')!;
      data = JSON.parse(data);
      //@ts-ignore
      dispatch(setShowallAnimals(data))
    }

  }

  if (loading) {
    return <h1>Loading... </h1>
  }
  return (

    <div>
      {allAnimals.length > 0 ?
        <div>
          <form
            onSubmit={(e) =>
              // setHideTable(false)
              searchValue(e)
            }
          >
            <label htmlFor="">
              Search  your favorite species
            </label>
            <input type="text" placeholder="search species" onChange={(e) => changeInput(e)} />
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

              {allAnimals.map(({ id, name, image, species }) => {
                return <tr key={id}>
                  <th>{name}</th>
                  <th><img src={image} alt="image" width="100px" /></th>
                  <th>{species}</th>
                  <th><button
                    name={`${id}`}
                    key={id}
                    onClick={(e) => { deleteItem(e) }}
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
