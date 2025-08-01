import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Users, LifeBuoy, ShieldCheck, ThumbsUp } from 'lucide-react';

/**
 * @description Custom hook to detect if the user is on a mobile device based on window width.
 * @returns {boolean} True if the window width is 768px or less.
 */
const useIsMobile = () => {
    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);
    return isMobile;
};

/**
 * @description Custom hook to determine the orientation of an image from its source.
 * This is used to apply appropriate styling to fit landscape or portrait images
 * correctly within the portrait-oriented cards.
 * @param {string} src - The source URL of the image.
 * @returns {'landscape' | 'portrait' | 'square' | null} The detected orientation of the image.
 */
const useImageOrientation = (src: string): 'landscape' | 'portrait' | 'square' | null => {
    const [orientation, setOrientation] = React.useState<'landscape' | 'portrait' | 'square' | null>(null);

    React.useEffect(() => {
        if (!src) return;
        const img = new Image();
        img.src = src;
        img.onload = () => {
            if (img.width > img.height) {
                setOrientation('landscape');
            } else if (img.height > img.width) {
                setOrientation('portrait');
            } else {
                setOrientation('square');
            }
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${src}`);
        }
    }, [src]);

    return orientation;
};

/**
 * @description A card component to display a single logo. It uses the useImageOrientation
 * hook to dynamically adjust its styling for optimal display.
 * @param {{ src: string; alt: string }} props - The image source and alt text for the logo.
 */
const LogoCard = ({ src, alt }: { src: string; alt: string }) => {
    const orientation = useImageOrientation(src);

    const imageClass = () => {
        switch (orientation) {
            case 'landscape':
                return 'w-full h-auto';
            case 'portrait':
                return 'h-full w-auto';
            case 'square':
            default:
                return 'w-full h-full object-contain';
        }
    };

    return (
        <div className="carousel-card">
            <div className="carousel-card-content">
                <img
                    src={src}
                    alt={alt}
                    className={`carousel-card-logo ${imageClass()}`}
                    loading="lazy"
                />
            </div>
        </div>
    );
};

/**
 * @description A hybrid carousel component. It displays a CSS-animated infinite scroll
 * on desktop and a manually scrollable (touch/swipe) infinite carousel on mobile devices,
 * complete with a helpful popup message.
 * @param {{ logos: {src: string, alt: string}[]; duration?: number; popupText: string }} props
 */
const LogoCarousel = ({ logos, duration = 40, popupText }: { logos: {src: string, alt: string}[], duration?: number, popupText: string }) => {
    const isMobile = useIsMobile();
    const [showPopup, setShowPopup] = React.useState(false);
    const scrollRef = React.useRef<HTMLDivElement>(null);
    
    // We use three sets of logos for the mobile manual scroll to create a seamless infinite loop.
    // The user starts in the middle set. When they scroll near the edge, we silently jump them
    // to the corresponding position in the middle set.
    const extendedLogos = React.useMemo(() => [...logos, ...logos, ...logos], [logos]);

    // On mobile, show a helpful popup after a short delay.
    React.useEffect(() => {
        if (isMobile) {
            const timer = setTimeout(() => {
                setShowPopup(true);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [isMobile]);

    // This effect implements the infinite scroll logic for manual scrolling on mobile.
    React.useEffect(() => {
        const track = scrollRef.current;
        if (!isMobile || !track || logos.length === 0) return;

        const logoSetWidth = track.scrollWidth / 3;
        // Start the user in the middle set of logos.
        track.scrollLeft = logoSetWidth;

        const handleScroll = () => {
            // If the user scrolls to the beginning of the first cloned set...
            if (track.scrollLeft < 1) {
                // ...jump them to the end of the middle set to continue scrolling left.
                track.scrollLeft = logoSetWidth * 2 - track.clientWidth;
            } 
            // If the user scrolls to the end of the second cloned set...
            else if (track.scrollLeft >= (logoSetWidth * 2)) {
                // ...jump them back to the beginning of the middle set.
                track.scrollLeft = logoSetWidth;
            }
        };

        track.addEventListener('scroll', handleScroll, { passive: true });
        return () => track.removeEventListener('scroll', handleScroll);

    }, [isMobile, logos.length]);


    // RENDER LOGIC:
    // On mobile, render a manually scrollable carousel with a popup.
    // On desktop, render the original CSS-only infinite animation.
    if (isMobile) {
        return (
            <div className="manual-scroll-container">
                {showPopup && (
                    <div className="carousel-popup">
                        <p>{popupText}</p>
                        <button onClick={() => setShowPopup(false)} aria-label="Close message">&times;</button>
                    </div>
                )}
                <div className="manual-scroll-track" ref={scrollRef}>
                    {extendedLogos.map((logo, index) => (
                        <div className="carousel-slide" key={index}>
                            <LogoCard src={logo.src} alt={logo.alt} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Desktop version with pure CSS animation
    return (
        <div className="infinite-scroll-container">
            <div
                className="infinite-scroll-track"
                style={{
                    '--animation-duration': `${duration}s`,
                    '--total-logos': logos.length
                } as React.CSSProperties}
            >
                {[...logos, ...logos].map((logo, index) => (
                    <div className="infinite-scroll-slide" key={index}>
                        <LogoCard src={logo.src} alt={logo.alt} />
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
            role: "Founder & CEO",
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
        },
        {
            name: "Hafeedh Balogun",
            role: "Frontend Engineer",
            image: "/images/Hafeedh.jpeg",
            description: "A data-centric engineer with a passion for turning raw data into actionable insights."
        },
        {
            name: "Emmanuel Andy Eze",
            role: "Backend Engineer",
            image: "/images/Emmanuel.jpeg",
            description: "An experienced engineer with a passion for creating unique digital experiences acrross all platforms: mobile, web—name it!."
        }
    ];

    const clients = [
        { src: "/images/CL1.png", alt: "Jabulani Express Logo" },
        { src: "/images/CL 11.jpeg", alt: "Nutrition Kids Logo" },
        { src: "/images/CL 12.jpeg", alt: "Nutrition Kids Logo" },
        { src: "/images/cl 17.png", alt: "Nutrition Kids Logo" },
        { src: "/images/CL 16.png", alt: "Nutrition Kids Logo" },
        { src: "/images/CL 15.jpeg", alt: "Nutrition Kids Logo" },
        { src: "/images/CL 13.jpeg", alt: "Unknown Logo 1" },
        { src: "/images/CL 4.png", alt: "Aish Naturals Logo" },
        { src: "/images/CL 5.jpg", alt: "DaddyPlug.ng Logo" },
        { src: "/images/CL 6.jpg", alt: "Dharkag Empire Logo" },
        { src: "/images/CL 7.webp", alt: "My Food Angels Logo" },
        { src: "/images/IN 7.jpeg", alt: "EssenceCare Logo" },
        { src: "/images/IN 8.jpeg", alt: "EHCON Logo" },
    ];

    const investors = [
        { src: "/images/ge trust.jpg", alt: "Grooming Endowment Trust Logo" },
        { src: "/images/LBS-Logo-1.png", alt: "Lagos Business School Logo" },
        { src: "/images/IN 3.jpeg", alt: "The Tony Elumelu Foundation Logo" },
        { src: "/images/IN 4.jpeg", alt: "54 Collective Logo" },
        { src: "/images/IN 5.jpeg", alt: "H-R Startup Logo" },
        { src: "/images/IN 6.jpeg", alt: "Senator Abiru Innovation Lab Logo" },
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
                            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Make better accounting decisions with Ploutos
                            </h1>
                            <p className="text-base md:text-xl text-gray-600 mb-8">
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
                    <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                        We're empowering you for financial excellence
                    </h2>
                    <p className="text-base md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                        Ploutos Page Limited is a fintech and professional services company helping MSMEs and market traders grow with smart, simple, and human‑centered bookkeeping and financial tools.
                        Whether you're a startup, a small business, or a woman selling in the open market — we've got you covered.
                    </p>
                </div>
            </section>

            {/* Our Trusted Clients Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                            Our Trusted Clients
                        </h2>
                        <p className="text-sm md:text-xl text-gray-600">
                            We are proud to have worked with a diverse range of businesses.
                        </p>
                    </div>
                    <LogoCarousel 
                        logos={clients} 
                        duration={40} 
                        popupText="If the carousel isn't scrolling for you swipe your finger to the right to see our distinguished clients"
                    />
                </div>
            </section>

            {/* Who Supports Us Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                            Who Supports Us
                        </h2>
                        <p className="text-sm md:text-xl text-gray-600">
                            We are backed by a network of forward-thinking organisations.
                        </p>
                    </div>
                    <LogoCarousel 
                        logos={investors} 
                        duration={50} 
                        popupText="If the carousel isn't scrolling for you swipe your finger to the right to see our distinguished supporters"
                    />
                </div>
            </section>


            {/* Why Ploutos Section */}
            <section className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-blue-400 mb-6">
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
                                    <p className="text-base md:text-xl text-gray-200">{item.text}</p>
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
                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            The founder
                        </h2>
                        <p className="text-base md:text-xl text-gray-600">
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
                                <p className="text-base text-gray-600 leading-relaxed">{founder.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            The Team
                        </h2>
                        <p className="text-base md:text-xl text-gray-600">
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
                                <p className="text-base text-gray-600 leading-relaxed">{member.description}</p>
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
