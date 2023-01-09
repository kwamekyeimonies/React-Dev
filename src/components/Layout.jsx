import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = ({ search, setSearch }) => {
    return (
        <div className="App">
            <Header title="React JS Blog" />
            <Navbar search={search} setSearch={setSearch} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout