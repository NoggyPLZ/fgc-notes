import ToggleLogin from "@/components/forms/ToggleLogin"

export default function Home() {
  return (
   <div className="text-center flex flex-col gap-5 justify-center mt-auto mb-auto">
    <h1 className="text-5xl font-bold">Home Page</h1>
    <ToggleLogin/>
   </div>
  )
}