import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
    const [navitems, setnavitems] = useState([]);

    useEffect(() => {
        fetch('/navitems.json')
            .then(res => res.json())
            .then(data => setnavitems(data));
    }, []);

    return (
        <nav >
            <ul className="flex gap-5 capitalize">
                {
                    navitems?.map((item, index) => {
                        return (
                            <li className="text-white hover:text-[#14a55f] cursor-pointer" key={index}>
                                <NavLink
                                    to={item.href}
                                    className={({ isActive }) => isActive ? "text-[#14a55f] transition-all duration-300" : ""}
                                >{item?.name}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </nav>
    );
};

export default Nav;