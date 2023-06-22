import '@/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PublicRouter from '@/pages/Public/PublicRouter';
import AdminRouter from '@/pages/Admin/AdminRouter';
import UserRouter from '@/pages/User/UserRouter';
import AuthRouter from '@/pages/Auth/AuthRouter';
import AuthGuard from '@/_helpers/AuthGuard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter />} />
          <Route path="/admin/*" element={
            <AuthGuard>
              <AdminRouter />
            </AuthGuard>
          } />
          <Route path="/user/*" element={
            <AuthGuard>
              <UserRouter />
            </AuthGuard>} />
          <Route path="/auth/*" element={<AuthRouter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
