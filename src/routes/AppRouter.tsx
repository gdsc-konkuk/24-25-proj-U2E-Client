import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../pages/mainPage/MainPage";
import NewsListPage from "../pages/newsListPage/NewsListPage";
import NewsDetailPage from "../pages/newsDetailPage/NewsDetailPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/news/:locationId" element={<NewsListPage />} />
        <Route path="/news-detail/:newsId" element={<NewsDetailPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
