import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {  motion } from "framer-motion";
import { LuMenu } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";

const NavMobile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [navitems, setnavitems] = useState([]);

    useEffect(() => {
        fetch('/navitems.json')
            .then(res => res.json())
            .then(data => setnavitems(data));
    }, []);

    //    framer variants
    const circleVariants = {
        hidden: {
            scale: 0
        },
        visible: {
            scale: 180,
            transition: {
                type: 'spring',
                striffness: 160,
                damping: 60,
            },
        }
    }

    const ulVariants = {
        hidden: {
            opacity: 0
        },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.1,
            },
        },
    };

    return (
        <nav className="relative z-10">
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer text-white">
                <LuMenu className="w-8 h-8" />
            </div>
            {/* circle */}
            <motion.div variants={circleVariants}
                inherit='hidden' animate={isOpen ? 'visible' : 'hidden'}
                className="w-4 h-4 rounded-full bg-[#14a55f] fixed top-0 right-0 "
            >
            </motion.div>
            {/* menu */}
            <motion.ul
                variants={ulVariants}
                inherit='hidden'
                animate={isOpen ? 'visible' : ''}
                className={`${isOpen ? 'right-0' : '-right-full'} fixed top-0 bottom-0 w-full flex flex-col justify-center items-center transition-all duration-300 overflow-hidden`}
            >
                {/* close icon */}
                <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer text-white absolute top-8 right-8">
                    <IoCloseSharp className="w-8 h-8" />
                </div>
                {
                    navitems?.map((item, index) => {
                        return (
                            <li className="mb-5 cursor-pointer" key={index}>
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) => isActive ? "transition-all duration-300 text-xl text-black" : "transition-all duration-300 text-xl"}
                                    onClick={()=>setIsOpen(!isOpen)}
                                >{item?.name}</NavLink>
                            </li>
                        )
                    })
                }
            </motion.ul>
        </nav>
    );
};

export default NavMobile;