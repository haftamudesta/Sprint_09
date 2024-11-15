import { useSelector } from "react-redux"

const NavBar = () => {
        const currentUser=useSelector(state=>state.user.currentUser)
  return (
    <main>
        <div className="p-4">
        <div className="flex justify-between mt-8">
                <div className="text-pink-500">
                        <p>My Chat App</p>
                </div>
                <div className="flex gap-8">
                        <p>{currentUser?.name}</p>
                </div>
        </div>
        </div>
    </main>
  )
}

export default NavBar