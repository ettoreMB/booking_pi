import { Carousel } from "flowbite-react";

export default function MobileCarrousel({ images }) {

  return (

    <div className="w-full h-96 px-10 ">
    {!images && ( <img src="/icons/no-image.svg" alt="no image" className="rounded-lg h-full w-full" />)}
    {images && (  <Carousel>
        {images.map(image => (
          <img key={image} src={image} alt="" />
        ))}
      </Carousel>)}
    </div>

  )
}