import { Dialog } from "@headlessui/react"
import { Carousel } from "flowbite-react"
import { useState } from "react"

export default function Gallery({ images }) {

  const firstFiveImages = images ? images.slice(0, 5) : ["/icons/no-image.svg"]
  const lastImage = firstFiveImages[firstFiveImages.length - 1]
  const [isOpen, setIsOpen] = useState(false)

  function handleGallery() {
    setIsOpen(!isOpen)
  }
  console.log(images)
  return (
    <>
      {!images && (
      <div className="h-80 w-full flex items-center">
         <img src="/icons/no-image.svg" alt="no image" className="rounded-lg h-full w-full" />
      </div>)}
      {images && (
         <div className="flex px-10 pb-10 h-full mt-4 gap-3">
        <div className="w-1/2 items-center justify-center flex flex-1">
          <img src={firstFiveImages[0]} alt="" className="rounded-lg h-full h-full object-cover" />
        </div>
        <div className="w-1/2  grid grid-cols-2 grid-rows-2 items-center gap-2 ">
          {firstFiveImages.slice(1, 4).map(image => (
            <img src={image} alt="" key={image} className="rounded-lg gap-4 h-full w-full object-cover" />
          ))}
          <div className="relative inline-block h-full">
            <img src={lastImage} alt="" className="h-full w-full" />
            <div className="absolute bottom-0 right-0 grid place-items-end p-4 w-full bg-optionB-gray-dark opacity-50 hover:opacity-80 ">
              <div className="text-optionB-gray-light cursor-pointer" onClick={() => handleGallery()}>VER MAIS</div>
            </div>
          </div>
        </div>
      </div>
      )}
     

      {images && (
         <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
         <div className="fixed inset-0 bg-optionA-gray-dark/70" aria-hidden="true">
           <div className="fixed inset-0 flex items-center justify-center p-4">
             <Dialog.Panel className={"w-full md:w-1/2 h-full rounded bg-optionA-gray-main  flex flex-col items-center "}>
               <div className="flex flex-1 items-center justify-end w-full text-white p-2">
                 <span className="font-bold text-2xl cursor-pointer" onClick={() => handleGallery()}>X</span>
               </div>
               <Carousel>
                {images.map(image => (
                 <img key={image} src={image} alt="" />
                ))}
               </Carousel>
             </Dialog.Panel>
           </div>
         </div>
 
       </Dialog>
      )}
    </>
  )

}