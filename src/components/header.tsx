import Link from "next/link";

export default function Header(){
    return (
        <header className="p-5 border-b-1 border-gray-300">
            <Link href={'/'} className="font-bold">App Logo Here</Link>
        </header>
    )
}