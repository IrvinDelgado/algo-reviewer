import { useEffect, useRef, useState } from 'react';
import { useSprings, animated } from 'react-spring';
import { VizButtons } from '../../shared/VizButtons';
import { generateArray } from '../../utilities/helpers';

const SelectionSortViz = () => {
  const originalOrder = useRef([0]);
  const [order, setOrder] = useState([0]);
  const [currIdx, setCurrIdx] = useState(0);
  const currIdxRef = useRef(0)
  const minIdx = useRef(0);
  const lastOrderedArrayIdx = useRef(0);
  const sortingDone = useRef(false);
  const isPlaying = useRef(false);
  const isPaused = useRef(false);
  const interval = 500;

  useEffect(() => {
    originalOrder.current = generateArray(1,10);
    setOrder(originalOrder.current);
  },[])

  const animationFunctions = (idx:number) => {
    switch (true) {
      case sortingDone.current:
        return {
          backgroundColor: '#46E891',
          scale:1,
        }
      case idx<minIdx.current:
        return {
          backgroundColor: 'grey',
          scale:1,
        }
      case idx === currIdx:
        return {
          backgroundColor: '#FFD166',
          scale: 1.1
        }
      case idx === minIdx.current:
        return {
          backgroundColor: '#46E891',
          scale: 1,
        }
      default:
        return {
          backgroundColor: '#F4F2F3',
          scale: 1,
        }
    }
  }

  const [springs, api] = useSprings(order.length, (idx)=>animationFunctions(idx))
  

  // Lets use this useEffect to work with selection step
  useEffect(()=>{
    api.start(idx => animationFunctions(idx));
  })

  const arrElementSwap = (arr: number[], idxOne:number, idxTwo:number) => {
    const newArr = [...arr];
    [newArr[idxOne], newArr[idxTwo]] = [newArr[idxTwo], newArr[idxOne]];
    return newArr
  }

  const selectionStepStep = () => {
    // End of Array
    if(currIdxRef.current === order.length-1) { 
      if (currIdxRef.current===lastOrderedArrayIdx.current) {
        sortingDone.current=true
      }
      lastOrderedArrayIdx.current++;
      minIdx.current++; 
      setCurrIdx(lastOrderedArrayIdx.current);
      currIdxRef.current = lastOrderedArrayIdx.current;
    } else {
      currIdxRef.current++;
      setCurrIdx((prevState)=>prevState+1);
    }
  };
  // Selection Swap
  if(order[minIdx.current] > order[currIdxRef.current]) {
    setOrder((prevState) => arrElementSwap(prevState, minIdx.current, currIdxRef.current));
  }

  const selectionSortPlay = () => {
    if(isPlaying.current===true) return
    const play = setInterval(()=>{
      if(sortingDone.current || isPaused.current){
        isPlaying.current = false;
        isPaused.current = false;
        clearInterval(play);
        return
      }
      isPlaying.current = true;
      selectionStepStep();
    }, interval);
  }

  const selectionSortPause = () => {
    isPaused.current = true;
  }

  const selectionStepReset = () => {
    lastOrderedArrayIdx.current = 0
    minIdx.current = 0;
    sortingDone.current = false;
    setOrder(originalOrder.current);
    setCurrIdx(0);
    currIdxRef.current = 0;
  };

  return (
    <div>
      <div className="algoViz">
        {springs.map((animation,indx) => (
          <animated.div key={indx} className="bar" style={{
            ...animation, 
            height:order[indx] * 35,
          }}/>
        ))}
      </div>
      <VizButtons step={selectionStepStep} play={selectionSortPlay} pause={selectionSortPause} reset={selectionStepReset}/>
    </div>
  )
}

export default SelectionSortViz;