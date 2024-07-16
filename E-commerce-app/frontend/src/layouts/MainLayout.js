// layouts/MainLayout.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const MainLayout = ({ children }) => {
    return (
        <div className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative`}>
            <main className="container mx-auto p-4">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
