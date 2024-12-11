import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const MainPage = () => {
    const [query,setQuery]=useState("");
    const dispatch=useDispatch();
    const navigate=useNavigate();
    
    const searchJobHandler=()=>{
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }
    
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10  justify-center items-center'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>Naukiri nhi hai? Koi na</span>
                <h1 className='text-5xl font-bold'>Search,Apply & <br /> Get Your <span className='text-[#0d9488]'>Dream Jobs</span></h1>
                <div className='flex justify-center items-center w-3/5'>
                    <p>"Welcome to your ultimate job portal! Discover endless career opportunities, connect with leading employers, and apply for jobs with ease. Tailored job recommendations, industry insights, and powerful tools to help you land your next role. Start advancing your career journey today!"</p>
                </div>
                </div>
            <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        className='w-full border-none outline-none'
                        onChange={(e)=>setQuery(e.target.value)}
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#0d9488]">
                        <Search className='w-5 h-5' />
                    </Button>
                </div>
        </div>
    )
}

export default MainPage