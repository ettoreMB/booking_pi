

export default function FormGroup({label,children}) {
  return (
    <div className="mb-2">
      <span className="text-sm font-semibold" >{label}</span>
        {children}
    </div>
  )
}