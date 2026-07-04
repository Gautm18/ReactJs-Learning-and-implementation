<Lifting State Up>

--> Lifting state up is a React pattern where you move the state from a child component to the closest common parent so that multiple child components can share and update the same data.


<when you should lift the state up>

---> Lift state up when:

a) Two or more sibling components need the same data.
b) One component updates data that another component displays.
c) You want a single source of truth for shared state.
d) Multiple components need to stay synchronized.


*Interview Definition*

Lifting state up is the process of moving state from a child component to the nearest common parent so that multiple child components can access and update the same state. The parent owns the state and passes it down as props, while children communicate changes back through callback functions. This creates a single source of truth and keeps related UI in sync.


