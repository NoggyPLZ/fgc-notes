export default function Footer(){
    return (
        <footer className="flex h-[40] mt-auto text-center px-5 bg-gray-300 place-items-center">
            bhicksdev &copy; {new Date().getFullYear().toString()}
        </footer>
    )
}