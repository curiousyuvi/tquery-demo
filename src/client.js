import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";
import {
  Hydrate,
  TQueryClient,
  TQueryClientProvider,
} from "@curiousyuvi/tquery-actions";

const dehydratedState = window.__REACT_QUERY_STATE__;
const queryClient = new TQueryClient();

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/lib/index.prod.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    })
  )
);

hydrate(
  <TQueryClientProvider client={queryClient}>
    <Hydrate state={dehydratedState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <React.Suspense fallback={null}>
        <ReactQueryDevtoolsProduction />
      </React.Suspense>
    </Hydrate>
  </TQueryClientProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
