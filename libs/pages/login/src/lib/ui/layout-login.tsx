import { PropsWithChildren } from "react";

export default function LayoutLogin ({ children }: PropsWithChildren) {
  return (
    <main className="h-screen overflow-hidden bg-white">
      <div className="pt-16 h-full relative">{ children }</div>
    </main>
  )
}