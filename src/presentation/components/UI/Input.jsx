export default function Input({ icon, type, placeholder, ...props }) {
	return (
		<div className="bg-gray-100 dark:bg-zinc-800 py-3 px-4 rounded-lg flex items-center gap-3 border border-transparent focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
			{icon && (icon)}
			<input
				className="bg-transparent dark:text-white placeholder-gray-500 outline-none w-full text-sm focus:outline-none focus:ring-0"
				type={type}
				placeholder={placeholder}
				{...props}
			/>
		</div>
	);
}