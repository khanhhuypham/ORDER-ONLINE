import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import store from "./store";
// Perfect Scrollbar
import "./index.css";



// Tailwind css
import App from "./App";
// import ReusableToast from "./components/custom/custom-toast";

import { LoadingProvider } from "./state/loading-context";
import "./tailwind.css";



const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);



root.render(
    <LoadingProvider>
        <Suspense>
            <Provider store={store}>
                <App />
            </Provider>
        </Suspense>
    </LoadingProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
