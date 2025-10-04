import './App.css'
import { Feed } from './pages/Feed/Feed'
import { QueryProvider } from './providers/QueryProvider'

function App() {

  return (
    <QueryProvider>
      <Feed />
    </QueryProvider>
  )
}

export default App
