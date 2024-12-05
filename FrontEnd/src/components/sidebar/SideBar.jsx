import { useState } from "react"
import SearchUser from "./SearchUser"
import UsersList from "./UsersList"

const SideBar = ({socket}) => {
  const [searchKey,setSearchKey]=useState('')
  return (
    <div className="w-[55%] bg-gray-300">
      <SearchUser searchKey={searchKey} setSearchKey={setSearchKey}/>
      <UsersList searchKey={searchKey} socket={socket}/>
    </div>
  )
}
export default SideBar