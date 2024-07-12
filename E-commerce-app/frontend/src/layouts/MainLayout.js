import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const MainLayout = ({ children }) => {
    return (
        <div className={inter.className}>
            {children}
        </div>
    );
};

export default MainLayout;
