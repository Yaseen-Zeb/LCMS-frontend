import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NavBar from "../shared/nav-bar";
import Header from "../shared/header";
import Footer from "../shared/footer";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="text-gray-800 flex flex-col justify-center">
      <NavBar />
      <Header />
      <div className="container mx-auto p-6">
        {/* Main Content */}
        <Card className="shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-none p-6 bg-white">
          <CardContent>
            <div className="text-center">
              <h1 className="text-2xl font-medium ">About Us</h1>
              <p className="text-gray-600 mb-4">
                Welcome to LEGSER, your trusted platform for legal services. Our
                mission is to connect clients with experienced lawyers, ensuring
                accessible, transparent, and efficient legal solutions.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center mt-10">
              <div className="md:flex-1 p-4">
                <h2 className="text-xl font-medium">Our Mission</h2>
                <p className="text-gray-600">
                  We aim to simplify the process of finding legal assistance by
                  providing a seamless, technology-driven platform. Whether
                  you're a client seeking legal guidance or a lawyer looking to
                  expand your reach, LEGSER empowers you with the right tools.
                </p>
              </div>
              <div className="md:w-1/3">
                <img
                  src="https://www.shutterstock.com/image-photo/lawyers-provide-legal-advice-represent-600nw-2461343927.jpg"
                  alt="Our Mission"
                  width={500}
                  height={300}
                  className="rounded-lg w-full h-[250px]"
                />
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="flex flex-col md:flex-row items-center mt-10">
              <div className="md:w-1/3 ">
                <img
                  src="https://www.thepinnaclelist.com/wp-content/uploads/2021/05/real-estate-lawyer-handshake-deal.jpg"
                  alt="Why Choose Us"
                  width={500}
                  height={300}
                  className="rounded-lg w-full h-[250px]"
                />
              </div>
              <div className="md:flex-1 p-4 md:pl-20">
                <h2 className="text-xl font-medium">Why Choose Us?</h2>
                <ul className="list-disc ml-6 text-gray-600">
                  <li>
                    Verified and experienced lawyers across multiple legal
                    domains.
                  </li>
                  <li>Secure and confidential client-lawyer communication.</li>
                  <li>Streamlined case posting and management system.</li>
                  <li>
                    Transparent reviews and ratings to help clients make
                    informed decisions.
                  </li>
                </ul>
              </div>
            </div>

            {/* Our Team Section */}
            <div className="flex flex-col md:flex-row items-center mt-10">
              <div className="md:flex-1 p-4">
                <h2 className="text-xl font-medium">Our Team</h2>
                <p className="text-gray-600">
                  LEGSER is powered by a dedicated team of legal experts, tech
                  professionals, and customer support specialists, all committed
                  to making legal services more accessible.
                </p>
              </div>
              <div className="md:w-1/3">
                <img
                  src="https://sierraeducationlaw.com/wp-content/uploads/2016/02/clovis-education-attorney.jpg"
                  alt="Our Team"
                  width={500}
                  height={300}
                  className="rounded-lg w-full h-[250px]"
                />
              </div>
            </div>

            <div className="mb-8 mt-20 text-center space-y-2">
              <h2 className="text-xl font-semibold ">Get in Touch</h2>
              <p className="text-gray-600">
                Have questions or need assistance? Reach out to our team today!
              </p>
              <Link to={"/contact-us"}><Button variant={"outline"}>Contact Us</Button></Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
