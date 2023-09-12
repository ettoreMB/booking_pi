export default function ProductDescription({title, description}) {
  return (
    <section className="px-10 py-4">
      <h1 className="font-extrabold text-xl mb-4">{title}</h1>
      <p className="text-base mb-4">{description}</p>
      <p className="text-base mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae eius sequi ratione ad quidem, dolorem tempore aliquid quibusdam a ipsum explicabo in et necessitatibus atque voluptatum praesentium adipisci laborum nulla.</p>
    </section>
  )
}