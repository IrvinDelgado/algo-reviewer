import { useEffect, useRef, useState } from 'react';
import { useSprings, animated } from 'react-spring';

import '../styles/main.css'

const Home = () => {
  const algoName = 'Bubble Sort';
  // Maybe use something like prism
  const algoCode = `
  def BubbleSort(elements):
    # Looping from size of array from last index[-1] to index [0]
    for n in range(len(elements)-1, 0, -1):
      for i in range(n):
        if elements[i] > elements[i + 1]:
          # swapping data if the element is less than next element in the array
          elements[i], elements[i + 1] = elements[i + 1], elements[i]
  `;
  useEffect(()=>setOrder([2, 3, 1, 6, 5, 10, 7, 9, 4, 8]),[])
  const NUM_ARR:number[] = [];
  const [order, setOrder] = useState(NUM_ARR);
  const left = useRef(0);
  const right = useRef(1);
  const lastIdx = useRef(10);
  const hasSwappedInLoop = useRef(false);
  const sortingDone = useRef(false);
  const isPlaying = useRef(false);
  const isPaused = useRef(false);
  const interval = 500;

  const animationFunctions = (idx:number) => {
    if(sortingDone.current) {
      return {
        backgroundColor: '#46E891',
        scale: 1,
      }
    }
    switch (true) {
      case idx >= lastIdx.current:
        return {
          backgroundColor: '#46E891',
          scale: 1,
        }
      case left.current===idx:
      case right.current===idx:
        return {
          backgroundColor: '#FFD166',
          scale: 1.1,
        }
      default:
        return {
          backgroundColor: '#F4F2F3',
          scale: 1,
        }
    }
  }

  const [springs, api] = useSprings(order.length, (idx) => animationFunctions(idx));

  const swap = (arr: number[], leftIdx:number, rightIdx:number) => {
    const newArr = [...arr];
    if(newArr[leftIdx]>newArr[rightIdx]){
      [newArr[leftIdx], newArr[rightIdx]] = [newArr[rightIdx], newArr[leftIdx]];
      hasSwappedInLoop.current = true;
    }
    return newArr
  }

  const bubbleSortStep = () => {
    setOrder((prevState)=>swap(prevState,left.current,right.current));
    if(right.current===lastIdx.current-1) {
      if(hasSwappedInLoop.current===false){sortingDone.current = true;}
      hasSwappedInLoop.current=false;
      left.current = 0;
      right.current = 1; 
      lastIdx.current--;
      return
    }
    left.current++;
    right.current++;
  };

  const bubbleSortPlay = () => {
    if(isPlaying.current===true) return
    const play = setInterval(()=>{
      if(sortingDone.current || isPaused.current){
        isPlaying.current = false;
        isPaused.current = false;
        clearInterval(play);
        return
      }
      isPlaying.current = true;
      bubbleSortStep();
    }, interval);
  }

  const bubbleSortPause = () => {
    isPaused.current = true;
  }

  const bubbleSortReset = () => {
    left.current = 0;
    right.current = 1;
    lastIdx.current = 10;
    sortingDone.current = false;
    hasSwappedInLoop.current = false;
    setOrder([2, 3, 1, 6, 5, 10, 7, 9, 4, 8]);
  }
  
  useEffect(()=>{
    api.start(index=>(animationFunctions(index)));
  })
  
  return (
    <div>
      <div className='algoName'>{algoName}</div>
      <div className='algoViz'>
        {springs.map((animation,indx) => (
          <animated.div key={indx} className="bar" style={{
            ...animation, 
            height:order[indx]*35,
          }}/>
        ))}
      </div>
      <div className="algoVizBtns">
          <button className='btn btn-step' onClick={bubbleSortStep}>Step</button>
          <button className='btn btn-play' onClick={bubbleSortPlay}>Play</button>
          <button className='btn btn-pause' onClick={bubbleSortPause}>Pause</button>
          <button className='btn' onClick={bubbleSortReset}>Reset</button>
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
