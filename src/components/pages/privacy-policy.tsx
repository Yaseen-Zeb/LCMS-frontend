import { Card, CardContent } from "@/components/ui/card";
import Header from "../shared/header";
import NavBar from "../shared/nav-bar";
import Footer from "../shared/footer";

const PrivacyPolicy = () => {
  return (
    <div className="text-gray-800 flex flex-col justify-center">
      <NavBar />
      <Header />
      <div className="container mx-auto p-6">
        {/* Main Content */}
        <Card className="shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-none p-6 bg-white">
          <CardContent>
            <h1 className="text-xl font-medium mb-1">Privacy Policy</h1>
            <p className="text-gray-600 mb-4 text-sm">
              LEGSER is committed to protecting your privacy and ensuring
              transparency in how we collect, use, and protect your personal
              information.
            </p>

            <h2 className="text-lg font-medium mt-3">
              Compliance with Data Protection Laws
            </h2>
            <p className="text-gray-600">
              This Privacy Policy follows applicable data protection laws,
              including GDPR, CCPA, and others.
            </p>

            <h2 className="text-lg font-medium mt-3">
              What Information Do We Collect?
            </h2>
            <ul className="list-disc ml-6 text-gray-600 text-sm">
              <li>
                For Clients: Name, email, phone number, legal case details,
                payment information.
              </li>
              <li>
                For Lawyers: Name, email, phone, specialization, qualifications,
                certifications.
              </li>
              <li>
                Technical Data: IP address, device information, browsing
                behavior.
              </li>
            </ul>

            <h2 className="text-lg font-medium mt-3">
              How Do We Use Your Information?
            </h2>
            <ul className="list-disc ml-6 text-gray-600 text-sm">
              <li>To connect clients and lawyers.</li>
              <li>To process registrations and verify lawyers.</li>
              <li>To ensure platform security and prevent fraud.</li>
            </ul>

            <h2 className="text-lg font-medium mt-3">Data Security Measures</h2>
            <p className="text-gray-600">
              We use encryption, secure servers, and access control to protect
              your data.
            </p>

            <h2 className="text-lg font-medium mt-3">User Rights & Choices</h2>
            <ul className="list-disc ml-6 text-gray-600 text-sm">
              <li>Access: Request a copy of your data.</li>
              <li>Correction: Update inaccurate details.</li>
              <li>Deletion: Request data removal.</li>
            </ul>

            <h2 className="text-lg font-medium mt-3">Changes to This Policy</h2>
            <p className="text-gray-600">
              We may update this policy periodically. Changes will be posted
              here.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
