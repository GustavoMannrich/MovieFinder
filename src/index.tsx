import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './styles/main.css';
import ReactDOM from 'react-dom/client';
import CustomNavbar from './components/common/custom-navbar';
import CustomFooter from './components/common/custom-footer';
import Content from './components/search/search-page';
import MoviePage from './components/movie/movie-page';
import { Provider } from 'react-redux';
import { store } from './state';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="MovieFinder">
                    <Route
                        path=":ordemParam/:generoParam/:pessoaParam/:dtiniParam/:dtfimParam"
                        element={
                            <Provider store={store}>
                                <CustomNavbar />
                                <Content />
                                <CustomFooter />
                            </Provider>
                        }
                    ></Route>
                    <Route
                        index
                        element={
                            <Provider store={store}>
                                <CustomNavbar />
                                <Content />
                                <CustomFooter />
                            </Provider>
                        }
                    ></Route>
                    <Route
                        path="movie/:movieID"
                        element={
                            <>
                                <CustomNavbar />
                                <MoviePage />
                                <CustomFooter />
                            </>
                        }
                    ></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<App />);
