import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Switch } from '../ui/switch'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '@/redux/authSlice'
const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            console.log('Logout Response:', res);
            if (res.data.status) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Logout Error:', error);
            const message = error.response?.data?.message || 'Something went wrong during logout';
            toast.error(message);
        }
    };


    return (
        <div className='bg-[#0d9488]'>
            <div className='flex items-center justify-between h-16 mx-auto max-w-7xl'>
                <div>
                    <Link to="/"><h1 className="text-2xl font-bold"><span className='text-red-600'>Naukiri</span>Lelo</h1></Link>
                </div>
                <div className='flex gap-10'>
                    <ul className='flex items-center gap-5 font-medium'>
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>

                            )
                        }
                    </ul>
                    {
                        !user ?
                            (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login"><Button>Login</Button></Link>
                                    <Link to="/signup"><Button variant="outline">Sign Up</Button></Link>
                                </div>
                            )
                            :
                            (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <div>
                                            <div className='flex gap-3 space-y-2'>
                                                <Avatar className='cursor-pointer'>
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-gray-400'>{user?.email}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-400'>
                                                {
                                                    user && user.role === "employee" && (
                                                        <div className='flex items-center gap-2 cursor-pointer w-fit'>
                                                            <User2 />
                                                            <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                        </div>
                                                    )
                                                }
                                                <div className='flex items-center justify-between gap-2 cursor-pointer'>
                                                    <div className='flex items-center gap-2 w-fit'>
                                                        <LogOut />
                                                        <Button variant="link" onClick={logoutHandler}>Logout</Button>
                                                    </div>
                                                    <div>
                                                        <Switch />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar