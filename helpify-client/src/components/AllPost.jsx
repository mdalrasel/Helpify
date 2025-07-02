import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router'; 
import useAxiosSecure from '../hooks/useAxiosSecure';

const AllPost = () => {
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [categories, setCategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState('');
    const categoryRefs = useRef({});
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/services')
            .then(res => {
                setServices(res.data);
                setFilteredServices(res.data);
                const uniqueCategories = [...new Set(res.data.map(service => service.category))];
                setCategories(uniqueCategories);
                setActiveCategory(uniqueCategories[0] || '');
            })
            .catch(err => console.error(err));
    }, [axiosSecure]); 
    const handleSearch = (e) => {
        const text = e.target.value.toLowerCase();
        setSearchText(text);

        const matched = services.filter(service =>
            service.name.toLowerCase().includes(text)
        );
        setFilteredServices(matched);
    };

    const scrollToCategory = (cat) => {
        categoryRefs.current[cat]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveCategory(cat);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollThreshold = window.innerHeight / 2.5;
            let foundActiveCategory = '';

            for (let i = 0; i < categories.length; i++) {
                const cat = categories[i];
                const section = categoryRefs.current[cat];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= scrollThreshold && rect.bottom >= scrollThreshold) {
                        foundActiveCategory = cat;
                        break;
                    }
                }
            }
            if (foundActiveCategory && foundActiveCategory !== activeCategory) {
                setActiveCategory(foundActiveCategory);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial check on mount
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [categories, activeCategory]);

    return (
        <div className="px-4 md:px-10 pt-10">

            <div className=" text-center mb-10">
                <h1
                    className="text-3xl md:text-4xl font-bold text-secondary mb-4"
                    data-aos="fade-down"
                >
                    Discover Meaningful Services
                </h1>
                <p
                    className=" mb-6 max-w-2xl mx-auto"
                    data-aos="fade-down"
                    data-aos-delay="100"
                >
                    Find what you need by Browse categories or searching by name.
                </p>
                <input
                    type="text"
                    placeholder="Search service by name..."
                    value={searchText}
                    onChange={handleSearch}
                    className="input input-bordered w-full max-w-xl mx-auto"
                    data-aos="fade-in"
                    data-aos-delay="200"
                />
            </div>

            <div className="md:flex gap-8">
                <div
                    className="hidden md:block w-1/4 sticky top-24 self-start"
                    data-aos="fade-right"
                >
                    <h3 className="text-xl font-bold text-primary mb-3">Categories</h3>
                    {categories.map((cat, index) => (
                        <button
                            key={cat}
                            onClick={() => scrollToCategory(cat)}
                            className={`block text-left w-full px-4 py-2 rounded duration-300 font-medium ${activeCategory === cat ? 'custom-btn' : 'hover:bg-[#4CAF50] hover:text-white'}`}
                            data-aos="fade-right"
                            data-aos-delay={index * 50 + 300}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="md:w-3/4 space-y-10">
                    {
                        searchText ?
                            <div>
                                <h2
                                    className="text-2xl font-bold text-secondary mb-4 border-b pb-2"
                                    data-aos="fade-right"
                                >
                                    Search Results
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredServices.length ? filteredServices.map((service, index) => (
                                        <div
                                            key={service._id}
                                            className="card shadow-lg rounded-xl p-4 flex gap-4"
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                        >
                                            <img src={service.image} alt={service.name} className="w-full h-50 object-cover rounded-lg" />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-primary">{service.name}</h3>
                                                <p className="text-sm mb-2">
                                                    {service.description.length > 80
                                                        ? service.description.slice(0, 80) + '...'
                                                        : service.description}
                                                </p>
                                                <div className="flex justify-between items-center mt-2">
                                                    <div className="flex items-center gap-2">
                                                        <img src={service.providerPhoto} alt="provider" className="w-6 h-6 rounded-full" />
                                                        <span className="text-sm font-medium">{service.providerName}</span>
                                                    </div>
                                                    <span className="text-base font-semibold text-green-600">${service.price}</span>
                                                </div>
                                                <Link to={`/details/${service._id}`}>
                                                    <button className="custom-btn custom-btn:hover mt-5 ">View Details</button>
                                                </Link>
                                            </div>
                                        </div>
                                    )) : <p className="text-red-500" data-aos="fade-in">No services matched your search.</p>}
                                </div>
                            </div>
                            :
                            categories.map(category => (
                                <div
                                    key={category}
                                    ref={el => categoryRefs.current[category] = el}
                                >
                                    <h2
                                        className="text-2xl font-bold text-secondary mb-4 border-b pb-2"
                                        data-aos="fade-right"
                                    >
                                        {category}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {services
                                            .filter(service => service.category === category)
                                            .map((service, index) => (
                                                <div
                                                    key={service._id}
                                                    className="card shadow-lg rounded-xl p-4 flex gap-4"
                                                    data-aos="fade-up"
                                                    data-aos-delay={index * 100}
                                                >
                                                    <img src={service.image} alt={service.name} className="w-full h-50 object-cover rounded-lg" />
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-primary">{service.name}</h3>
                                                        <p className="text-sm mb-2">
                                                            {service.description.length > 80
                                                                ? service.description.slice(0, 80) + '...'
                                                                : service.description}
                                                        </p>
                                                        <div className="flex justify-between items-center mt-2">
                                                            <div className="flex items-center gap-2">
                                                                <img src={service.providerPhoto} alt="provider" className="w-6 h-6 rounded-full" />
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
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    );
};

export default AllPost;
