export default function Avatar({name}) {
  function HandleInitials(name) {
    const words = name.toUpperCase().split(' ')
    const firstLetters = words.map(word => word[0])
    const result = firstLetters.join('')
    return result
  }
  return(
    <div className="w-8 h-8 rounded-full bg-optionB-gray-dark flex items-center justify-center">
      <span className="text-white text-base font-bold">{HandleInitials(name)}</span>
    </div>
  )
}