import { useState, useEffect } from 'react'; 
import Swal from 'sweetalert2';
import { FaCalendarAlt, FaInfoCircle, FaDollarSign, FaUserCircle, FaEnvelope, FaTag } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';

const BookServiceModal = ({ service, onClose }) => {
    const [serviceTakingDate, setServiceTakingDate] = useState('');
    const [specialInstruction, setSpecialInstruction] = useState('');
    const { user } = useAuth(); 
    const [isOwnPost, setIsOwnPost] = useState(false);
    const userPhoto = user?.photoURL;
    const providerPhoto = service?.providerPhoto;
    const providerEmail = service?.providerEmail;
    const providerName = service?.providerName;
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!user || !service) {
            setIsOwnPost(false);
            return;
        }

        if (user.email === service.providerEmail) {
            setIsOwnPost(true);
        } else {
            setIsOwnPost(false);
        }
    }, [user, service]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: 'User information is missing. Please log in again.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

        if (isOwnPost) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Allowed',
                text: 'You cannot book your own service.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

        if (!serviceTakingDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Date',
                text: 'Please select a service taking date.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

        const bookingData = {
            serviceId: service._id,
            serviceName: service.name,
            serviceImage: service.image,
            providerEmail: providerEmail,
            providerName: providerName,
            userEmail: user.email,
            userName: user.displayName,
            serviceTakingDate: serviceTakingDate,
            specialInstruction: specialInstruction,
            price: service.price,
            serviceStatus: 'pending'
        };

        try {
            const response = await axiosSecure.post('/bookings', bookingData); 

            if (response.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Service Booked!',
                    text: 'Your service has been booked successfully!',
                    timer: 2000,
                    showConfirmButton: false
                });
                onClose();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Booking Failed',
                    text: 'Failed to book service. Please try again.',
                    timer: 3000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Error booking service:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while booking the service. Please try again later.',
                timer: 3000,
                showConfirmButton: false
            });
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl relative my-8 overflow-y-auto max-h-[90vh]">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold hover:text-5xl"
                >
                    &times;
                </button>
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Book Service: {service.name}</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaTag /> Service Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 mb-10">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Service Image:</label>
                                <img src={service.image} alt={service.name} className="w-full h-full object-cover rounded-md border border-gray-300" />
                                <input type="hidden" value={service.image} name="serviceImage" />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Service ID:</label>
                                <input type="text" className="form-input text-gray-700" value={service._id} readOnly />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Service Name:</label>
                                <input type="text" className="form-input text-gray-700" value={service.name} readOnly />
                            </div>
                            <div className="md:col-span-2 mt-10">
                                <label className=" text-gray-700 text-sm font-bold mb-2 flex items-center gap-1">
                                    <FaDollarSign /> Price:
                                </label>
                                <input type="text" className="form-input text-green-700 font-semibold" value={`${service.price}`} readOnly />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <FaCalendarAlt /> Booking Specifics
                        </h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="serviceTakingDate" className=" text-gray-700 text-sm font-bold mb-2 flex items-center gap-1">
                                    <FaCalendarAlt /> Service Taking Date: <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="serviceTakingDate"
                                    className="w-full form-input text-gray-700"
                                    value={serviceTakingDate}
                                    onChange={(e) => setServiceTakingDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="specialInstruction" className=" text-gray-700 text-sm font-bold mb-2 flex items-center gap-1">
                                    <FaInfoCircle /> Special Instruction:
                                </label>
                                <textarea
                                    id="specialInstruction"
                                    className="w-full form-textarea h-24 text-gray-700"
                                    value={specialInstruction}
                                    onChange={(e) => setSpecialInstruction(e.target.value)}
                                    required
                                    placeholder="e.g., your address, specific requirements, preferred time..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaUserCircle /> Provider Info
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <img src={providerPhoto} alt={providerName} className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover" />
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-1">Name:</label>
                                        <input type="text" className="form-input text-gray-700" value={providerName} readOnly />
                                    </div>
                                </div>
                                <div>
                                    <label className=" text-gray-700 text-sm font-bold mb-1 flex items-center gap-1">
                                        <FaEnvelope /> Email:
                                    </label>
                                    <input type="email" className="form-input text-gray-700" value={providerEmail} readOnly />
                                </div>
                            </div>
                        </div>

                        <div className=" p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <FaUserCircle /> Your Info
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <img src={userPhoto} alt={user?.displayName || 'User'} className="w-12 h-12 rounded-full border-2 border-green-400 object-cover" />
                                    <div className="flex-1">
                                        <label className="block text-gray-700 text-sm font-bold mb-1">Name:</label>
                                        <input type="text" className="form-input text-gray-700" value={user?.displayName || ''} readOnly />
                                    </div>
                                </div>
                                <div>
                                    <label className=" text-gray-700 text-sm font-bold mb-1 flex items-center gap-1">
                                        <FaEnvelope /> Email:
                                    </label>
                                    <input type="email" className="form-input text-gray-700" value={user?.email || ''} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded-lg transition duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isOwnPost}
                            title={
                                isOwnPost
                                    ? "You cannot book your own service."
                                    : "Purchase"
                            }
                            className={`py-2 px-6 rounded-lg font-bold transition duration-300 flex items-center gap-2 
                                ${isOwnPost
                                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                    : "custom-btn custom-btn:hover"
                                }`}
                        >
                            <FaDollarSign /> Purchase
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookServiceModal;
