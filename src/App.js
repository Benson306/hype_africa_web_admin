import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';

function App() {
  return (
    <div className="App">
      <Router>

        <AdminSidebar />
      </Router>
    </div>
  );
}

export default App;
