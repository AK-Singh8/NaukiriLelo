import React from 'react'
import { Button } from '../ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    return (
        <div className='p-5 overflow-y-auto bg-white border border-gray-100 rounded-md shadow-xl'>
            <div className='flex items-center justify-between'>
                <p>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`} </p>
                <Button variant="outline" className="rounded-full" size="icon"><Bookmark /></Button>
            </div>
            <div className='flex items-start gap-2 my-2'>
                <Button className='p-6' variant="outline" size='icon'>
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='text-lg font-medium'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.company?.location}</p>
                </div>
            </div>
            <div>
                <h1 className='my-2 text-lg font-bold'>{job.title}</h1>
                <p className='text-sm text-gray-600'>{job.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job.position}</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job.salary}</Badge>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Button variant="outline" onClick={() => navigate(`/description/${job?._id}`)}>Details</Button>
                <Button className="bg-[#0d9488]">Save for later</Button>
            </div>
        </div>
    )
}

export default Job