import { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router'; 
import Swal from 'sweetalert2';
import { FaTag, FaDollarSign, FaMapMarkerAlt, FaAlignLeft, FaImage, FaUserCircle, FaEnvelope } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const UpdateService = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [description, setDescription] = useState("");
    const maxChars = 100;

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/details/${id}`)
            .then(res => {
                setService(res.data);
                setDescription(res.data.description);
            })
            .catch(error => {
                console.error('Error fetching service for update:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to load service details for update!',
                });
                navigate('/manage-services');
            });
    }, [id, navigate, axiosSecure]); 

    const handleUpdateService = async (e) => { 
        e.preventDefault();
        const form = e.target;
        const updatedServiceData = {
            image: form.image.value,
            name: form.name.value,
            category: form.category.value,
            price: parseFloat(form.price.value),
            area: form.area.value,
            description: form.description.value,
        };

        try {
            const response = await axiosSecure.put(`/update/${id}`, updatedServiceData);

            if (response.data.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Service Updated!',
                    text: 'Your service has been updated successfully!',
                    timer: 2000,
                    showConfirmButton: false
                });
                navigate('/manage-services');
            } else {
                Swal.fire({
                    icon: 'info',
                    title: 'No Changes',
                    text: 'No changes were made to the service.',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error('Error updating service:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Update',
                text: error.message || 'Something went wrong!',
            });
        }
    };

    if (!service) {
        return <div className="text-center py-20 text-xl">Loading service details...</div>;
    }

    return (
        <div className=" p-8 rounded-2xl shadow-2xl my-10" >
            <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Update Service: {service.name}</h2>
            <form onSubmit={handleUpdateService} className="grid grid-cols-1 gap-5">

                <label>
                    <span className="font-medium flex items-center gap-2"><FaTag /> Service Name</span>
                    <input type="text" name="name" defaultValue={service.name} placeholder="Service Name" className="input input-bordered w-full" required />
                </label>
                <div className="w-full">
                    <label className="label">
                        <span className="font-medium flex items-center gap-2 mb-1"><FaTag />Select Category</span>
                    </label>
                    <select
                        name="category"
                        defaultValue={service.category}
                        required
                        className="select select-bordered w-full"
                    >
                        <option value="Tutoring">Tutoring</option>
                        <option value="Skill Development">Skill Development</option>
                        <option value="Language Learning">Language Learning</option>
                        <option value="Spiritual Studies">Spiritual Studies</option>
                        <option value="Academic Support">Academic Support</option>
                    </select>
                </div>
                <label>
                    <span className="font-medium flex items-center gap-2"><FaDollarSign /> Price</span>
                    <input type="number" name="price" defaultValue={service.price} placeholder="100" className="input input-bordered w-full" required />
                </label>
                <label>
                    <span className="font-medium flex items-center gap-2"><FaImage /> Image URL</span>
                    <input type="text" name="image" defaultValue={service.image} placeholder="https://..." className="input input-bordered w-full" required />
                </label>
                <label>
                    <span className="font-medium flex items-center gap-2"><FaMapMarkerAlt /> Service Area</span>
                    <input type="text" name="area" defaultValue={service.area} placeholder="Dhaka, Chittagong..." className="input input-bordered w-full" required />
                </label>
                <label className="form-control">
                    <span className="label-text flex items-center gap-2 "><FaAlignLeft /> Description</span>
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => {
                            if (e.target.value.length <= maxChars) {
                                setDescription(e.target.value);
                            }
                        }}
                        className="textarea textarea-bordered w-full"
                        placeholder="Write about the service..."
                        required
                    />
                    <div className="text-sm mt-1 flex justify-between">
                        <span className={description.length === maxChars ? "text-red-600 font-medium" : "text-gray-500"}>
                            {description.length}/{maxChars} characters
                        </span>
                        {description.length === maxChars && (
                            <span className="text-red-600 font-medium">Maximum limit reached</span>
                        )}
                    </div>
                </label>
                <label>
                    <span className="font-medium flex items-center gap-2"><FaUserCircle /> Provider Name</span>
                    <input type="text" value={service.providerName || ''} disabled className="input input-bordered bg-gray-100" />
                </label>
                <label>
                    <span className="font-medium flex items-center gap-2"><FaEnvelope /> Provider Email</span>
                    <input type="email" value={service.providerEmail || ''} disabled className="input input-bordered bg-gray-100" />
                </label>
                <label>
                    <span className="font-medium flex items-center gap-2"><FaImage /> Provider Photo URL</span>
                    <input type="text" value={service.providerPhoto || ''} disabled className="input input-bordered bg-gray-100" />
                </label>

                <button type="submit" className="custom-btn custom-btn:hover">
                    Update Service
                </button>
            </form>
        </div>
    );
};

export default UpdateService;
