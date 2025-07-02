import { useEffect, useState } from 'react';
import { Link } from 'react-router'; 
import useAxiosSecure from '../hooks/useAxiosSecure';

const PopularServices = () => {
    const [services, setServices] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/services') 
            .then(res => {
                const reversed = res.data.reverse();
                const latestSix = reversed.slice(0, 6);
                setServices(latestSix);
            })
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div className="my-12 px-4 md:px-10">
            <h2
                className="text-3xl font-bold text-center text-primary mb-8"
                data-aos="fade-down" 
            >
                Popular Services
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                    <div
                        key={service._id}
                        className="card shadow-2xl rounded-2xl p-4 flex gap-4"
                        data-aos="fade-up" 
                        data-aos-delay={index * 100} 
                    >
                        <img src={service.image} alt={service.name} className="w-full h-50 object-cover rounded-xl" />
                        <div className="flex flex-col justify-between flex-1">
                            <div>
                                <h3 className="text-xl font-bold text-primary">{service.name}</h3>
                                <p className="text-sm mb-2">
                                    {service.description.length > 100 ? service.description.slice(0, 100) + '...' : service.description}
                                </p>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <div className="flex items-center gap-2">
                                    <img src={service.providerPhoto} alt="provider" className="w-8 h-8 rounded-full" />
                                    <span className="text-sm font-medium">{service.providerName}</span>
                                </div>
                                <span className="text-base font-semibold text-green-600">${service.price}</span>
                            </div>
                            <Link to={`/details/${service._id}`}>
                                <button className="custom-btn custom-btn:hover mt-5 ">View Details</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            
            <div className="text-center mt-10" data-aos="zoom-in"> 
                <Link to="/allPost">
                    <button className="custom-btn custom-btn:hover mt-5 px-10">
                        More Services
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PopularServices;
