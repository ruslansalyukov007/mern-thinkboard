import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";

const CreatePage = () => {


	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();


	const handleSubmit = async (e) => {
		e.preventDefault()

		if(!title.trim() || !content.trim()) {
			toast.error('All field are required')
			return;
		}

		setLoading(true)
		try {
			await api.post('/notes/', {title, content})
			toast.success('Created note success')
			navigate('/')
		} catch (error) {
			console.log('Error creating note', error)
			if(error.response.status === 429) {
				toast.error("Slow down! You're creating notes too fast", {
					duration: 4000
				})
			} else {
				toast.error('Failed to creating note')
			}
		} finally {
			setLoading(false)
		}
	}



	return (
		<div className="max-w-2xl m-auto p-7">
			<Link to={'/'} className="btn btn-ghost mb-5">
				<ArrowLeftIcon/>
				Back to Notes
			</Link>
			<div className="bg-black/50 border-t-6 border-primary p-8 rounded-4xl">
				<h2 className="text-2xl mb-4 font-medium">Create New Note</h2>
				<form onSubmit={handleSubmit}>
					<div className="flex flex-col gap-5">
						<p className="flex flex-col gap-2">
							<label htmlFor="label">Title</label>
							<input
								onChange={(e)=>setTitle(e.target.value)}
								type="text"
								id="title"
								placeholder="Note Title"
								className="input w-full focus:outline-0 rounded-2xl text-[16px] placeholder:text-[16px]"/>
						</p>
						<p className="flex flex-col gap-2">
							<label htmlFor="content">Content</label>
							<textarea
								onChange={(e)=>setContent(e.target.value)}
								id="content"
								placeholder="White your note here..."
								className="textarea w-full focus:outline-0 rounded-2xl text-[16px] placeholder:text-[16px]">
							</textarea>
						</p>
						<div className="card-actions justify-end">
						<button className="btn btn-primary" disabled={loading} >
							{loading ? "Creating..." : "Create Note"}
						</button>
						</div>
					</div>
				</form>
			</div>
		</div>

	 );
}

export default CreatePage;
