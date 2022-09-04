import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import { NoData } from './components';
import { AuthProvider, ModalProvider, ThemeProvider, RoomsProvider, OffCanvaProvider } from './contexts';

function App() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth);
        });
        return () =>
            window.removeEventListener('resize', () => {
                setScreenWidth(window.innerWidth);
            });
    }, []);

    useEffect(() => {
        if (localStorage.getItem('dark')) return;

        localStorage.setItem('dark', JSON.stringify(false));
    }, []);

    const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')));

    useEffect(() => {
        localStorage.setItem('dark', JSON.stringify(dark));
    }, [dark]);

    return (
        <ThemeProvider value={{ dark, setDark }}>
            <div className={`app ${dark && 'dark'}`}>
                {screenWidth > 768 ? (
                    <BrowserRouter>
                        <AuthProvider>
                            <RoomsProvider>
                                <OffCanvaProvider>
                                    <ModalProvider>
                                        <Routes>
                                            {publicRoutes.map((route, index) => {
                                                const Comp = route.component;
                                                const Layout = route.layout;
                                                return (
                                                    <Route
                                                        key={index}
                                                        path={route.path}
                                                        element={
                                                            <Layout>
                                                                <Comp />
                                                            </Layout>
                                                        }
                                                    />
                                                );
                                            })}
                                        </Routes>
                                    </ModalProvider>
                                </OffCanvaProvider>
                            </RoomsProvider>
                        </AuthProvider>
                    </BrowserRouter>
                ) : (
                    <NoData message="Hiện tại Suki chưa hỗ trợ kích cỡ thiết bị của bạn. Trong tương lai chúng tôi sẽ khắc phục điều này" />
                )}
            </div>
        </ThemeProvider>
    );
}

export default App;
