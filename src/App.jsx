import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Template from "./template/Template";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import DetailMoviePage from "./pages/DetailMoviePage/DetailMoviePage";
import AdminPage from "./pages/AdminPage/AdminPage";
import UserInfoPage from "./pages/UserInfoPage/UserInfoPage";
import AdminUsersPage from "./pages/AdminPage/AdminUserPage/AdminUsersPage";
import AdminAddUserPage from "./pages/AdminPage/AdminUserPage/AdminAddUserPage";
import AdminMoviesPage from "./pages/AdminPage/AdminMoviesPage/AdminMoviesPage";
import AdminAddMoviePage from "./pages/AdminPage/AdminMoviesPage/AdminAddMoviePage";
import DetailMovieTheaterPage from "./pages/DetailMovieTheaterPage/DetailMovieTheaterPage";
import { Toaster } from "react-hot-toast";
import TestPage from "./pages/TestPage";
import LoadingPage from "./pages/LoadingPage/LoadingPage";

function App() {
  return (
    <div>
      <LoadingPage />
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* trang chủ */}
          <Route path="/" element={<Template content={<HomePage />} />} />
          {/* trang đăng nhập */}
          <Route path="/login" element={<Template content={<LoginPage />} />} />
          {/* trang đăng ký */}
          <Route
            path="/sign-up"
            element={<Template content={<SignUpPage />} />}
          />
          {/* trang chi tiết phim */}
          <Route
            path="/detail-movie/:idMovie"
            element={<Template content={<DetailMoviePage />} />}
          />
          {/* trang chi tiết phòng phim */}
          <Route
            path="/detail-box-movie/:maLichChieu"
            element={<Template content={<DetailMovieTheaterPage />} />}
          />
          {/* trang admin */}
          <Route path="/admin" element={<Template content={<AdminPage />} />} />
          {/* trang admin users */}
          <Route
            path="/admin/users"
            element={<TestPage content={<AdminUsersPage />} />}
          />
          {/* trang admin thêm user */}
          <Route
            path="/admin/users/add-user"
            element={<TestPage content={<AdminAddUserPage />} />}
          />
          {/* trang admin movies */}
          <Route
            path="/admin/movies"
            element={<TestPage content={<AdminMoviesPage />} />}
          />
          {/* trang admin thêm movie */}
          <Route
            path="/admin/movies/add-movie"
            element={<TestPage content={<AdminAddMoviePage />} />}
          />
          {/* trang user info */}
          <Route
            path="/user-info"
            element={<Template content={<UserInfoPage />} />}
          />
          {/* trang lỗi => khi user nhập sai đường dẫn */}
          <Route path="*" element={<NotFoundPage />} />
          {/* <Route path="/test" element={<TestPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
