import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { BrowserRouter, HashRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client/react"
import { apolloClient } from "./lib/graphql/apollo.ts"

const isFileProtocol = window.location.protocol === "file:"
const Router = isFileProtocol ? HashRouter : BrowserRouter

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </StrictMode>
)
