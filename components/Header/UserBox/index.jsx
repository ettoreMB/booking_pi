
import Avatar from "../Avatar";

export default function UserBox({name, onHandleLogout}) {

  return (
    <div className="flex items-center gap-4">
      {/* <Avatar name={name}/> */}
      <div className="flex text-base font-bold">
        <div className="flex flex-col">
          <span className="text-optionB-gray-main">Olá,</span>
          <span className="text-optionB-main">{name}</span>
        </div>
      </div>
    </div>
  
  )
}