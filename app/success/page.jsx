
import Link from "next/link";

export default function Success() {
  // const animationURL = "./public/lootie/success.json";
  return (
    <div className="w-full max-w-2xl h-full flex items-center justify-center flex-col mx-auto ">
      {/* <Player 
        src={animationURL}
        autoplay
        keepLastFrame
        speed={0.8}
      /> */}
      <h1>Reserva efetuada com sucesso</h1>
      
      <Link href={"/"} 
        className="
        h-10
        px-2
        text-base
        bg-optionB-main
        hover:bg-opacity-75
        rounded
        w-full
        text-white
        hover:text-white
        hover:no-underline
        visited:text-white
        font-lg
        flex
        items-center
        justify-center
        "
      >
        Voltar
      </Link>
    </div>
  )
}