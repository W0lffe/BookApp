import Header from './components/Header/Header'
import Modal from './components/Modal/Modal'
import BookContextProvider from './context/BooksContext'
import Container from './components/Container/Container'

export default function App() {

  return (
    <BookContextProvider>
    <div>
      <Header />
      <Modal />
      <Container />
    </div>
    </BookContextProvider>
  )
}

