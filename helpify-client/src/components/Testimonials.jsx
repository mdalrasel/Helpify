import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    quote: "Their service was outstanding! My task was completed quickly and efficiently. I am extremely satisfied.",
    name: "Rahim Ahmed",
    title: "Home Repair",
    image: "https://i.ibb.co/SdnL1N2/user1.jpg"
  },
  {
    id: 2,
    quote: "Helpify truly makes life easier. I never thought booking beauty services could be this simple. The quality is also excellent.",
    name: "Farjana Begum",
    title: "Beauty Services",
    image: "https://i.ibb.co/Q8Q8w32/user2.jpg"
  },
  {
    id: 3,
    quote: "Trustworthy providers and excellent customer support. I will definitely use Helpify again in the future.",
    name: "Kamal Hossain",
    title: "Electronics Repair",
    image: "https://i.ibb.co/SdnL1N2/user1.jpg"
  },
];

const Testimonials = () => {

  return (
    <section className="py-16   ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-down">
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className=" p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              data-aos={index % 2 === 0 ? 'flip-left' : 'flip-right'}
            >
              <div className="flex text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className=" italic mb-4">"{testimonial.quote}"</p>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-blue-500"
              />
              <h4 className="text-lg font-semibold">{testimonial.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;