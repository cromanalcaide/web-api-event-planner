import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/home";
import injectContext from "./store/appContext";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ContactForm } from "./pages/contactForm";
import { About } from "./pages/about";
import { Private } from "./pages/private";
import { TermsAndConditions } from "./pages/termsandconditions";
import { CookiePolicy } from "./pages/cookiepolicy";
import { Profile } from "./component/profile";



const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<ContactForm />} path="/contact" />
                        <Route element={<About />} path="/about" />
                        <Route element={<Private />} path="/private"/>
                        <Route element={<TermsAndConditions />} path="/termsandconditions"/>
                        <Route element={<CookiePolicy />} path="/cookies-policy"/>
                        <Route element={<Profile />} path="/profile"/>
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
