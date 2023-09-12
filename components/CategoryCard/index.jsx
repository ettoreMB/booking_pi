export default function CategoryCard({ name, image , icon}) {

  return (
    <div className=" w-full md:w-60  h-16 md:h-60 rounded-lg flex flex-col shadow-md items-center">
    <div className=" h-0 md:h-44 w-0 md:w-full">
      <img
        className=" h-0 md:h-full w-0  md:w-full object-cover"
        src={image}
        alt="hotel"
      />
      {/* <img
        className="h-10  md:h-0 w-10 md:w-0 "
        src={`/icons/tree-palm-fill.svg`}
        alt="hotel"
      /> */}
    </div>
    <div className="flex flex-col  w-full p-3">
      <h2 className="text-xl text-optionB-gray-dark font-bold">{name}</h2>
      <span className="text-sm text-optionB-gray-main">12312 {name}</span>
    </div>
  </div>
  )
}