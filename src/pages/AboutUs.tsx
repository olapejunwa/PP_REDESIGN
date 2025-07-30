import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
// === MODIFIED ICONS ===
import { Users, LifeBuoy, ShieldCheck, ThumbsUp } from 'lucide-react';

// A reusable carousel component for logos
const LogoCarousel = ({ logos, duration = 50 }) => {
    // Duplicate logos for a seamless loop
    const extendedLogos = [...logos, ...logos];

    return (
        <div className="slider" style={{ '--duration': `${duration}s`, '--logo-count': logos.length }}>
            <div className="slide-track">
                {extendedLogos.map((logo, index) => (
                    <div className="slide" key={index}>
                        <img 
                            src={logo.src} 
                            alt={logo.alt} 
                            className="dynamic-logo" 
                            onLoad={(e) => {
                                const img = e.target as HTMLImageElement;
                                const container = img.parentElement;
                                if (container) {
                                    const aspectRatio = img.naturalWidth / img.naturalHeight;
                                    if (aspectRatio > 2) {
                                        // Wide logo - prioritize width
                                        img.style.width = '90%';
                                        img.style.height = 'auto';
                                        img.style.maxHeight = '80%';
                                    } else if (aspectRatio < 0.8) {
                                        // Tall logo - prioritize height
                                        img.style.height = '90%';
                                        img.style.width = 'auto';
                                        img.style.maxWidth = '80%';
                                    } else {
                                        // Square-ish logo - balanced sizing
                                        img.style.width = '80%';
                                        img.style.height = '80%';
                                        img.style.objectFit = 'contain';
                                    }
                                }
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


const AboutUs = () => {
    const founders = [
        {
            name: "Olapeju Nwanganga",
            role: "Co-Founder & CEO",
            image: "/images/Mrs Peju.jpg",
            description: "Olapeju Nwanganga is a finance expert and the founder of Ploutos Page Limited, a leading bookkeeping and financial management firm dedicated to helping MSMEs and startups streamline their finances for sustainable growth. With over 10 years of cross-industry experience in FMCG, oil & gas, healthcare, and luxury goods, she has worked with top organizations like RusselSmith, BellaNaija, Pace gate Limited driving financial strategy and operational efficiency."
        },
    ];

    const team = [
        {
            name: "Oyindamola Adebowale",
            role: "Product Manager",
            image: "/images/Oyinda.JPG",
            description: "Oyindamola Adebowale is a dynamic and results-oriented professional with a strong foundation in both Product Management and Social Media Management. Demonstrating a keen ability to translate technical expertise into strategic insights, driving effective communication and collaboration. Oyindamola possesses a unique skill set that allows for a holistic approach to problem-solving."
        },
        {
            name: "Evelyn Ita",
            role: "Product Manager",
            image: "/images/EVELYN.jpg",
            description: "Evelyn Ita is a Product Manager at Ploutos Page, where she oversees the development and delivery of user-centered financial tools that empower small businesses to grow sustainably. With a background in sales, customer service, and product design, Evelyn blends strategy with empathy ensuring every product, meets the real needs of everyday entrepreneurs. She is passionate about simplifying finance through accessible, functional, and inclusive solutions."
        },
        {
            name: "Adebukola Deile-Olawale",
            role: "Operations Manager",
            image: "/images/ADEBUKOLA.jpg",
            description: "A dynamic and adaptable professional with a diverse background spanning microbiology, public service and financial technology. Driven by a passion for systems improvement and operational effeciency, she leverages her analytical skills, public sector experience and process-oriented mindset to streamline workflows, optimize service delivery and align internal operations with strategic business goals."
        }
    ];

    // Updated data for the trusted clients section
    const clients = [
        { src: "/images/CL1.png", alt: "Client Logo 1" },
        { src: "/images/CL 2.webp", alt: "Client Logo 2" },
        { src: "/images/CL 3.webp", alt: "Client Logo 3" },
        { src: "/images/CL 4.png", alt: "Client Logo 4" },
        { src: "/images/CL 5.jpg", alt: "Client Logo 5" },
        { src: "/images/CL 6.jpg", alt: "Client Logo 6" },
        { src: "/images/CL 7.webp", alt: "Client Logo 7" },
        { src: "/images/IN 7.jpeg", alt: "Client Logo 7" },
        { src: "/images/IN 8.jpeg", alt: "Client Logo 8" },
    ];

    // Data for the new "Who Supports Us" section
    const investors = [
        { src: "/images/ge trust.jpg", alt: "Investor Logo 1" },
        { src: "/images/LBS-Logo-1.png", alt: "Investor Logo 2" },
        { src: "/images/IN 3.jpeg", alt: "Investor Logo 3" },
        { src: "/images/IN 4.jpeg", alt: "Investor Logo 4" },
        { src: "/images/IN 5.jpeg", alt: "Investor Logo 5" },
        { src: "/images/IN 6.jpeg", alt: "Investor Logo 6" },
       
    ];

    const whyPloutos = [
        {
            icon: Users,
            text: "Built for real people, not just Accountants"
        },
        {
            icon: LifeBuoy,
            text: "Human + Digital support for every user level"
        },
        {
            icon: ShieldCheck,
            text: "Proven tools for compliance, funding, and scale"
        },
        {
            icon: ThumbsUp,
            text: "Trusted by over multiple businesses across Nigeria."
        }
    ];


    return (
        <div className="min-h-screen bg-white">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Make better accounting decisions with Ploutos
                            </h1>
                            <p className="text-base text-gray-600 mb-8">
                                At Ploutos Page we are passionate about helping businesses succeed by providing them with the tools and support they need to manage their finances effectively. We believe that every business, regardless of its size, deserves access to high-quality financial services and innovative solutions to drive growth.
                            </p>
                            <Link to="/contact" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
                                Get Started
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="bg-gray-200 rounded-2xl p-8 relative overflow-hidden">
                                <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full"></div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
                                    <div className="flex-1">
                                        <div className="w-32 h-32 bg-white rounded-lg shadow-lg"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        We're empowering you for financial excellence
                    </h2>
                    <p className="text-base text-gray-600 mb-8 max-w-3xl mx-auto">
                        Ploutos Page Limited is a fintech and professional services company helping MSMEs and market traders grow with smart, simple, and human‑centered bookkeeping and financial tools.
                        Whether you're a startup, a small business, or a woman selling in the open market — we’ve got you covered.
                    </p>
                </div>
            </section>

            {/* Our Trusted Clients Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Our Trusted Clients
                        </h2>
                        <p className="text-lg text-gray-600">
                            We are proud to have worked with a diverse range of businesses.
                        </p>
                    </div>
                    <LogoCarousel logos={clients} duration={40} />
                </div>
            </section>

            {/* Who Supports Us Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Who Supports Us
                        </h2>
                        <p className="text-lg text-gray-600">
                            We are backed by a network of forward-thinking investors.
                        </p>
                    </div>
                    <LogoCarousel logos={investors} duration={50} />
                </div>
            </section>


            {/* Why Ploutos Section */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-6">
                            WHY PLOUTOS PAGE?
                        </h2>
                    </div>

                    <div className="space-y-6 max-w-4xl mx-auto">
                        {whyPloutos.map((item, index) => (
                            <div key={index} className="flex items-center space-x-6 p-6 bg-gray-800 rounded-xl">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 icon-pulse-glow">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-lg text-gray-200">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Founders Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            The founder
                        </h2>
                        <p className="text-lg text-gray-600">
                            Building the future of financial management, one business at a time.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        {founders.map((founder, index) => (
                            <div key={index} className="text-center max-w-sm">
                                <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                                    <img
                                        src={founder.image}
                                        alt={founder.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{founder.name}</h3>
                                <p className="text-blue-600 font-semibold mb-4">{founder.role}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{founder.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                            The Team
                        </h2>
                        <p className="text-lg text-gray-600">
                            The dedicated individuals making it all happen.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {team.map((member, index) => (
                            <div key={index} className="text-center max-w-sm mx-auto">
                                <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-blue-600 font-semibold mb-4">{member.role}</p>
                                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default AboutUs;
