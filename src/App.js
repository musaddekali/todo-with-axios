import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';
import Todo from './comps';

const App = () => {
  return (
    <>
      <h2 className="text-center text-secondary">Add Clients</h2>
      <Todo />
    </>
  )
}

export default App;