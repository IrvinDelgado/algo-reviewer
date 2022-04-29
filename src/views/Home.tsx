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
  useEffect(()=>{setOrder([2, 3, 1, 6, 5, 10, 7, 9, 4, 8])},[])
  const NUM_ARR:number[] = [];
  const [order, setOrder] = useState(NUM_ARR);
  const left = useRef(0);
  const right = useRef(1);
  const lastIdx = useRef(10); 

  const animationFunctions = (idx:number) => {
    switch (true) {
      case idx >= lastIdx.current:
        return {
          height:order[idx]*35,
          backgroundColor: 'grey',
          scale: 1,
        }
      case left.current===idx:
      case right.current===idx:
        return {
          height:order[idx]*35,
          backgroundColor: '#46e891',
          scale: 1.1,
        }
      default:
        return {
          height:order[idx]*35,
          backgroundColor: '#F4F2F3',
          scale: 1,
        }
    }
  }

  const [springs, api] = useSprings(order.length, (idx) => animationFunctions(idx));


  // DEBUG: Swap Animation
  // WORKS: When we do a hot reload, rerender first works flawlessly
  // NOTES: First lets find out where the swap should happen
  const swap = (arr: number[], leftIdx:number, rightIdx:number) => {
    const newArr = [...arr];
    console.log(newArr)
    if(newArr[leftIdx]>newArr[rightIdx])
      [newArr[leftIdx], newArr[rightIdx]] = [newArr[rightIdx], newArr[leftIdx]];
    return newArr
  }

  const swapArr = () => {
    setOrder((prevState)=>swap(prevState,left.current,right.current));
    if(right.current===lastIdx.current-1) {
      left.current = 0;
      right.current = 1; 
      lastIdx.current--;
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