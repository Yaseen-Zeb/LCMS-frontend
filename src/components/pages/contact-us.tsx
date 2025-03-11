import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "../shared/header";
import NavBar from "../shared/nav-bar";
import Footer from "../shared/footer";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
const ContactUs = () => {
  return (
    <div className="text-gray-800 flex flex-col justify-center">
      <NavBar />
      <Header />
      

      <div className="container mx-auto p-6">
        <Card className="shadow-lg rounded-2xl p-6 bg-white">
          <CardContent>
            <h2 className="text-xl font-medium mb-1">Get in Touch</h2>
            <p className="text-gray-600 mb-3">
              Have questions or need assistance? Reach out to us, and we'll be happy to help!
            </p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium">Name</label>
                <Input type="text" className="w-full" placeholder="Your Name" required />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium">Email</label>
                <Input type="email" className="w-full" placeholder="Your Email" required />
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-medium">Message</label>
                <Textarea className="w-full" rows={4} placeholder="Your Message" required></Textarea>
              </div>
              
              <div className="flex justify-end">
                <Button>Send Message</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;