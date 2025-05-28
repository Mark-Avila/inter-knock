import { useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";

function useNav() {
    return useContext(LayoutContext);
}

export default useNav;