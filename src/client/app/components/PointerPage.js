import Link from 'next/link';
export default function PointerPage({isActive, link}) {
    return (
    <li>
        <Link 
        href={link.path} 
        className={`no-underline text-lg transition-colors duration-200 ${
            isActive 
            ? 'text-yellow-400 font-bold' 
            : 'text-white font-normal hover:text-yellow-200'
        }`}
        >
        {link.name}
        </Link>
    </li>
    );
}