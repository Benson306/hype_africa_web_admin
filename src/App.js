import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import ViewContentACApplications from './components/pages/ViewContentACApplications';
import ViewInfluencerACApplications from './components/pages/ViewInfluencerACApplications';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Dashboard from './components/pages/Dashboard';
import { useContext } from 'react';
import { AdminAuthContext } from './utils/AdminAuthContext';

function App() {

  const { adminId } = useContext(AdminAuthContext);
  return (
    <div className="App">
      <Router>

        <div className="flex">
          
          
          {
            adminId == null ?
            <Routes>

                <Route path="/login" 
                element={
                    <>
                    <Login />
                    </>
                  }
                ></Route>

                <Route path="/*" 
                element={
                    <>
                    <Login />
                    </>
                  }
                ></Route>

            </Routes>
                :
            <Routes>
              <Route path="/add_user" 
                element={
                  <>
                  <SignUp />
                  </>
                }
              ></Route>


              <Route path="/dashboard" 
                element={
                  <>
                  <AdminSidebar />
                  <Dashboard />
                  </>
                }
              ></Route>

              <Route path="/view_content_applications" 
                element={
                  <>
                  <AdminSidebar />
                  <ViewContentACApplications />
                  </>
                }
              ></Route>

              <Route path="/view_influencer_applications" 
                element={
                    <>
                    <AdminSidebar />
                    <ViewInfluencerACApplications />
                    </>
                  }
              ></Route>

              <Route path="/*" 
                element={
                  <>
                  <AdminSidebar />
                  <Dashboard />
                  </>
                }
              ></Route>


              
          </Routes>

          }

        </div>
      </Router>
    </div>
  );
}

export default App;
