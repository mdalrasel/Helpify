import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ServiceToDo = () => {
    const { user, loading } = useAuth(); 
    const [providerBookings, setProviderBookings] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    const fetchProviderBookings = () => {
        if (!user || loading) {
            setDataLoading(false);
            return;
        }

        setDataLoading(true);
        axiosSecure.get(`/my-provider-bookings?email=${user.email}`)
            .then(response => {
                setProviderBookings(response.data);
                setDataLoading(false);
            })
            .catch(error => {
                console.error('Error fetching provider bookings:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to load your service to-do list. Please try again later!',
                });
                setDataLoading(false);
            });
    };

    useEffect(() => {
        fetchProviderBookings();
    }, [user, loading, axiosSecure]); 


    const handleStatusChange = (bookingId, newStatus) => {
        Swal.fire({
            title: 'Confirm Status Change?',
            text: `Change status to "${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axiosSecure.patch(
                        `/bookings/${bookingId}/status`,
                        { status: newStatus }
                    );

                    if (response.data.message === 'Booking status updated successfully!') {
                        Swal.fire(
                            'Updated!',
                            `Status changed to ${newStatus}.`,
                            'success'
                        );
                        fetchProviderBookings(); 
                    } else {
                        Swal.fire(
                            'Failed!',
                            'Could not update status. Please try again.',
                            'error'
                        );
                    }
                } catch (error) {
                    console.error('Error updating booking status:', error);
                    Swal.fire(
                        'Error!',
                        'An error occurred while updating the status.',
                        'error'
                    );
                }
            }
        });
    };

    if (dataLoading) {
        return <div className="text-center py-20 text-xl text-gray-700">Loading your service to-do list...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10" >
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-700 mb-8 sm:mb-10">Service To-Do</h2>

            {providerBookings.length === 0 ? (
                <div className="text-center p-6 sm:p-10 bg-yellow-50 rounded-lg shadow-md border border-yellow-200">
                    <p className="text-lg sm:text-xl text-yellow-800 font-semibold mb-4">
                        You have no pending service requests.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700">
                        All clear for now!
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">SL</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Service Name</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Customer Email</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Price</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Current Status</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {providerBookings.map((booking, index) => (
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
                                        {booking.userEmail}
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-4 text-xs sm:text-sm text-green-600 font-semibold">
                                        $ {booking.price}
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-4 whitespace-nowrap text-xs sm:text-sm">
                                        <span
                                            className={`py-1 px-2 text-xs rounded-full font-bold text-white
                                                ${booking.serviceStatus === 'pending' ? 'bg-yellow-500' : ''}
                                                ${booking.serviceStatus === 'working' ? 'bg-blue-500' : ''}
                                                ${booking.serviceStatus === 'completed' ? 'bg-green-500' : ''}`}
                                        >
                                            {booking.serviceStatus.charAt(0).toUpperCase() + booking.serviceStatus.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-4 whitespace-nowrap text-xs sm:text-sm">
                                        <select
                                            className="select select-bordered select-sm w-full max-w-xs border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                                            value={booking.serviceStatus}
                                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="working">Working</option>
                                            <option value="completed">Completed</option>
                                        </select>
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

export default ServiceToDo;
