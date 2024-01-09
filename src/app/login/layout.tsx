import React, { PropsWithChildren } from "react"

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="bg-patern flex h-full w-full bg-cover p-2 pb-[22px]">
      {props.children}
    </div>
  )
}

export default Layout
