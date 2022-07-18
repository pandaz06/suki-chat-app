import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import { Modal } from './components';
import { ModalProvider, ThemeProvider, UserStatusProvider } from './contexts';

function App() {
    useEffect(() => {
        if (!localStorage.getItem('dark')) {
            localStorage.setItem('dark', JSON.stringify(false));
        }
        if (!localStorage.getItem('isLogin')) {
            localStorage.setItem('isLogin', JSON.stringify(false));
        }
    }, []);

    const [isLogin, setIsLogin] = useState(JSON.parse(localStorage.getItem('isLogin')));
    const [dark, setDark] = useState(JSON.parse(localStorage.getItem('dark')));

    const [isShowModal, setIsShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState(null);

    useEffect(() => {
        localStorage.setItem('dark', JSON.stringify(dark));
    }, [dark]);

    useEffect(() => {
        localStorage.setItem('isLogin', JSON.stringify(isLogin));
    }, [isLogin]);

    return (
        <ThemeProvider value={{ dark, setDark }}>
            <div className={`app ${dark ? 'dark' : ''}`}>
                <BrowserRouter>
                    <UserStatusProvider value={{ isLogin, setIsLogin }}>
                        <ModalProvider
                            value={{
                                isShowModal,
                                setIsShowModal,
                                modalTitle,
                                setModalTitle,
                                modalContent,
                                setModalContent,
                            }}
                        >
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
                                        >
                                            {route.children &&
                                                route.children.map((item, index) => {
                                                    const Comp = item.component;
                                                    return (
                                                        <Route
                                                            key={index}
                                                            path={item.path}
                                                            element={<Comp {...item.props} />}
                                                        />
                                                    );
                                                })}
                                        </Route>
                                    );
                                })}
                            </Routes>
                            {isShowModal && <Modal title={modalTitle} content={modalContent} />}
                        </ModalProvider>
                    </UserStatusProvider>
                </BrowserRouter>
            </div>
        </ThemeProvider>
    );
}

export default App;
