import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { motion } from 'framer-motion';

const Companies = () => {
    const [input, setInput] = useState("");
    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input, dispatch]);

    return (
        <div>
            <Navbar />
            <motion.div
                className='max-w-6xl mx-auto my-10'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
            >
                <div className='flex items-center justify-between mb-4'>
                    <Input 
                        className='w-fit' 
                        placeholder='Filter by company' 
                        onChange={(e) => setInput(e.target.value)} 
                        aria-label="Filter companies" // Improve accessibility
                    />
                    <Button onClick={() => navigate("/admin/companies/create")}>
                        New Company
                    </Button>
                </div>
                <CompaniesTable />
            </motion.div>
        </div>
    );
};

export default Companies;
