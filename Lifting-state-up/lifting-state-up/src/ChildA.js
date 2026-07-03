const ChildA = (handleCount) => {
    return (
        <>
        <div>hello child</div>
        <button onClick={handleCount()}>+</button>
        </>
    )
}

export default ChildA