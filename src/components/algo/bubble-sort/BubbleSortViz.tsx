import { useEffect, useRef, useState } from 'react';
import { useSprings, animated } from 'react-spring';
import { VizButtons } from '../../shared/VizButtons';
import { generateArray } from '../../utilities/helpers';


const BubbleSortViz = () => {
  
  const originalOrder = useRef([0]);
  const [order, setOrder] = useState([0]);
  const left = useRef(0);
  const right = useRef(1);
  const lastIdx = useRef(10);
  const hasSwappedInLoop = useRef(false);
  const sortingDone = useRef(false);
  const isPlaying = useRef(false);
  const isPaused = useRef(false);
  const interval = 500;

  useEffect(() => {
    originalOrder.current = generateArray(1,10);
    setOrder(originalOrder.current);
  },[])

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

  useEffect(()=>{
    api.start(index=>(animationFunctions(index)));
  })

  const bubbleSwap = (arr: number[], leftIdx:number, rightIdx:number) => {
    const newArr = [...arr];
    if(newArr[leftIdx]>newArr[rightIdx]){
      [newArr[leftIdx], newArr[rightIdx]] = [newArr[rightIdx], newArr[leftIdx]];
      hasSwappedInLoop.current = true;
    }
    return newArr
  }

  const bubbleSortStep = () => {
    setOrder((prevState)=>bubbleSwap(prevState,left.current,right.current));
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
    setOrder(originalOrder.current);
  }

  return (
    <div>
      <div className='algoViz'>
        {springs.map((animation,indx) => (
          <animated.div key={indx} className="bar" style={{
            ...animation, 
            height:order[indx] * 35,
          }}/>
        ))}
      </div>
      <VizButtons step={bubbleSortStep} play={bubbleSortPlay} pause={bubbleSortPause} reset={bubbleSortReset}/>
    </div>
  )

}

export default BubbleSortViz;