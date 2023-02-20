import { useState } from 'react'
import Header from './components/header'
import Footer from './components/footer'
import Table from './components/table'
import { useAppSelector, useAppDispatch } from './components/app/hooks'
// import { increment } from './components/app/counterSlice'


function App() {
const dispatch = useAppDispatch();

  // const count = useAppSelector((store) => {
  //   return store.counter.counterValue
  // }
  // )

  

  return (
    <div >
   <Header />
 <Table />
   <Footer />
    </div>
  )
}

export default App
