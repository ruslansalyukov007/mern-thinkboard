import { SquarePen, Trash2 } from 'lucide-react';
import { Link } from 'react-router'
import { formatDate } from '../lib/utils';
import api from '../lib/axios';
import toast from 'react-hot-toast';

const NoteCard = ({note, setNotes}) => {



	const handleDelete = async (e, id) => {
		e.preventDefault()

		if(!window.confirm('Are you sure you want to delete this note?')) return;

		try {
			await api.delete(`/notes/${id}`)
			toast.success('Delete note success')
			setNotes((prev)=> prev.filter((note) => note._id !==id))
		} catch (error) {
			console.log('Error delete note', error)
			toast.error('Failed to delete note')
		}
	}


	return (
		<Link to={`/note/${note._id}`} className="card rounded-2xl max-w-96 bg-black/50 transition-all border-t-6 border-primary">
			<div className="card-body">
				<h3 className="card-title">{note.title}</h3>
				<p className="text-base-content/70 uppercase mb-3">{note.content}</p>
				<div className="card-actions justify-between items-center">
					<div className="font-medium">{formatDate(new Date(note.createdAt))}</div>
					<div className="flex items-center gap-3">
						<SquarePen className="size-4"/>
						<button onClick={(e)=>handleDelete(e,note._id)} className="btn text-error">
							<Trash2 className="size-4"/>
						</button>
					</div>
				</div>
			</div>
		</Link>

	 );
}

export default NoteCard;
