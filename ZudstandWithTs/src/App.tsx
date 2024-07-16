import {useCounterStore} from './store/store'
function App() {
  const count = useCounterStore((state)=>state.count)
  const increment = useCounterStore((state)=>state.increment)
  const decrement = useCounterStore((state)=>state.decrement)
  const rest = useCounterStore((state)=>state.rest)
  return (
    <>
      <div className="w-full min-h-dvh bg-black flex justify-center items-center">
      <button className='bg-white  size-9' onClick={decrement}>-</button>
      <p className='text-white text-5xl'>{count}</p>
        <button className='bg-white  size-9' onClick={increment}>+</button>
        <button className='w-32 bg-white' onClick={rest} >reset</button>
      </div>
    </>
  );
}

export default App;
