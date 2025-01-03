import "./styles/index.css";
import {Route, Routes} from "react-router";
import NewsPage from "./pages/NewsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import EditPage from "./pages/EditPage";
import NewsAddPage from "./pages/NewsAddPage";
import AuthProvider from "./hoc/AuthProvider";
import RequireAuth from "./hoc/RequireAuth";

export default function App() {

  return (
    <>
        <AuthProvider>
        <Routes>
        <Route path="/" element={<HomePage/>} />
            <Route path="news/add" element={
                <RequireAuth>
                    <NewsAddPage/>
                </RequireAuth>} />
              <Route path="news/:id" element={<NewsPage/>} />
            <Route path="news/:id/edit" element={
                    <EditPage/>
            } />
            <Route path='login' element={<LoginPage/>} />

      </Routes>
    </AuthProvider>
    </>
  );
}
