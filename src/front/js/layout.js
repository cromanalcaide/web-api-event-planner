import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import injectContext from "./store/appContext";
import { Home } from "./pages/home";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ContactForm } from "./pages/contactForm";
import { About } from "./pages/about";
import { Private } from "./pages/private";
import { TermsAndConditions } from "./pages/termsandconditions";
import { CookiePolicy } from "./pages/cookiepolicy";
import { LeftSideBar } from "./component/sidebarleft";
import { Events } from "./pages/events";
import { Singleevent } from "./pages/singleevent";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Events />} path="/events" />
                        <Route element={<Singleevent />} path="/singleevent/:theid" />
                        <Route element={<ContactForm />} path="/contact" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Private />} path="/private"/>
                        <Route element={<TermsAndConditions />} path="/termsandconditions"/>
                        <Route element={<CookiePolicy />} path="/cookies-policy"/>
                        <Route element={<LeftSideBar />} path="/sidebar1"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
