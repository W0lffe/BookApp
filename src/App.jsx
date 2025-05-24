import Header from './components/Header/Header'
import BookContextProvider from './context/BooksContext'
import Container from './components/Container/Container'

export default function App() {

  return (
    <BookContextProvider>
    <div className='flex flex-col w-full h-full items-center'>
      <Header />
      <Container />
    </div>
    </BookContextProvider>
  )
}

