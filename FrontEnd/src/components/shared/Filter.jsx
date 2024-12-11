import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
    {
        filterType: "Location",
        array: ["Noida", "Bangalore", "Lucknow", "Mumbai", "Kolkata", "Jaipur"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "Data Scientist", "UI/UX Designer", "Data Analyst"]
    }
];

const Filter = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        Location: "",
        Industry: ""
    }); 

    const dispatch = useDispatch();

    const changeHandler = (category, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [category]: value
        }));
    };

    const resetFilters = () => {
        setSelectedFilters({
            Location: "",
            Industry: ""
        });
    };

    useEffect(() => {
        const selectedQueries = Object.values(selectedFilters).filter(Boolean).join(',');
        dispatch(setSearchedQuery(selectedQueries)); 
    }, [selectedFilters]);

    return (
        <div className='flex flex-col w-full p-3 bg-white rounded-md'>
            <h1 className='text-lg font-bold'>Filter</h1>
            <hr className='mt-3' />
            {
                filterData.map((data, index) => (
                    <div key={index} className='overflow-y-auto max-h-60 no-scrollbar'>
                        <h1 className='text-lg font-bold mt-6'>{data.filterType}</h1> {/* Added margin-top */}
                        <RadioGroup value={selectedFilters[data.filterType]} onValueChange={(value) => changeHandler(data.filterType, value)}>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2'>
                                            <RadioGroupItem value={item} id={itemId} checked={selectedFilters[data.filterType] === item} />
                                            <label htmlFor={itemId}>{item}</label>
                                        </div>
                                    );
                                })
                            }
                        </RadioGroup>
                    </div>
                ))
            }
            <span onClick={resetFilters} className="px-3 py-1 text-red-600 cursor-pointer">Reset Filters</span>
        </div>
    );
};

export default Filter;
