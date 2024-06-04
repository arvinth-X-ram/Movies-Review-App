import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import TextControlsExample from'./components/Login';
import MovieList from './components/Movies';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TextControlsExample />} />
        <Route
          path="/MovieList"
          element={
            <PrivateRoute>
              <MovieList />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
    // <TextControlsExample></TextControlsExample>
  );
}

export default App;