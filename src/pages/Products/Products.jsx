import { useState } from 'react';
import Select from 'react-select';
import { useQuery } from '@tanstack/react-query';
import { axiosCommon } from '../../hooks/useAxiosCommon';
import Pagination from '../../components/Pagination/Pagination';
import ProductCard from './ProductCard';

const ManageUsers = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
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
        queryKey: ['total-products', search, filter],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/products-total?search=${search}&filter=${filter}`);
            return setCount(parseInt(data.count));
        }
    })

    const pages = [...Array(Math.ceil(count / itemsPerPage)).keys()].map(e => e + 1)

    // 
    const { data: products } = useQuery({
        queryKey: ['allProducts', search, filter, itemsPerPage, currentPage],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/products?page=${currentPage}&size=${itemsPerPage}&search=${search}&filter=${filter}`);
            return data;
        }
    })
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterChange = (selectedOption) => {
        setFilter(selectedOption.value);
    };



    const roleOptions = [
        { value: '', label: 'All Categories' },
        { value: 'Home Decor', label: 'Home Decor' },
        { value: 'Accessories', label: 'Accessories' },
        { value: 'Electronics', label: 'Electronics' },
        { value: 'Clothing', label: 'Clothing' },
        { value: 'Furniture', label: 'Furniture' },
        { value: 'Kitchen', label: 'Kitchen' },
        { value: 'Footwear', label: 'Footwear' }
    ];

    return (
        <div className="pb-10">
            <h2 className="text-2xl font-bold mb-4 text-center">All Products</h2>
            <div className="flex mb-4">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search by Product Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                />
                <Select
                    options={roleOptions}
                    onChange={handleFilterChange}
                    className="w-full"
                />
            </div>
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
