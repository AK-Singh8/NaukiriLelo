import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        file: ""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phone", input.phone);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            
            if (res.data.status) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex justify-center items-center max-w-6xl mx-auto'>
                <motion.form
                    onSubmit={submitHandler}
                    className='w-7/12 border border-gray-200 rounded-md p-4 my-10'
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                >
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text" placeholder="Avesh Singh" name="fullname" value={input.fullname} onChange={changeEventHandler}/>
                    </div>
                    <div className='my-2'>
                        <Label>E-mail</Label>
                        <Input type="email" placeholder="abc@gmail.com" name="email" value={input.email} onChange={changeEventHandler}/>
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="text" placeholder="+91.........." name="phone" value={input.phone} onChange={changeEventHandler}/>
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" placeholder="*******" name="password" value={input.password} onChange={changeEventHandler}/>
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex gap-5 items-center'>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" value="employee" name='role' checked={input.role === "employee"} onChange={changeEventHandler} className="w-4 h-4 cursor-pointer"/>
                                <Label htmlFor="r1">Employee</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type="radio" value="recruiter" name='role' checked={input.role === "recruiter"} onChange={changeEventHandler} className="w-4 h-4 cursor-pointer"/>
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer"/>
                        </div>
                    </div>
                    {
                        loading ? (
                            <Button className='w-full my-4'>
                                <Loader2 className='mr-2 h-5 w-5 animate-spin' /> loading
                            </Button>
                        ) : (
                            <Button className='w-full my-4' type="submit">Sign Up</Button>
                        )
                    }
                    <span className='text-sm mt-5'>Already have an account?<Link to={"/login"} className='text-blue-600 '>Login</Link></span>
                </motion.form>
            </div>
        </div>
    );
};

export default Signup;
