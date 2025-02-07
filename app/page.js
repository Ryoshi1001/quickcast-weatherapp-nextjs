import Image from "next/image";
import WeatherUI from "./components/WeatherUI";
import backgroundImage from '../public/weatherbg.jpg'

export default function Home() {
  return (
   <>
   <section 
   className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-20"
   style={{backgroundImage: "url('/weatherbg.jpg')"}}
   >
    <WeatherUI/>
   </section>
   </>
  );
}


