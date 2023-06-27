import Footer from "@/src/components/Layout/Footer/Footer";
import Header from "@/src/components/Layout/Header/Header";
import {FC, ReactNode} from "react";


const Layout:FC<{children:ReactNode}> = ({children}) => {
    return (
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>
    );
};

export default Layout;