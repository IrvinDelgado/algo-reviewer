import { useEffect, useRef, useState } from 'react';
import { useSprings, animated } from 'react-spring';
import { VizButtons } from '../../shared/VizButtons';
import { generateArray } from '../../utilities/helpers';

const SelectionSortViz = () => {
  const originalOrder = useRef([0]);
  const [order, setOrder] = useState([0]);

  useEffect(() => {
    originalOrder.current = generateArray(1,10);
    setOrder(originalOrder.current);
  },[])

  const animationFunctions = () => {
   return {
     backgroundColor: '#F4F2F3',
     scale: 1,
   } 
  }

  const [springs, api] = useSprings(order.length, animationFunctions)
  
  useEffect(()=>{
    api.start(animationFunctions);
  })

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
      <VizButtons step={()=>{}} play={()=>{}} pause={()=>{}} reset={()=>{}}/>
    </div>
  )
}

export default SelectionSortViz;