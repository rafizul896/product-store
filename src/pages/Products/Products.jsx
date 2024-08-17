import { useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from './ProductCard';
import PriceRange from '../../components/PriceRange/PriceRange';
import { GrPowerReset } from 'react-icons/gr';

const ManageUsers = () => {
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [category, setCategory] = useState('');
    const [brandName, setBrandName] = useState('')
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const minPrice = priceRange[0]
    const maxPrice = priceRange[1]
    // pagination
    const [count, setCount] = useState('')
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // handle pagination button
    const handlePaginationButton = (value) => {
        setCurrentPage(value)
    }
    // // count total
    useQuery({
        queryKey: ['total-products', search, category, brandName, priceRange],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/products-total?search=${search}&category=${category}&brandName=${brandName}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
            return setCount(parseInt(data.count));
        }
    })

    const pages = [...Array(Math.ceil(count / itemsPerPage)).keys()].map(e => e + 1)

    // 
    const { data: products } = useQuery({
        queryKey: ['allProducts', sort, search, itemsPerPage, currentPage, category, brandName, priceRange],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/products?page=${currentPage}&size=${itemsPerPage}&search=${search}&sort=${sort}&category=${category}&brandName=${brandName}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
            return data;
        }
    })
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleCategoryChange = (selectedOption) => {
        setCategory(selectedOption.value);
    };

    const handleBrandChange = (selectedOption) => {
        setBrandName(selectedOption.value);
    };

    const handleSortChange = (selectedOption) => {
        setSort(selectedOption.value);
    };



    const categoryOptions = [
        { value: '', label: 'Filter By Category' },
        { value: 'Home Decor', label: 'Home Decor' },
        { value: 'Accessories', label: 'Accessories' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Clothing', label: 'Clothing' },
        { value: 'Furniture', label: 'Furniture' },
        { value: 'Kitchen', label: 'Kitchen' },
        { value: 'Footwear', label: 'Footwear' }
    ];

    const brandOptions = [
        { value: '', label: 'Filter By Brand' },
        { value: 'CraftyPottery', label: 'CraftyPottery' },
        { value: 'SoundWave', label: 'SoundWave' },
        { value: 'ComfortWear', label: 'ComfortWear' },
        { value: 'HydraLife', label: 'HydraLife' },
        { value: 'EliteFoot', label: 'EliteFoot' },
        { value: 'EcoRug', label: 'EcoRug' },
        { value: 'FitTrack', label: 'FitTrack' },
        { value: 'FlexiFit', label: 'FlexiFit' },
        { value: 'GreenChef', label: 'GreenChef' },
        { value: 'SoundBlock', label: 'SoundBlock' },
        { value: 'StreetStyle', label: 'StreetStyle' },
        { value: 'GentlemanStyle', label: 'GentlemanStyle' },
        { value: 'RusticWood', label: 'RusticWood' },
        { value: 'TrailBlaze', label: 'TrailBlaze' },
        { value: 'TableElegance', label: 'TableElegance' },
        { value: 'ChargeUp', label: 'ChargeUp' },
        { value: 'RunComfort', label: 'RunComfort' },
        { value: 'PureGlow', label: 'PureGlow' },
        { value: 'FlexFit', label: 'FlexFit' },
        { value: 'SoundVibe', label: 'SoundVibe' },
        { value: 'TableGrace', label: 'TableGrace' },
        { value: 'ChefPro', label: 'ChefPro' },
        { value: 'ComfortSeat', label: 'ComfortSeat' },
        { value: 'SleepWell', label: 'SleepWell' },
    ];

    const sortOptions = [
        { value: '', label: 'Sort By Price' },
        { value: 'price-asc', label: 'Price: Low to High' },
        { value: 'price-desc', label: 'Price: High to Low' },
        { value: 'date-desc', label: 'Newest First' },
    ];

    const handleReset = () => {
        setSort('');
        setSearch('');
        setBrandName('');
        setCategory('');
        setPriceRange([0, 1000])
    }

    console.log(search, brandName, category)


    return (
        <div className="pb-10">
            {/* <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2> */}
            <div className="flex justify-center items-center mb-4 flex-col md:flex-row gap-3">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by Product Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <Select
                    defaultValue={categoryOptions[0]}
                    options={categoryOptions}
                    onChange={handleCategoryChange}
                    className="w-full"
                />

                <Select
                    defaultValue={brandOptions[0]}
                    options={brandOptions}
                    onChange={handleBrandChange}
                    className="w-full"
                />

                <Select
                    defaultValue={sortOptions[0]}
                    options={sortOptions}
                    onChange={handleSortChange}
                    className="w-full"
                />
                <button onClick={handleReset} className='px-1 md:px-4 py-2 text-xl font-medium tracking-wider text-gray-100 transition-colors duration-300 transform bg-[#2557a7] rounded-md'><GrPowerReset /></button>
            </div>
            <PriceRange
                min={0}
                max={1000}
                step={10}
                onChange={(values) => setPriceRange(values)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            <Pagination count={count} handlePaginationButton={handlePaginationButton} currentPage={currentPage} setItemsPerPage={setItemsPerPage} itemsPerPage={itemsPerPage} pages={pages} />
        </div>
    );
};

export default ManageUsers;
