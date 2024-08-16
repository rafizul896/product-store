import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import Footer from "../pages/Shared/Footer";

const Root = () => {
    return (
        <div className="">
            <Navbar />
            <div className="w-[90%] md:w-[90%] lg:w-[80%] mx-auto min-h-[calc(100vh-120px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;