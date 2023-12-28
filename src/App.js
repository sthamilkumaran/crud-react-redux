import './App.css';
import Navbar from './components/Navbar';
import AddTask from './components/AddTask';
import Container from './../node_modules/react-bootstrap/esm/Container';
import { Row,Col } from "react-bootstrap";
import TasksLists from './components/TasksLists';


function App() {
  return (
    <Container>
      <Navbar />
      <Row className="justify-content-md-center">
        <Col xs lg="6">
          <AddTask />
          <TasksLists />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
