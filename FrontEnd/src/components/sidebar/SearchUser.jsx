import { IoSearchCircleOutline } from "react-icons/io5";

const SearchUser = ({searchKey,setSearchKey}) => {
  return (
    <div className="flex w-[90%] relative">
        <input type="text" placeholder="search user to chat" className="text-black placeholder:text-red-400 placeholder:pl-3 rounded-full pl-2"
        value={searchKey}
        onChange={(e)=>setSearchKey(e.target.value)}
        />
        <IoSearchCircleOutline className="text-lg text-gray-600 absolute font-bold  ml-40 items-center mt-0.5"/>
    </div>
  )
}

export default SearchUser