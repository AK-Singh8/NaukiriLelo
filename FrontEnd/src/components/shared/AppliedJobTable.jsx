import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { useSelector } from 'react-redux';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    return (
        <div>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length === 0 ? <span>No Applied Jobs</span> : allAppliedJobs.map((item) => (
                            <TableRow key={item._id} className={`${item?.status === "rejected" ? 'bg-red-50' : item.status === 'pending' ? 'bg-gray-400' : 'bg-green-50'}`}>
                                <TableCell>{item?.createdAt ? item.createdAt.split('T')[0] : 'N/A'}</TableCell>
                                <TableCell>{item?.job?.title ?? 'N/A'}</TableCell>
                                <TableCell>{item?.job?.company?.name ?? 'N/A'}</TableCell>
                                <TableCell className="text-right"><Badge className={`${item?.status === "rejected" ? 'bg-red-400' : item.status === 'pending' ? 'bg-gray-400' : 'bg-green-400'}`}>{item?.status ?? 'Unknown'}</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable;
