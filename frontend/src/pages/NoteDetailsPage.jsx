import { ArrowLeftIcon, LoaderIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteDetailsPage = () => {


	const [note, setNote] = useState(null);
	const [saving, setSaving] = useState(false);
	const [loading, setLoading] = useState(true)

	const {id} = useParams()
	const navigate = useNavigate()

	useEffect(()=> {

		const notes = async () => {
			try {
				const res = await api.get(`/notes/${id}`)
				setNote(res.data)
				console.log(res.data)
			} catch (error) {
				console.log('Error fetching notes', error)
			} finally {
				setLoading(false)
			}
		}
		notes()
	}, [id])

	const handleDelete = async (e) => {
		e.preventDefault()

		if(!window.confirm('Are you sure you want to delete this note?')) return;

		try {
			await api.delete(`/notes/${id}`)
			toast.success('Delete note success')
			navigate('/')
		} catch (error) {
			console.log('Error delete success')
			toast.error('Failed to delete success')
		}
	}

	const handleSave = async () => {

		if(!note.title.trim() || !note.content.trim()) {
			toast.error('Please add a title or content')
			return;
		}

		setSaving(true)
		try {
			await api.put(`/notes/${id}`, note)
			toast.success('Updated note success')
			navigate('/')
		} catch (error) {
			console.log('Error updated note', error)
			toast.error('Failed to deleted note')
		} finally {
			setSaving(false)
		}
	}


	if(loading) {
		return (
			<div className="flex items-center justify-center min-h-[80vh]">
				<LoaderIcon className="animate-spin size-10">Loading...</LoaderIcon>
			</div>
		)
	}

	return (
		<div className="max-w-2xl m-auto p-7">
			<div className="flex items-center justify-between">
				<Link to={'/'} className="btn btn-ghost mb-5">
					<ArrowLeftIcon/>
					Back to Notes
				</Link>
				<button className="btn text-error border-error mb-5" onClick={handleDelete}>
					<Trash2 className="size-4"/>
					Delete Note
				</button>
			</div>
			<div className="bg-black/50 border-t-6 border-primary p-8 rounded-4xl">
				<div className="flex flex-col gap-5">
					<p className="flex flex-col gap-2">
						<label htmlFor="label">Title</label>
						<input
							value={note.title}
							onChange={(e)=>setNote({...note, title: e.target.value})}
							type="text"
							id="title"
							className="input w-full focus:outline-0 rounded-2xl text-[16px] placeholder:text-[16px]"/>
					</p>
					<p className="flex flex-col gap-2">
						<label htmlFor="content">Content</label>
						<textarea
							value={note.content}
							onChange={(e)=>setNote({...note, content: e.target.value})}
							id="content"
							className="textarea w-full focus:outline-0 rounded-2xl text-[16px] placeholder:text-[16px]">
						</textarea>
					</p>
					<div className="card-actions justify-end">
					<button className="btn btn-primary" disabled={saving} onClick={handleSave} >
						{saving ? "Saving..." : "Save Changes"}
					</button>
					</div>
				</div>
			</div>
		</div>

	 );
}

export default NoteDetailsPage;
