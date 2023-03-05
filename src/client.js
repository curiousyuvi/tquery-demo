import App from "./App";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";
import {
  Hydrate,
  TQueryClient,
  TQueryClientProvider,
} from "@curiousyuvi/tquery-actions";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const dehydratedState = window.__REACT_QUERY_STATE__;
const queryClient = new TQueryClient();

hydrate(
  <TQueryClientProvider client={queryClient}>
    <Hydrate state={dehydratedState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </Hydrate>
  </TQueryClientProvider>,
  document.getElementById("root")
);

if (module.hot) {
  module.hot.accept();
}
