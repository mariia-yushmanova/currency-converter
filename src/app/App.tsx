import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { MainPage } from '../feature/MainPage/MainPage'
import s from './App.module.css'
import * as api from './api'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    api
      .getSymbols()
      .then(data => dispatch({ type: 'INIT_SYMBOL', payload: data.symbols }))
  }, [dispatch])

  return (
    <div className={s.container}>
      <MainPage />
    </div>
  )
}

export default App
