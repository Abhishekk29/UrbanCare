// src/components/Layout.jsx
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* This will render the current page */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
