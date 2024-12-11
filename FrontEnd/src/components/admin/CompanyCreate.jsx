import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { motion } from 'framer-motion'; // Import Framer Motion

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState("");

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.status) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error('Error:', error.response.data);
            toast.error(error.response.data.message || 'Registration failed');
        }
    }

    return (
        <div>
            <Navbar />
            <motion.div
                className='max-w-4xl mx-auto'
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
            >
                <div className='my-10'>
                    <h1 className='text-2xl font-bold'>Company Name</h1>
                    <p className='text-gray-500'>What would you like to name your company? You can change this later.</p>
                </div>
                <Label>Company Name</Label>
                <Input 
                    type='text' 
                    className='my-2' 
                    placeholder='Google, Microsoft, etc' 
                    onChange={(e) => setCompanyName(e.target.value)} 
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>                    
                    <Button onClick={registerNewCompany}>Continue</Button>                    
                </div>
            </motion.div>
        </div>
    );
}

export default CompanyCreate;
