import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '../utils/constant';
import { setLoading, setUser } from '@/redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': "application/json" },
        withCredentials: true,
      });

      if (res.data.status) {
        navigate("/");
        dispatch(setUser(res.data.user));
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
      <div className='flex items-center justify-center max-w-6xl mx-auto'>
        <motion.form
          onSubmit={submitHandler}
          className='w-7/12 p-4 my-10 border border-gray-200 rounded-md'
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className='mb-5 text-xl font-bold'>Login</h1>
          <div className='my-2'>
            <Label>E-mail</Label>
            <Input type="email" placeholder="abc@gmail.com" name="email" value={input.email} onChange={changeEventHandler} />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
            <Input type="password" placeholder="*******" name="password" value={input.password} onChange={changeEventHandler} />
          </div>
          <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-5'>
              <div className="flex items-center space-x-2">
                <Input type="radio" value="employee" name='role' checked={input.role === "employee"} onChange={changeEventHandler} className="w-4 h-4 cursor-pointer" />
                <Label htmlFor="r1">Employee</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="radio" value="recruiter" name='role' checked={input.role === "recruiter"} onChange={changeEventHandler} className="w-4 h-4 cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? (
              <Button className='w-full my-4'>
                <Loader2 className='w-5 h-5 mr-2 animate-spin' /> loading
              </Button>
            ) : (
              <Button className='w-full my-4' type="submit">Login</Button>
            )
          }
          <span className='mt-5 text-sm'>
            First time? No worries 
            <Link to={"/signup"} className='text-blue-600 '> sign up</Link>
          </span>
        </motion.form>
      </div>
    </div>
  );
};

export default Login;
