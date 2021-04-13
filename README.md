# useSwipe

React Custom Hook useSwipe

## Install

```bash
yarn add @odnh/use-swipe
# or
npm install @odnh/use-swipe
```

## Use
```tsx
  useSwipe(target: Target, options: Options) => SwipeState;
```

### parameters
|Name|Type|Description|
|-----|-----------|---------------|
|target|`HTMLElement` or `React.MutableRefObject<HTMLElement>`|target element|
|option|`Object`|[Options](https://github.com/d0hyeon/useSwipe/blob/master/README.md#options)|

#### options 
|Name|type|Description|
|-----|--------|---------------------------|
|scope|`{y: [number, number?], x: [number, number?]}`|Allowable touch range|
|fps|`number`|-|
|ignoreElement|`string` or `HTMLElement`|Elements to exclude touch|


---
### returns

|Name|Type|Description|
|-----|-----------|---------------|
|swipeState|`Object`| position `x`, `y` and state (`done` or `move`)|

<br/> 

## Example

[live demo](https://k5yub.csb.app/)

```jsx
import React from 'react';
import useSwipe from '@odnh/use-swipe';

const DEFAULT_STYLE = {
  width: '100px',
  height: '100px',
  border: '1px solid #ddd',
  transform: 'translate(0, 0)',
  transition: 'transform 300ms'
};
const App = () => {
  const elementRef = React.useRef(null);
  const {x, y, state} = useSwipe(elementRef);
  
  const swipeStyle = React.useMemo(() => {
    if(state === 'done') {
      return DEFAULT_STYLE;
    } else {
      return {
        ...DEFAULT_STYLE,
        transform: `translate(${x}px, ${y}px)`,
        transition: 'transform 100ms'
      }
    }
  }, [state, x, y]);
  
  return (
    <div ref={elementRef} style={{width: '100vw', height: '100vh'}}>
      <div
        style={swipeStyle}
      >
        swipe
      </div>
    </div>
  )
}

```

