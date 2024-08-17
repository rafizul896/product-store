import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex gap-5 flex-col md:flex-row-reverse py-5 md:py-0 min-h-[calc(100vh-126px)] justify-center items-center">
            <div className="flex-1 ">
                <img className="rounded-md" src="https://i.ibb.co/TWjFrpN/960x0.webp" alt="" />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center mt-8 space-y-3 md:space-y-6">
                <h2 className="text-2xl md:text-5xl font-semibold md:font-bold text-black text-center">Start your Journey as Influencer</h2>
                <p className="text-black text-center">Creating digital experiences that engage and inspire.</p>
                <Link to='/products'>
                <button className="btn bg-[#2557a7] hover:bg-[#0d2d5e] text-white rounded-full flex items-center justify-center gap-3 h-[60px] px-10">Preebook now <FaLongArrowAltRight className="mt-[2px] text-xl"/></button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
