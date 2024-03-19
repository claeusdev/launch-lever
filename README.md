## Launch-Lever
[![npm version](https://badge.fury.io/js/launch-lever.svg)](https://www.npmjs.com/package/launch-lever)
The easiest way to manage feature toggles in JS/TS applications.

### Features
- Currently only supports managing feature toggles using JSON
- Should be super fast 💨

### About

`launch-lever` is a simple library for managing your feature toggles. 

launch-lever is for you if you want:

- A simple locally managed feature toggle.
- Something so simple you don't need to know how to make network calls to use.
- Build your toggle JSON and push the launch button.

### Installation

To add `launch-lever` to your project:

```js
npm install launch-lever
```

```js
yarn add launch-lever
```

### Usage

launch-lever exports a class `LaunchLever` together with some types for `Toggle`.

```js
import { Toggle } from "launch-lever";

// export interface Toggle {
//   name: string;
//   description: string;
//   status: "on" | "off";
// }

export const flags: Toggle[] = [
    {
        name: "pfx_123",
        description: "A very simple test case",
        status: "on"
    },
    {
        name: "pfx_1255",
        description: "A very simple test case",
        status: "off"
    }
]
```

Pass your JSON to the constructor.

```ts
const { pfx_123, pfx_1255 } = new LaunchLever(flags).flags
```

Use your toggle names by simply checking if they're turned `on`

```ts
if(pfx_123 === "on") {
//show some button
}
```

### Contributing and Support

If you're interested in contributing or supporting. Just fork, open a PR.
