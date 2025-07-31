import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ isDark, toggleTheme }) => {
  return (
    <>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Outlet /> {/* All routed pages render here */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
