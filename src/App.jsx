import Header from './components/Header/Header'
import BookContextProvider from './context/BooksContext'
import Container from './components/Container/Container'

export default function App() {

  return (
    <BookContextProvider>
    <div>
      <Header />
      <Container />
    </div>
    </BookContextProvider>
  )
}

