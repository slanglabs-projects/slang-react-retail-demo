import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// The below function is taken from https://stackoverflow.com/a/61602724
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
