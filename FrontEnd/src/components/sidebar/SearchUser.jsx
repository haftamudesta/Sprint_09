import { IoSearchCircleOutline } from "react-icons/io5";

const SearchUser = ({searchKey,setSearchKey}) => {
  return (
    <div className="flex h-6 relative">
        <input type="text" placeholder="search user to chat" className="text-black placeholder:text-red-400 placeholder:pl-3 rounded-full w-[100%]"
        value={searchKey}
        onChange={(e)=>setSearchKey(e.target.value)}
        />
        <IoSearchCircleOutline className="text-lg text-gray-600 absolute font-bold  ml-[95%] items-center mt-0.5"/>
    </div>
  )
}

export default SearchUser