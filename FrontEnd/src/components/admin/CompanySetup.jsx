import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { motion } from 'framer-motion'; // Import Framer Motion

const CompanySetup = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const { singleCompany } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  useGetCompanyById(params.id);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    
    if (input.file) {
      formData.append("file", input.file);
    }
    
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.status) {
        toast.success(res.data.message);
        navigate('/admin/companies'); 
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || null 
    });
  }, [singleCompany]);  

  return (
    <div>
      <Navbar />
      <motion.div
        className='max-w-4xl mx-auto my-10'
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
      >
        <form onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 font-semibold text-gray-500">
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='text-xl font-bold'>Company Setup</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {
            loading ? (
              <Button className='w-full my-4'><Loader2 className='w-5 h-5 mr-2 animate-spin' />loading</Button>
            ) : (
              <Button className='w-full my-4' type="submit">Update</Button>
            )
          }
        </form>
      </motion.div>
    </div>
  );
}

export default CompanySetup;
