# useSwipe

React Custom Hook useSwipe

## using

```tsx
  useSwipe(target: Target, options: Options) => SwipeState;
```

|Name|Type|Description|
|-----|-----------|---------------|
|target|`HTMLElement` or `React.MutableRefObject<HTMLElement>`|swipe element|
|option|`Object`|[Options](https://github.com/d0hyeon/useSwipe/blob/master/src/type.ts#L7)|
|swipeState|`Object`| position `x`, `y` and state (`done` or `move`)|

<br/> 

**Example**
```jsx
import useSwipe from '@odnh/useSwipe';

const App = () => {
  const elementRef = React.useRef(null);
  const {x, y} = useSwipe(elementRef);
  
  return (
    <div ref={elementRef} />
  )
}
```

