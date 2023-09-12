export default function FormGroupInput({label, children}) {
  return (
    <div className="flex flex-row flex-1">
      <label htmlFor="">{label}</label>
      {children}
    </div>
  )
}