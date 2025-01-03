import React from 'react'
import LatestJobsCard from './LatestJobsCard'
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const {allJobs}=useSelector(store=>store.job);   
    return (
        <div className='mx-auto my-20 max-w-7xl'>
            <h1 className='text-4xl font-bold'><span className='text-[#0d9488]'>Latest & Top </span> Job Openings</h1>
            <div className='grid grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length<=0 ? <span>No Jobs Available</span>:allJobs.slice(0,3).map((job) => <LatestJobsCard key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs