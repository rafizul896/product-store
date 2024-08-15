import { Link } from "react-router-dom";
import Nav from "./Nav";
import NavMobile from "./NavMobile";

const Navbar = () => {

    return (
        <div className="bg-[#121418]">
            <header className={`h-[70px] flex items-center fixe top-0 text-white z-10 transition-all duration-300 w-[90%] md:w-[90%] lg:w-[80%] mx-auto`}>
                <div className="w-full flex items-center justify-between">
                    {/* Logo */}
                    <Link to='/'>
                        <h1 className="text-2xl md:text-3xl font-semibold">STORE</h1>
                        {/* <img src="" alt="" /> */}
                    </Link>
                    {/* nav */}
                    <div className="hidden lg:block">
                        <Nav />
                    </div>
                    {/* nav mobile*/}
                    <div className="lg:hidden">
                        <NavMobile />
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;