import {GlobeLock} from 'lucide-react'

const RateLimited = () => {
	return (
		<div className="max-w-6xl m-auto p-7">
			<div className="flex items-center gap-5 p-6 rounded-2xl border border-green-400/30 bg-primary/2">
				<div className="shrink-0 rounded-full bg-primary/10 p-4">
					<GlobeLock className="size-12"/>
				</div>
				<div className="flex flex-col gap-1">
					<h2 className="font-bold text-error">Rate Limit Reached</h2>
					<p className="text-white">You're made too many requests in a short period. Please wait a moment.</p>
					<span className="">Try again in a few seconds for the best experience.</span>
				</div>
			</div>
		</div>

	 );
}

export default RateLimited;
