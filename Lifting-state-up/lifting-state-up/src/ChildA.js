const ChildA = ({setCount, count}) => {
    return (
        <>
        <div>hello child</div>
        <button onClick={()=>setCount(prev=> prev+1)}>+</button>
        </>
    )
}

export default ChildA