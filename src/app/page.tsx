"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { BounceLoader } from "react-spinners"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push("/get-medical-record")
  }, [router])

  return (
    <main className="p-10">
      <BounceLoader
        color="#309C7A"
        className="fixed left-1/2 -translate-x-1/2 transform"
      />
    </main>
  )
}
