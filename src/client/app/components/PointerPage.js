import Link from 'next/link';

export default function PointerPage({isActive, link}) {
    return (
    <li className="relative group">
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
        {link.sublinks && link.sublinks.length > 0 && (
            <ul className="absolute left-0 top-full mt-0 hidden group-hover:block bg-[#333] border border-gray-700 rounded shadow-lg min-w-[200px] z-50 overflow-y-auto max-h-[300px]">
                {link.sublinks.map((sub, idx) => (
                    <li key={idx} className="border-b border-gray-700 last:border-none">
                        <Link 
                            href={sub.path}
                            className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-yellow-200 transition-colors text-sm"
                        >
                            {sub.name}
                        </Link>
                    </li>
                ))}
            </ul>
        )}
    </li>
    );
}
