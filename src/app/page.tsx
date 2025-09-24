import {
  Monitor,
  Smartphone,
  HardDrive,
  Wrench,
  Clock,
  Award,
  MapPin,
  Mail,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[url('/images/home-bg.jpg')] bg-cover bg-center bg-no-repeat p-8">
      <main className="flex-1 flex flex-col items-center justify-center text-white ">
        <div className="text-center">
          <h1 className="text-6xl font-bold ">Fix Forge</h1>
          <h3 className="text-3xl mt-4">Experts You Can Trust</h3>
          <p className="text-xl mt-8">Fast • Reliable • Affordable</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center justify-center">
            <Monitor className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Laptop Repair</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center justify-center">
            <Smartphone className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Phone Repair</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center justify-center">
            <HardDrive className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Data Recovery</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 flex flex-col items-center justify-center">
            <Wrench className="h-8 w-8 mx-auto mb-2" />
            <p className="font-medium">Upgrades</p>
          </div>
        </div>

        <a
          href="tel:+1234567890"
          className="inline-block rounded-lg bg-white backdrop-blur-sm px-4 py-2 text-black hover:bg-white/80 transition-colors duration-200 ease-in-out font-semibold text-xl"
        >
          Call: +1 (234) 567-890
        </a>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-lg mt-8">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Same Day Service</span>
          </div>
          <div className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            <span>90-Day Warranty</span>
          </div>
        </div>
      </main>

      <footer className="p-6 flex flex-col md:flex-row justify-between items-center text-white/80 space-y-4 md:space-y-0">
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 items-center space-x-6">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>123 Tech Street, Your City</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            <span>info@fixforge.com</span>
          </div>
        </div>
        <div>Mon-Sat: 9AM-7PM</div>
      </footer>
    </div>
  );
}
