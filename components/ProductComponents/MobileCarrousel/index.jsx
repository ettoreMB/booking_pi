import { Carousel } from "flowbite-react";
import Image from "next/image";

export default function MobileCarrousel({ images }) {

  return (

    <div className="w-full h-96 px-10 ">
    {!images && ( <Image src="/icons/no-image.svg" alt="no image" className="rounded-lg h-full w-full" />)}
    {images && (  <Carousel>
        {images.map(image => (
          <Image key={image} src={image} alt="" width={100} height={100} />
        ))}
      </Carousel>)}
    </div>

  )
}