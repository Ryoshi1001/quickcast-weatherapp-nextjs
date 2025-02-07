import Image from "next/image";
import WeatherUI from "./components/WeatherUI";
import backgroundImage from '../public/weatherbg.jpg'

export default function Home() {
  return (
   <>
   <section className="flex items-center justify-center w-full h-screen p-4"
   style={{
    backgroundImage:`url(${backgroundImage.src})`, 
    width: "100vw", 
    height: "100vh", 
    backgroundSize: "cover", 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center'
   }}
   >
    <WeatherUI/>
   </section>
   </>
  );
}


