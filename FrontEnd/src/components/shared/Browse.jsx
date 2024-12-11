import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Job from './job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';

const Browse = () => {
    useGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        };
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <div className='mx-auto my-10 max-w-7xl'>
                <h1 className='my-10 text-xl font-bold'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        allJobs.map((job) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Browse;
