# 📚 React Doubts & Common Mistakes Journal

> This file contains every mistake and doubt I encounter while learning React. The goal is to understand **why** something works, not just **how** to fix it.

---

# ❓Q1. While lifting state up, why is this wrong?

```jsx
const ChildA = (setCount, count) => {
  // ...
};
```

when rendering:

```jsx
<ChildA setCount={setCount} count={count} />
```

## ✅ Answer

React components **always receive a single argument**, called the **props object**.

When React sees:

```jsx
<ChildA setCount={setCount} count={count} />
```

it internally behaves something like:

```jsx
ChildA({
  setCount: setCount,
  count: count,
});
```

Notice that **only one object** is passed.

Because my component expected **two parameters**, JavaScript interpreted it like this:

```js
setCount = {
  setCount: fn,
  count: 0,
};

count = undefined;
```

So this fails:

```jsx
setCount(count + 1);
```

because `setCount` is actually the **entire props object**, not the setter function.

## ✅ Correct Way

Using destructuring:

```jsx
const ChildA = ({ setCount, count }) => {
  // ...
};
```

or

```jsx
const ChildA = (props) => {
  // ...
};
```

## 📝 Key Takeaway

> **React components always receive one argument (`props`), never multiple arguments.**

---

# ❓Q2. If I'm passing `count` and `setCount` separately, why does React combine them into one object?

## ✅ Answer

JSX is **not JavaScript**.

It is converted into JavaScript before execution.

When we write:

```jsx
<ChildA
  setCount={setCount}
  count={count}
/>
```

React compiles it into something similar to:

```jsx
React.createElement(ChildA, {
  setCount: setCount,
  count: count,
});
```

Later React calls:

```jsx
ChildA({
  setCount,
  count,
});
```

Every prop becomes a property inside **one object**.

That's why components always receive a single `props` object.

## 📝 Key Takeaway

> **No matter how many props you pass, React groups them into one object before calling your component.**

---

# ❓Q3. Why does destructuring work?

## ✅ Answer

Destructuring is a **JavaScript feature**, not a React feature.

When I write:

```jsx
const ChildA = ({ setCount, count }) => {
```

I'm telling JavaScript:

> "Take the object React passes and immediately extract `setCount` and `count`."

It is exactly the same as writing:

```jsx
const ChildA = (props) => {
  const setCount = props.setCount;
  const count = props.count;
};
```

## 📊 Visualization

```text
Parent

<ChildA
    setCount={setCount}
    count={count}
/>

        │
        ▼

React collects all props

{
    setCount: fn,
    count: 0
}

        │
        ▼

React calls

ChildA(props)

        │
        ▼

Option 1

const ChildA = (props) => {}

props.setCount
props.count

---------------------------

Option 2

const ChildA = ({ setCount, count }) => {}

setCount
count
```

## 📝 Key Takeaway

> **Destructuring simply extracts values from the `props` object into individual variables.**

---

# ❓Q4. What is the logic behind `setCount(prev => prev + 1)`?

## ✅ Answer

React's state setter can accept **either**:

### Option 1 — A value

```jsx
setCount(count + 1);
```

Example:

```js
count = 5;
```

React receives:

```jsx
setCount(6);
```

React stores:

```js
count = 6;
```

---

### Option 2 — A function

```jsx
setCount(prev => prev + 1);
```

Instead of passing a value, we're passing a function.

```js
(prev) => prev + 1
```

Later, React executes it using the latest state.

Conceptually:

```jsx
const latestState = 5;

const newState = (prev => prev + 1)(latestState);
```

which becomes:

```js
const newState = 6;
```

React stores:

```js
count = 6;
```

---

# ❓Q5. Where does `prev` come from?

## ✅ Answer

React provides it.

You never define `prev`.

When you write:

```jsx
setCount(prev => prev + 1);
```

React later executes something conceptually like:

```jsx
const latestState = count;

const newState = yourFunction(latestState);
```

which becomes:

```jsx
(prev => prev + 1)(latestState);
```

So:

```text
prev = latestState
```

React automatically passes the latest state into your callback.

## 📝 Key Takeaway

> **`prev` is supplied by React. You only provide the callback function.**

---

# ❓Q6. Why not simply use `setCount(count + 1)`?

## ✅ Answer

It works in many situations.

Example:

```jsx
<button onClick={() => setCount(count + 1)}>
```

However, problems occur when multiple state updates happen before React finishes updating the component.

Example:

```jsx
const increment = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
};
```

Current state:

```text
count = 0
```

All three updates calculate:

```text
0 + 1
```

React receives:

```jsx
setCount(1);
setCount(1);
setCount(1);
```

Final result:

```text
count = 1
```

instead of

```text
count = 3
```

because every update used the same stale value.

---

Using functional updates:

```jsx
const increment = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

Execution:

```text
Initial State

count = 0

↓

prev = 0 → return 1

count = 1

↓

prev = 1 → return 2

count = 2

↓

prev = 2 → return 3

count = 3
```

Every callback receives the latest state.

## 📝 Key Takeaway

> **Whenever the next state depends on the previous state, always prefer the functional update syntax.**

---

# 🎯 Interview Summary

### Why do React components receive only one argument?

Because React collects every prop into a single `props` object before calling the component.

---

### Why do we destructure props?

To extract individual properties from the `props` object, making the code cleaner and easier to read.

---

### Why use `setCount(prev => prev + 1)`?

Because it always receives the latest state, preventing stale state issues during batched or multiple updates.

---


================================================================================================================================================================

# CONTEXT API 

