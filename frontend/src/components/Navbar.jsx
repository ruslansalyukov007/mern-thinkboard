import {PlusIcon} from 'lucide-react'
import { useNavigate } from 'react-router';

const Navbar = () => {

	const navigate = useNavigate()


	return (
		<header className="border-b border-base-content/10 bg-black/50">
			<div className="max-w-7xl m-auto p-7">
				<div className="flex items-center justify-between">
					<h1 className="text-primary font-bold text-4xl">ThinkBoard</h1>
					<button onClick={()=>navigate('/create')} className='flex items-center gap-3 btn btn-soft btn-primary'>
						<PlusIcon/>
						New Note
					</button>
				</div>
			</div>
		</header>
	 );
}

export default Navbar;
