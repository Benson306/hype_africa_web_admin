import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import ViewContentACApplications from './components/pages/ViewContentACApplications';
import ViewInfluencerACApplications from './components/pages/ViewInfluencerACApplications';

function App() {
  return (
    <div className="App">
      <Router>

        <div className="flex">
          <Routes>
              <Route path="/view_content_applications" element={
                <>
                <AdminSidebar />
                <ViewContentACApplications />
                </>
              }
              ></Route>

              <Route path="/view_influencer_applications" element={
                              <>
                              <AdminSidebar />
                              <ViewInfluencerACApplications />
                              </>
                            }
              ></Route>
          </Routes>

        </div>
      </Router>
    </div>
  );
}

export default App;
