import Image from "next/image"

function SidebarRow({Img, Icon, title}) {
  return (
    <div className="flex justify-center sm:justify-start items-center space-x-2 p-4 hover:bg-gray-200 rounded-xl cursor-pointer">
        {Img && (
            <Image className="rounded-full" src={Img} width="40" height="40" />
        )}
        {Icon && (
            <Icon className="h-8 w-8 text-blue-500" />
        )}
        <p className="hidden sm:inline-flex font-medium">{title}</p>
    </div>
  )
}

export default SidebarRow