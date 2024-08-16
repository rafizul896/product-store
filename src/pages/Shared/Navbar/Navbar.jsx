import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const [open, setOpen] = useState(false);

    const links = <>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-[#2557a7] text-base font-medium" : "text-base font-medium"}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? "text-[#2557a7] text-base font-medium" : "text-base font-medium"}>Products</NavLink>
    </>

    const handleLogOut = () => {
        logOut()
    }

    return (
        <div className='navbar px-0 w-[90%] md:w-[90%] lg:w-[80%] mx-auto'>
            <div className='flex-1'>
                <div className="dropdow">
                    <div onClick={() => setOpen(!open)} className="lg:hidden text-2xl md:text-3xl">
                        {
                            open ? <IoClose /> : <FiMenu />
                        }
                    </div>
                    <ul className={`${open ? 'block' : 'hidden'} absolute menu menu-md dropdown-content mt-3 z-[5] p-2 shadow bg-base-300 rounded-box w-[200px] flex gap-3 py-5  text-center items-center justify-center`}>
                        {links}
                    </ul>
                </div>
                <div className='flex gap-2 lg:gap-0 items-center'>
                    <img className='w-auto h-7' src='' alt='' />
                    <Link to="/" className='font-bold text-xl md:text-4xl '>Influencer products</Link>
                </div>
            </div>
            <div className='flex-none flex items-center gap-1 md:gap-0'>
                <ul className='menu menu-horizontal items-center px-2'>
                    <div className="flex gap-5 items-center">
                        <div className="hidden lg:flex gap-5">
                            {links}
                        </div>
                        {
                            !user && (
                                <NavLink to="/login" className={({ isActive }) => isActive ? "text-[#2557a7] text-base font-medium" : "text-base font-medium"}>Login</NavLink>
                            )
                        }
                        {
                            !user && (
                                <NavLink to="/register" className={({ isActive }) => isActive ? "text-[#2557a7] text-base font-medium" : "text-base font-medium"}>Sign Up</NavLink>
                            )
                        }
                    </div>
                </ul>
                {
                    user &&

                    <div className='dropdown dropdown-end z-50 ml-2'>
                        <div
                            tabIndex={0}
                            role='button'
                            className='avatar hover:tooltip-open tooltip-left'
                        >
                            <div className='w-10 rounded-full ' title=''>
                                <img
                                    referrerPolicy='no-referrer'
                                    alt='User Profile Photo'
                                    src={user.photoURL}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
                        >
                            <li>
                                <p>
                                    {user.displayName}
                                </p>
                            </li>
                            <li>
                                <p>
                                    {user.email}
                                </p>
                            </li>
                            <li className='mt-2'>
                                <button onClick={handleLogOut} className='bg-gray-200 block text-center'>Logout</button>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Navbar;