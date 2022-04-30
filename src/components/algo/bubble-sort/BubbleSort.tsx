import BubbleSortViz from "./BubbleSortViz";
import "../../../styles/main.css";

const BubbleSort = () => {
  const algoName = 'Bubble Sort';
  const algoCode = `
  def BubbleSort(elements):
    # Looping from size of array from last index[-1] to index [0]
    for n in range(len(elements)-1, 0, -1):
      for i in range(n):
        if elements[i] > elements[i + 1]:
          # swapping data if the element is less than next element in the array
          elements[i], elements[i + 1] = elements[i + 1], elements[i]`;
  
  return (
    <div>
      <div className='algoName'>{algoName}</div>
      <BubbleSortViz/>
      <div className='algoCode'>
        <pre>
          {algoCode}
        </pre>
      </div>
    </div>
  )
}

export default BubbleSort;