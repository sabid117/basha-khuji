import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import ListingDetails from "../pages/ListingDetails/ListingDetails.jsx";
import ListingPage from "../pages/ListingPage/ListingPage.jsx";
import Chat from "../pages/Chat/Chat.jsx";
import Error from "../pages/Error/Error.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import SignIn from "../pages/SignIn/SignIn.jsx";
import Navbar from "../components/Navbar.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/listings/:id",
    element: (
      <>
        <Navbar />
        <ListingDetails />
      </>
    ),
  },
  {
    path: "/listings",
    element: (
      <>
        <Navbar />
        <ListingPage />
      </>
    ),
  },
  {
    path: "/chat",
    element: (
      <>
        <Navbar />
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <>
        <Navbar />
        <SignUp />
      </>
    ),
  },
  {
    path: "/signin",
    element: (
      <>
        <Navbar />
        <SignIn />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <Navbar />
        <Error />
      </>
    ),
  },
]);

export default router;
