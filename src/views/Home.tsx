import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import BubbleSort from "../components/algo/bubble-sort/BubbleSort";
import SelectionSort from "../components/algo/selection-sort/SelectionSort";

const Home = () => {
  return (
    <Router>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/bubble">Bubble</Link>
          </li>
          <li>
            <Link to="/selection">Selection</Link>
          </li>
        </ul>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/bubble" element={<BubbleSort/>}/>
          <Route path="/selection" element={<SelectionSort/>}/>
          <Route path="*" element={<BubbleSort/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default Home;
