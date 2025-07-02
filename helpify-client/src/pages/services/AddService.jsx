import React, { useState } from 'react'; 
import { FaAlignLeft, FaDollarSign, FaEnvelope, FaImage, FaMapMarkerAlt, FaTag, FaUser, FaUserCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddService = () => {
    const { user } = useAuth(); 
    const [description, setDescription] = useState("");
    const maxChars = 100;
    const axiosSecure = useAxiosSecure();

    const handleAddService = async (e) => {
        e.preventDefault();
        const form = e.target;
        const image = form.image.value;
        const name = form.name.value;
        const price = form.price.value;
        const area = form.area.value;
        const category = form.category.value;
        const description = form.description.value;

        if (!user || !user.email) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: 'User information is missing. Please log in again.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

        const newService = {
            image,
            name,
            category,
            price: parseFloat(price),
            area,
            description,
            providerName: user?.displayName,
            providerEmail: user?.email || user?.providerData?.[0]?.email,
            providerPhoto: user?.photoURL,
        };

        try {
            const res = await axiosSecure.post('/services', newService);

            if (res.data.insertedId || res.data.acknowledged) {
                Swal.fire({
                    icon: 'success',
                    title: 'Service Added',
                    text: 'Your service has been added successfully!',
                    showConfirmButton: false,
                    timer: 2000
                });
                form.reset();
                setDescription("");
            }
        } catch (error) {
            console.error('Error adding service:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to Add',
                text: error.message || 'Something went wrong!',
            });
        }
    }

    return (
        <div className=" p-8 rounded-2xl shadow-lg my-10">
            <h2 className="text-3xl font-bold text-center mb-8 text-primary">Add a New Service</h2>
            <form onSubmit={handleAddService} className="grid grid-cols-1 gap-5">

                <label >
                    <span className=" font-medium flex items-center gap-2"><FaTag /> Service Name</span>
                    <input type="text" name="name" placeholder="Service Name" className="input input-bordered w-full" required />
                </label>
                <div className=" w-full">
                    <label className="label">
                        <span className="font-medium flex items-center gap-2 mb-1"><FaTag />Select Category</span>
                    </label>
                    <select
                        name="category"
                        required
                        className="select select-bordered w-full"
                    >
                        <option disabled selected>Select Category</option>
                        <option value="Tutoring">Tutoring</option>
                        <option value="Skill Development">Skill Development</option>
                        <option value="Language Learning">Language Learning</option>
                        <option value="Spiritual Studies">Spiritual Studies</option>
                        <option value="Academic Support">Academic Support</option>
                    </select>
                </div>
                <label >
                    <span className=" font-medium flex items-center gap-2"><FaDollarSign /> Price</span>
                    <input type="number" name="price" placeholder="100" className="input input-bordered w-full" required />
                </label>
                <label >
                    <span className=" font-medium flex items-center gap-2"><FaImage /> Image URL</span>
                    <input type="text" name="image" placeholder="https://..." className="input input-bordered w-full" required />
                </label>


                <label >
                    <span className=" font-medium flex items-center gap-2"><FaMapMarkerAlt /> Service Area</span>
                    <input type="text" name="area" placeholder="Dhaka, Chittagong..." className="input input-bordered w-full" required />
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
                <label >
                    <span className=" font-medium flex items-center gap-2"><FaUser /> Your Name</span>
                    <input type="text" value={user?.displayName || ''} disabled className="input input-bordered" />
                </label>
                <label >
                    <span className=" font-medium flex items-center gap-2"><FaEnvelope /> Your Email</span>
                    <input type="email" value={user?.email || ''} disabled className="input input-bordered" />
                </label>
                <label >
                    <span className=" font-medium flex items-center gap-2"><FaUserCircle /> Your Photo</span>
                    <input type="text" value={user?.photoURL || ''} disabled className="input input-bordered" />
                </label>
                <button type="submit" className="btn btn-primary mt-4 w-full text-white font-bold text-lg">
                    Add Service
                </button>
            </form>
        </div>
    );
};

export default AddService;
