import { banner } from "@/assets"
import NavBar from "../shared/nav-bar"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
  import Autoplay from "embla-carousel-autoplay";
  import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
  import { Separator } from "../ui/separator";
import Footer from "../shared/footer";
import { useRef } from "react";

const AboutUs = () => {
    const autoplayInstance = useRef(Autoplay({ delay:3000, stopOnInteraction: true }));

    // Static content for each card
    const aboutUsContent = [
      {
        title: "Connecting Clients & Lawyers",
        description: "Our platform bridges the gap between clients needing legal assistance and lawyers looking for cases.",
      },
      {
        title: "Post Legal Cases",
        description: "Clients can easily post their legal issues, specify requirements, and receive bids from experienced lawyers.",
      },
      {
        title: "Lawyers Bid on Cases",
        description: "Qualified lawyers can browse available cases and place competitive bids to offer their services.",
      },
      {
        title: "Secure Communication",
        description: "Clients and lawyers can communicate securely through our platform to discuss case details and agreements.",
      },
      {
        title: "Manage Cases Efficiently",
        description: "Track case progress, manage bids, and finalize legal services all in one place.",
      },
      {
        title: "Transparent & Fair Pricing",
        description: "Clients can set budgets while lawyers provide competitive quotes, ensuring fair pricing for legal services.",
      },
    ];
  return (
    <div className="text-gray-800 flex flex-col justify-center">
      <NavBar />
      <div
        className="relative w-full h-[280px] bg-cover bg-center flex items-center shadow-lg"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-center max-w-md text-white ml-10 sm:ml-20 lg:ml-44 space-2-4">
          <h1 className="text-3xl font-bold text-yellow-400">Welcome!</h1>
          <p className="text-md">
            We prioritize transparency, delivering excellence and high-quality
            solutions. Our focus on trust and security ensures the
            confidentiality and protection of your sensitive data.
          </p>
        </div>
      </div>
      <div className="container m-auto pt-14">
        <h3 className="text-center text-3xl font-medium ">Most Recent Cases</h3>

        <Carousel
      className="relative w-full overflow-hidden pb-12"
      plugins={[autoplayInstance.current]}
      onMouseEnter={() => autoplayInstance.current.stop()}
      onMouseLeave={() => autoplayInstance.current.play()}
    >
      <CarouselContent>
        {aboutUsContent.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/3 sm:basis-1/2 basis-full">
            <Card className="bg-white shadow-md p-6 rounded-lg text-center">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{item.description}</p>
                <Separator className="my-3" />
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="absolute left-[50%] bottom-10">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>


        
      </div>
      <Footer />
    </div>
  )
}

export default AboutUs