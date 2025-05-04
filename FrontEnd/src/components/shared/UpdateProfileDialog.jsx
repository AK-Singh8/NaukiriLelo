import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: null,
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.status) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  }



  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <form onSubmit={submitHandler}>
            <div className='grid gap-4 py-4'>
              <div className='grid items-center grid-cols-4 gap-4'>
                <Label htmlFor="name" className='text-right'>Name</Label>
                <Input id='name' name='fullname' className='col-span-3' type="text" value={input.fullname} onChange={changeEventHandler} />
              </div>
              <div className='grid items-center grid-cols-4 gap-4'>
                <Label htmlFor="email" className='text-right'>Email</Label>
                <Input id='email' name='email' className='col-span-3' type="email" value={input.email} onChange={changeEventHandler} />
              </div>
              <div className='grid items-center grid-cols-4 gap-4'>
                <Label htmlFor="number" className='text-right'>Number</Label>
                <Input id='number' name='phone' className='col-span-3' value={input.phone} onChange={changeEventHandler} />
              </div>
              <div className='grid items-center grid-cols-4 gap-4'>
                <Label htmlFor="bio" className='text-right'>Bio</Label>
                <Input id='bio' name='bio' className='col-span-3' value={input.bio} onChange={changeEventHandler} />
              </div>
              <div className='grid items-center grid-cols-4 gap-4'>
                <Label htmlFor="skills" className='text-right'>Skills</Label>
                <Input id='skills' name='skills' className='col-span-3' value={input.skills} onChange={changeEventHandler} />
              </div>
              <div className='grid items-center grid-cols-4 gap-4'>
                <Label htmlFor="file" className='text-right'>Resume</Label>
                <Input id='file' name='file' className='col-span-3' accept="application/pdf" type="file" onChange={fileChangeHandler} />
              </div>
            </div>
            <DialogFooter>
              {
                loading ? <Button className="w-full my-4"> <Loader2 className='w-4 h-4 mr-2 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Update</Button>
              }
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog