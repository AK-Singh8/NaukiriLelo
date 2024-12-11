import React, { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { setSingleJobs } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
    const params = useParams();
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicants === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const jobId = params.id;
    const dispatch = useDispatch();
    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.status) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicants: user?._id }] }
                dispatch(setSingleJobs(updatedSingleJob));
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    useEffect(() => {
        const fetchSingleJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.status) {
                    dispatch(setSingleJobs(res.data.jobs));
                    setIsApplied(res.data.job.applications.some(application=>application.applicants===user?._id))
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJobs();
    }, [jobId, dispatch, user?._id]);

    if (!singleJob) {
        return <div>Loading job details...</div>;
    }

    return (
        <div className='mx-auto my-10 max-w-7xl'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-xl font-bold'>{singleJob.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={'text-blue-700 font-bold'} variant="ghost">{singleJob.position}</Badge>
                        <Badge className={'text-[#F83002] font-bold'} variant="ghost">{singleJob.jobType}</Badge>
                        <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{singleJob.salary}</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#0d9488] hover:bg-[#19514d]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className='py-4 font-medium border-b-2 border-b-gray-300'>Job Description</h1>
            <div className='my-4'>
                <h1 className='my-1 font-bold'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob.title}</span></h1>
                <h1 className='my-1 font-bold'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob.location}</span></h1>
                <h1 className='my-1 font-bold'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob.description}</span></h1>
                <h1 className='my-1 font-bold'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob.experience}</span></h1>
                <h1 className='my-1 font-bold'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob.salary}</span></h1>
                <h1 className='my-1 font-bold'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob.applications?.length || 0}</span></h1>
                <h1 className='my-1 font-bold'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
            </div>
        </div>
    );
};

export default JobDescription;
