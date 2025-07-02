import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router'; 
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BookedServices = () => {
    const { user, loading } = useAuth();
    const [bookedServices, setBookedServices] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user || loading) {
            setDataLoading(false);
            return;
        }

        setDataLoading(true);
        axiosSecure.get(`/my-booked-services?email=${user.email}`)
            .then(response => {
                setBookedServices(response.data);
                setDataLoading(false);
            })
            .catch(error => {
                console.error('Error fetching booked services:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to load your booked services. Please try again later!',
                });
                setDataLoading(false);
            });
    }, [user, loading, axiosSecure]); 

    if (dataLoading) {
        return <div className="text-center py-20 text-xl text-gray-700">Loading your booked services...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10" >
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-8 sm:mb-10">Your Booked Services</h2>

            {bookedServices.length === 0 ? (
                <div className="text-center p-6 sm:p-10 bg-yellow-50 rounded-lg shadow-md border border-yellow-200">
                    <p className="text-lg sm:text-xl text-yellow-800 font-semibold mb-4">
                        You haven't booked any services yet.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700">
                        Explore available services and book one today!
                    </p>
                    <Link to="/allPost" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-300 text-sm sm:text-base">
                        Browse All Services
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">SL</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Service Name</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Provider Email</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Price</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {bookedServices.map((booking, index) => (
                                <tr key={booking._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                    <td className="py-3 px-3 sm:py-4 sm:px-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm text-gray-800 font-semibold">
                                        <div className="flex items-center">
                                            <img src={booking.serviceImage} alt={booking.serviceName} className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-md mr-1 sm:mr-2" />
                                            <span className="truncate max-w-[80px] sm:max-w-none">{booking.serviceName}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm text-gray-600 truncate max-w-[100px] sm:max-w-none">
                                        {booking.providerEmail}
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm text-green-600 font-semibold">
                                        $ {booking.price}
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-4 whitespace-nowrap text-xs sm:text-sm">
                                        <button
                                            className={`py-1 px-2 text-xs rounded-full font-bold text-white
                                                ${booking.serviceStatus === 'pending' ? 'bg-yellow-500' : ''}
                                                ${booking.serviceStatus === 'working' ? 'bg-blue-500' : ''}
                                                ${booking.serviceStatus === 'completed' ? 'bg-green-500' : ''}
                                                opacity-90 cursor-not-allowed`}
                                            disabled
                                        >
                                            {booking.serviceStatus.charAt(0).toUpperCase() + booking.serviceStatus.slice(1)}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BookedServices;
