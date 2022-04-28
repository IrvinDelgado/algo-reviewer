import { useRef, useState } from 'react';
import { useSprings, animated } from 'react-spring';
import '../styles/main.css'


const algoName = 'Bubble Sort';
const algoCode = 
`
def BubbleSort(elements):
  # Looping from size of array from last index[-1] to index [0]
  for n in range(len(elements)-1, 0, -1):
    for i in range(n):
      if elements[i] > elements[i + 1]:
        # swapping data if the element is less than next element in the array
        elements[i], elements[i + 1] = elements[i + 1], elements[i]
`;
const numArray = [2, 3, 1, 6, 5, 10, 7, 9, 4, 8];
const Home = () => {
  const [arr, setArr] = useState(numArray);
  const idxSmall = useRef(0);
  const swapArr = () => {
    setArr((prevArr) => {
      const newArr = [...prevArr];
      [newArr[0],newArr[1]]=[newArr[1],newArr[0]];
      return newArr;
    });
  };
  const springs = useSprings(
    arr.length, 
    arr.map((item,idx) => ({
      to: {
        height: (item*35),
        background: idx===idxSmall.current ?'red':'#F4F2F3',
      },
    }))
  );
  
  return (
    <div>
      <div className='algoName'>{algoName}</div>
      <button onClick={swapArr}>SWAP</button>
      <div className='algoViz'>
        {springs.map((animation,indx) => (
          <animated.div key={indx} style={animation} className="bar" />
          )
        )}
      </div>
      <div className='algoCode'>
        <pre>
          {algoCode}
        </pre>
      </div>
    </div>
  )
}

export default Home;