import { } from 'react'
import Header from './components/Header/Header'
import Toolbar from './components/Toolbar/Toolbar'
import BookContextProvider from './context/BooksContext'
import Container from './components/Container/Container'

export default function App() {

  return (
    <BookContextProvider>
    <div>
      <Header />
      <Toolbar />
      <Container />
    </div>
    </BookContextProvider>
  )
}

