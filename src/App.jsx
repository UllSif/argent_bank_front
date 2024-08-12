import Router from "./Router";
import {createRoot} from "react-dom/client";

import "./style.scss"

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<Router />)
