import { useEffect, useRef, useState } from 'react';
import { useSprings, animated } from 'react-spring';
import '../styles/main.css'



const Home = () => {
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
  const NUM_ARR = [2, 3, 1, 6, 5, 10, 7, 9, 4, 8];
  const [order, setOrder] = useState(NUM_ARR);
  const left = useRef(0);
  const right = useRef(1);

  const animationFunctions = (idx:number) => {
    switch (idx) {
      case left.current:
      case right.current:
        return {
          backgroundColor: '#46e891',
        }
      default:
        return {
          backgroundColor: '#F4F2F3',
        }
    }
  }

  const [springs, api] = useSprings(order.length, (idx) => animationFunctions(idx));

  const swap = (arr: number[], leftIdx:number, rightIdx:number) => {
    const newArr = [...arr];
    if(newArr[leftIdx]>newArr[rightIdx])
      [newArr[leftIdx], newArr[rightIdx]] = [newArr[rightIdx], newArr[leftIdx]];
    return newArr
  }

  const swapArr = () => {
    setOrder((prevState)=>swap(prevState,left.current,right.current));
    if(right.current===order.length-1) {
      left.current = 0;
      right.current = 1; 
      return
    }
    left.current++;
    right.current++;
  };
  
  useEffect(()=>{
    api.start(index=>(animationFunctions(index)));
  })
  
  return (
    <div>
      <div className='algoName'>{algoName}</div>
      
      <button onClick={swapArr}>SWAP</button>
      <div className='algoViz'>
        {springs.map((animation,indx) => (
          <animated.div key={indx} className="bar" style={{
            ...animation, 
            height:order[indx]*35,
            y:0,
          }}/>
        ))}
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