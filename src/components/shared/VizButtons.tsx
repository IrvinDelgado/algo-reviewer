import { MouseEventHandler } from "react";
import "../../styles/main.css";

interface IVizButtons {
  step: MouseEventHandler<HTMLButtonElement>;
  play: MouseEventHandler<HTMLButtonElement>;
  pause: MouseEventHandler<HTMLButtonElement>;
  reset: MouseEventHandler<HTMLButtonElement>;
}
export const VizButtons = (props:IVizButtons) => {
  return (
    <div className="algoVizBtns">
      <button className='btn btn-step' onClick={props.step}>Step</button>
      <button className='btn btn-play' onClick={props.play}>Play</button>
      <button className='btn btn-pause' onClick={props.pause}>Pause</button>
      <button className='btn' onClick={props.reset}>Reset</button>
    </div>
  )
}

