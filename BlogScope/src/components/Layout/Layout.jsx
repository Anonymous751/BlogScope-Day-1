import { Outlet } from "react-router-dom";
import Header from "../Header/Header";


const Layout = ({ isDark, toggleTheme }) => {
  return (
    <>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <Outlet /> {/* All routed pages render here */}
      </main>

    </>
  );
};

export default Layout;
