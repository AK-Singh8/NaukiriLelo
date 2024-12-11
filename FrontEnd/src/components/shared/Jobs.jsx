import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Filter from './Filter';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const selectedFilters = searchedQuery.split(',');

            const filteredJobs = allJobs.filter((job) => {
                return selectedFilters.every(filter =>
                    job.title.toLowerCase().includes(filter.toLowerCase()) ||
                    job.location.toLowerCase().includes(filter.toLowerCase())
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='mx-auto mt-5 max-w-7xl'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <Filter />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job Not Found</span> : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div 
                                                key={job?._id}
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
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Jobs;
