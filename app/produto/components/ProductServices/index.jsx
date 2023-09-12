
const data = [
  {
    icon: 'kitchen.svg',
    text: 'Cozinha'
  },
  {
    icon: 'tv.png',
    text: 'Televisor'
  },
  {
    icon: 'air.svg',
    text: 'Ar condicionado'
  },
  {
    icon: 'pet.svg',
    text: 'Aceita pet'
  },
  {
    icon: 'car.png',
    text: 'Estacionamento gratuito'
  },
  {
    icon: 'swin.svg',
    text: 'Piscina'
  },
  {
    icon: 'wifi.png',
    text: 'Wifi'
  },
]

export default function ProductServices() {
  return (
    <section className="py-4 h-64 flex flex-col">
    <h2 className="text-xl text-optionB-gray-dark font-bold mb-4 px-10">O que este lugar oferece ?</h2>
    <div className="w-full border-b-2 border-optionB-main mb-10"></div>
    <div className="grid grid-cols-2 md:grid-cols-4  gap-4 md:gap-11 pl-10 md:pl-0">
      {data.map(item => (
        <div key={item.icon} className="flex  gap-3 px-2 md:px-10 items-center">
          <img src={`/icons/${item.icon}`} alt="" className="h-7 w-7" />
          <span>{item.text}</span>
        </div>
      ))}

    </div>
  </section>
  )
}