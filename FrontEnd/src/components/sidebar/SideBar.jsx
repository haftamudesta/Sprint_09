import { useState } from "react"
import SearchUser from "./SearchUser"
import UsersList from "./UsersList"

const SideBar = () => {
  const [searchKey,setSearchKey]=useState('')
  return (
    <div className="w-[55%] bg-gray-300">
      <SearchUser searchKey={searchKey} setSearchKey={setSearchKey}/>
      <UsersList searchKey={searchKey}/>
    </div>
  )
}
export default SideBar