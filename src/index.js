import { Machine, interpret } from "xstate";
import { inspect } from "@xstate/inspect";
import "./styles.css";

inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});

document.getElementById("app").innerHTML = `
<section>
  <h1>XState Viz Example</h1>
  <p>
    Open the <strong>Console</strong> to view the machine output.
  </p>
  <p>See the <a href="https://xstate.js.org/docs/packages/xstate-inspect/">XState Inspect documentation</a> for more details.</p>
</section>
`;

// Edit your machine(s) here
const machine = Machine({
  id: "machine",
  initial: "inactive",
  states: {
    inactive: {
      on: { TOGGLE: "active" }
    },
    active: {
      on: { TOGGLE: "inactive" }
    }
  }
});

// Edit your service(s) here
const service = interpret(machine, { devTools: true }).onTransition((state) => {
  console.log(state.value);
});

service.start();

service.send("TOGGLE");
