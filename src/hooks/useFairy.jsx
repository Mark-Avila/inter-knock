import { useContext } from "react";
import { FairyContext } from "../context/FairyContext";

function useFairy() {
    return useContext(FairyContext);
}

export default useFairy;