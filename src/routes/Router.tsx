import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/Main";
import Layout from "../components/common/Layout";
import NewsList from "../pages/NewsList";
import NewsDetail from "../pages/NewsDetail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/news/:locationId",
        element: <NewsList />,
      },
      {
        path: "/news-detail/:newsId",
        element: <NewsDetail />,
      },
    ],
  },
]);

export default router;
