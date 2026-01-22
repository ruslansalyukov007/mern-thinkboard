import {Route, Routes} from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailsPage from './pages/NoteDetailsPage'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'


function App() {

  return (
	<div className='min-h-screen' data-theme='forest'>
		<Navbar/>
		<div className="max-w-7xl m-auto p-6">
		<Routes>
			<Route path='/' element={<HomePage/>}/>
			<Route path='/create' element={<CreatePage/>}/>
			<Route path='/note/:id' element={<NoteDetailsPage/>}/>
		</Routes>
		</div>
		<Toaster/>
	</div>
  )
}

export default App
