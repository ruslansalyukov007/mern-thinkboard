import { useEffect, useState } from "react";
import {toast} from 'react-hot-toast'
import api from "../lib/axios.js";
import RateLimited from "../components/RateLimited.jsx";
import NoteCard from "../components/NoteCard.jsx";
import NoteNotFound from "../components/NoteNotFound.jsx";

const HomePage = () => {

	const [notes, setNotes] = useState([]);
	const [isRateLimited, setIsRateLimited] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(()=> {
		const fetchNotes = async () => {
			try {
				const res = await api.get('/notes')
				setNotes(res.data)
				console.log(res.data)
			} catch (error) {
				console.log('Error fetching notes', error)
				console.log(error)
				if(error.response?.status === 429) {
					setIsRateLimited(true);
				} else {
					toast.error('Failed to fetching note')
				}
			} finally {
				setLoading(false)
			}
		}
		fetchNotes()
	},[])


	return (

		<div>
			{isRateLimited && <RateLimited/>}

			<div className="">
				{loading && <div className="loading loading-lg">Loading...</div>}

			{notes.length === 0 && !isRateLimited && <NoteNotFound/>}

			{notes.length > 0 && !isRateLimited && (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{notes.map((note)=>{
						return <NoteCard key={note._id} note={note} setNotes={setNotes}/>
					})}
				</div>
			)}
			</div>
		</div>
	);
}

export default HomePage;
