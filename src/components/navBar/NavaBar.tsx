import { Link } from 'react-router-dom';
import { LucidePackage, LucideShoppingCart, LucideClipboardList, LucideUserCheck, LucideLeaf } from 'lucide-react';

const NavBar = () => {
    return (
        <nav className="bg-primary text-primary-foreground shadow-md">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Ícono representando el sistema POS de una tienda naturista */}
                <Link to="/" className="flex items-center gap-2 text-lg font-semibold hover:text-secondary">
                    <LucideLeaf className="w-6 h-6" />
                </Link>

                <div className="flex items-center gap-6">
                    {/* Menú de Navegación */}
                    <Link to="/productos" className="flex items-center gap-2 hover:text-secondary">
                        <LucidePackage className="w-5 h-5" />
                        Productos
                    </Link>
                    <Link to="/ventas" className="flex items-center gap-2 hover:text-secondary">
                        <LucideShoppingCart className="w-5 h-5" />
                        Ventas
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
