import { Card, CardContent } from "@/components/ui/card";
import Header from "../shared/header";
import NavBar from "../shared/nav-bar";
import Footer from "../shared/footer";

const PrivacyPolicy = () => {
  return (
    <div className="text-gray-800 flex flex-col justify-center">
      <NavBar />
      <Header />
      <div className="container mx-auto px-4 sm:px-6 py-6">
        {/* Main Content */}
        <Card className="shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] rounded-none bg-white">
          <CardContent className="p-4 sm:p-6">
            <h1 className="text-xl font-medium mb-2">Privacy Policy</h1>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">
              LEGSER is committed to protecting your privacy and ensuring
              transparency in how we collect, use, and protect your personal
              information.
            </p>

            <h2 className="text-lg font-medium mt-4">
              Compliance with Data Protection Laws
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              This Privacy Policy follows applicable data protection laws,
              including GDPR, CCPA, and others.
            </p>

            <h2 className="text-lg font-medium mt-4">
              What Information Do We Collect?
            </h2>
            <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1">
              <li>
                <strong>For Clients:</strong> Name, email, phone number, legal
                case details, payment information.
              </li>
              <li>
                <strong>For Lawyers:</strong> Name, email, phone,
                specialization, qualifications, certifications.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, device information,
                browsing behavior.
              </li>
            </ul>

            <h2 className="text-lg font-medium mt-4">
              How Do We Use Your Information?
            </h2>
            <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1">
              <li>To connect clients and lawyers.</li>
              <li>To process registrations and verify lawyers.</li>
              <li>To ensure platform security and prevent fraud.</li>
            </ul>

            <h2 className="text-lg font-medium mt-4">Data Security Measures</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We use encryption, secure servers, and access control to protect
              your data.
            </p>

            <h2 className="text-lg font-medium mt-4">User Rights & Choices</h2>
            <ul className="list-disc ml-6 text-gray-600 text-sm space-y-1">
              <li>
                <strong>Access:</strong> Request a copy of your data.
              </li>
              <li>
                <strong>Correction:</strong> Update inaccurate details.
              </li>
              <li>
                <strong>Deletion:</strong> Request data removal.
              </li>
            </ul>

            <h2 className="text-lg font-medium mt-4">Changes to This Policy</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
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
