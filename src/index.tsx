import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import './style/reset.css';
import ReactDOM from 'react-dom/client';
import CustomNavbar from './components/custom-navbar';
import CustomFooter from './components/custom-footer';
import Content from './components/content';

const App = () => {
    return (
        <div>
            <CustomNavbar />
            <Content />
            <CustomFooter />
        </div>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(<App />);
