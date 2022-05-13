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
      <div className="page">
        <div className="nav">
          <Link className="navItem" to="/bubble">Bubble</Link>      
          <Link className="navItem" to="/selection">Selection</Link>  
        </div>
        <div className="content">
          <Routes>
            <Route path="/bubble" element={<BubbleSort/>}/>
            <Route path="/selection" element={<SelectionSort/>}/>
            <Route path="*" element={<BubbleSort/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default Home;
