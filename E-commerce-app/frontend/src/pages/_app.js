// pages/_app.js
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import MainLayout from '../layouts/MainLayout';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider attribute="class">
            <MainLayout>
                <Component {...pageProps} />
            </MainLayout>
        </ThemeProvider>
    );
}

export default MyApp;
