import Image from "next/image";
import WeatherUI from "./components/WeatherUI";
import backgroundImage from '../public/weatherbg.jpg'

export default function Home() {
  return (
   <>
   <section 
   className="w-full min-h-screen bg- sm:bg-cover bg-center bg-no-repeat flex items-center justify-center p-[1rem]"
   style={{backgroundImage: "url('/weatherbg.jpg')"}}
   >
    <WeatherUI/>
   </section>
   </>
  );
}


