import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"


const UserReviews = [
    {
        "name": "John Doe",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 5,
        "hoverCardContent": "ABC Corp, Software Engineer"
    },
    {
        "name": "Jane Smith",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "XYZ Inc, Project Manager"
    },
    {
        "name": "David Lee",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 5,
        "hoverCardContent": "Tech Solutions, Designer"
    },
    {
        "name": "Emily Brown",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "Supportive Services, Customer Support Specialist"
    },
    {
        "name": "Michael Johnson",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 5,
        "hoverCardContent": "Quality Goods, Marketing Director"
    },
    {
        "name": "Jane Smith",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "XYZ Inc, Project Manager"
    },
    {
        "name": "David Lee",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 5,
        "hoverCardContent": "Tech Solutions, Designer"
    },
    {
        "name": "Emily Brown",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "Supportive Services, Customer Support Specialist"
    }, ,
    {
        "name": "Jane Smith",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "XYZ Inc, Project Manager"
    },
    {
        "name": "David Lee",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 5,
        "hoverCardContent": "Tech Solutions, Designer"
    },
    {
        "name": "Emily Brown",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "Supportive Services, Customer Support Specialist"
    }, ,
    {
        "name": "Jane Smith",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "XYZ Inc, Project Manager"
    },
    {
        "name": "David Lee",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 5,
        "hoverCardContent": "Tech Solutions, Designer"
    },
    {
        "name": "Emily Brown",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "Supportive Services, Customer Support Specialist"
    }, ,
    {
        "name": "Jane Smith",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "XYZ Inc, Project Manager"
    },
    {
        "name": "David Lee",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 5,
        "hoverCardContent": "Tech Solutions, Designer"
    },
    {
        "name": "Emily Brown",
        "reviewText": "\"Great service! Highly recommend.Very professional and on time.Excellent experience, would definitely come back.\"",
        "rating": 4,
        "hoverCardContent": "Supportive Services, Customer Support Specialist"
    }
];

const Reviews = () => {
    return (

        <div className="flex flex-col mx-20 my-20 max-w-3xl">
            <h1 className='text-4xl font-bold'><span className='text-[#0d9488]'>Latest </span>Reviews</h1>
            <div className='flex items-center gap-20'>
                <Carousel className="hidden md:block max-w-3xl my-5 border">
                    <CarouselContent>
                        {
                            UserReviews.map((review, index) => (
                                <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/3 p-4">
                                    <div className="p-5 h-full rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
                                        <div>
                                            <HoverCard><HoverCardTrigger className="text-lg">{review.name}</HoverCardTrigger><HoverCardContent>{review.hoverCardContent}</HoverCardContent></HoverCard>
                                            <p className="text-sm font-semibold  text-gray-500">{review.reviewText}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm mt-2">Rating: {review.rating} / 5</p>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
                <video className="max-w-md rounded-lg shadow-xl" autoPlay muted loop>
                    <source src="/PulseBeatz.mp4" type="video/mp4" />
                </video>
            </div>
        </div>
    );
}

export default Reviews;