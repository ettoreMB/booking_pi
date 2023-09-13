import Subtitle from "./subtitle";

export default function Rules() {
  return (

    <section className="py-4 w-full flex flex-col">
      <h2 className="text-xl text-optionB-gray-dark font-bold mb-4 px-10">O que você precisa saber ?</h2>
      <div className="w-full border-b-2 border-optionB-main mb-10"></div>
      <div className="flex flex-wrap flex-col md:flex-row w-full justify-between px-10 ">
            <div className="flex flex-col w-1/3 max-w-xl min-w-min">
              <Subtitle>Regras da casa</Subtitle>
              <span>Check-out: 10:00</span>
              <span>Não é permitido festas</span>
              <span>Nao fumar</span>
            </div>
            <div className="flex flex-col w-1/3 max-w-xl">
              <Subtitle >Saude e segurança</Subtitle>
              <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam ab facilis nam ratione deserunt, amet fugiat minima esse. Voluptates odit neque rerum quidem, cumque aspernatur dolores delectus! Dolore, hic blanditiis</span>
              <span>Detector de fumaças</span>
              <span>Depósito de segurança</span>
            </div>
            <div className="flex flex-col w-1/3 max-w-xl">
              <Subtitle >Politica de cancelamento</Subtitle>
              <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam ab facilis nam ratione deserunt, amet fugiat minima esse. Voluptates odit neque rerum quidem, cumque aspernatur dolores delectus! Dolore, hic blanditiis</span>
            </div>
      </div>
    </section>

  )
}