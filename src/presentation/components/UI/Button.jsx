export default function Button({ children, className, ...props }) {
	return (
		<button className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition font-semibold w-full ${className}`} {...props}>
			{ children }
		</button>
	);
}