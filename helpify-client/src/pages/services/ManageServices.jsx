import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageServices = () => {
    const { user, loading } = useAuth();
    const [myServices, setMyServices] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const navigate = useNavigate();

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user || loading) {
            setDataLoading(false);
            return;
        }

        setDataLoading(true);
        axiosSecure.get(`/my-services?email=${user.email}`)
            .then(response => {
                setMyServices(response.data);
                setDataLoading(false);
            })
            .catch(error => {
                console.error('Error fetching my services:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to load your services. Please try again later!',
                });
                setDataLoading(false);
            });
    }, [user, loading, axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axiosSecure.delete(`/delete/${id}`);

                        if (response.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your service has been deleted.',
                                'success'
                            );
                            setMyServices(myServices.filter(service => service._id !== id));
                        } else {
                            Swal.fire(
                                'Failed!',
                                'Could not delete the service. Please try again.',
                                'error'
                            );
                        }
                    } catch (error) {
                        console.error('Error deleting service:', error);
                        Swal.fire(
                            'Error!',
                            'An error occurred while deleting the service.',
                            'error'
                        );
                    }
                }
            });
    };

    const handleEdit = (id) => {
        navigate(`/update-service/${id}`);
    };

    if (dataLoading) {
        return <div className="text-center py-20 text-xl">Loading your services...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10" >
            <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">Manage Your Services</h2>

            {myServices.length === 0 ? (
                <div className="text-center p-6 sm:p-10 bg-yellow-50 rounded-lg shadow-md border border-yellow-200">
                    <p className="text-lg sm:text-xl text-yellow-800 font-semibold mb-4">
                        You haven't added any services yet.
                    </p>
                    <p className="text-base sm:text-lg text-gray-700">
                        Start by adding a new service to your collection.
                    </p>
                    <Link to="/add-service" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition duration-300 text-sm sm:text-base">
                        Add New Service
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-lg shadow-lg">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">SL</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Image</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Service Name</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-6 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {myServices.map((service, index) => (
                                <tr key={service._id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                    <td className="py-3 px-3 sm:py-4 sm:px-6 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                        {index + 1}
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-6 whitespace-nowrap">
                                        <img src={service.image} alt={service.name} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md" />
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-6 text-xs sm:text-sm text-gray-800 font-semibold">
                                        {service.name}
                                    </td>
                                    <td className="py-3 px-3 sm:py-4 sm:px-6 whitespace-nowrap text-xs sm:text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(service._id)}
                                            className="bg-green-500 hover:bg-green-600 text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-md mr-1 sm:mr-2 transition duration-300 transform hover:scale-105 text-xs sm:text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 sm:py-2 sm:px-4 rounded-md transition duration-300 transform hover:scale-105 text-xs sm:text-sm"
                                        >
                                            Delete
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

export default ManageServices;
