import { FaRegTrashAlt } from "react-icons/fa";
import { BsPatchExclamation } from "react-icons/bs";

export default function PostDropdownActions({ me }) {
  return (
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-black themed-border rounded-lg min-h-[50px] w-[150px]">
    	<p className="text-sm font-semibold select-none text-red-500 flex items-center gap-2 p-4 cursor-pointer hover:bg-red-100 dark:hover:bg-zinc-700 rounded-lg">
    	  <BsPatchExclamation />
    	  Report
    	</p>
      <p className="text-sm font-semibold select-none text-red-500 flex items-center gap-2 p-4 cursor-pointer hover:bg-red-100 dark:hover:bg-zinc-700 rounded-lg">
        <FaRegTrashAlt />
        Delete Post
      </p>
    </div>
  );
}
