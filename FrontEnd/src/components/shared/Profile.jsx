import React, { useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Contact, Mail, Pen } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Label } from '../ui/label';
import Navbar from './Navbar';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { motion } from 'framer-motion';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    
    return (
        <div>
            <Navbar />
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className='max-w-4xl p-8 mx-auto my-5 bg-white border border-gray-200 rounded-2xl'
            >
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="w-24 h-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='text-xl font-medium'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button className="text-right" variant="outline" onClick={() => setOpen(true)}><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phone}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='flex w-full max-w-sm items-center gap-1.5'>
                    <Label className="font-bold text-md">Resume</Label>
                    {
                        isResume ? <a target='blank' href="https://drive.google.com/file/d/1HrVNpT4l9MydQeNLlU_vLWfgttQO-8mB/view?usp=drive_link" className='w-full text-blue-500 cursor-pointer hover:underline'>View</a> : <span>NA</span>
                    }
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className='max-w-4xl mx-auto bg-white rounded-2xl'
            >
                <h1 className='my-5 text-lg font-bold'>Applied Jobs</h1>
                <AppliedJobTable />
            </motion.div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
