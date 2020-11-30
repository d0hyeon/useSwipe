import * as React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import useSwipe from '../useSwipe';
import { getIsMobile } from '../utils';
import { UseSwipeOption } from '../type';

interface Props {
  options?: UseSwipeOption
}

const MockComponent: React.FC<Props> = ({options}) => {
  const swiped = useSwipe(mockElement, options);

  return (
    <div>
      {Object.keys(swiped).map(key => (
        <dl key={key}>
          <dt>{key}</dt>
          <dd className={key}>
            {swiped[key]}
          </dd>
        </dl>
      ))}
    </div>
  )
}

const mockElement = document.createElement('div');
mockElement.style.cssText = 'width: 500px; height: 500px;';

describe("useSwipe 기본 테스트", () => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: 'window',
    writable: true
  });

  test('PC환경에서 실행된다.', () => {
    expect(getIsMobile()).toBeFalsy();
  });

  const wrapper = mount(<MockComponent/>);
  const stateEl = wrapper.find('.state');
  const posYEl = wrapper.find('.y');
  const posXEl = wrapper.find('.x');

  it('마운트 시 초기값을 반환한다.', () => {
    expect(stateEl.text()).toBe('done');
    expect(posYEl.text()).toBe('0');
    expect(posXEl.text()).toBe('0');
  });

  it('start 이벤트만 발동되면 아무런 변화가 없다.', () => {
    mockElement.dispatchEvent(new MouseEvent('mousedown', {clientY: 1,  clientX: 1}));
    expect(stateEl.text()).toBe('done');
    expect(posYEl.text()).toBe('0');
    expect(posXEl.text()).toBe('0');
  });

  it('move 이벤트가 실행되면 state가 변경된다.', () => {
    mockElement.dispatchEvent(new MouseEvent('mousemove', {clientY: 100,  clientX: 100}))
    expect(stateEl.text()).toBe('move');
    expect(posXEl.text()).toBe('99');
    expect(posYEl.text()).toBe('99');
  });

  it('end 이벤트가 실행되면 초기값을 반환한다.', () => {
    mockElement.dispatchEvent(new MouseEvent('mouseup'));
    expect(stateEl.text()).toBe('done');
    expect(posYEl.text()).toBe('0');
    expect(posXEl.text()).toBe('0');
  });
  it('end와 move 이벤트가 동시에 실행되면 move 이벤트를 차단한다.', () => {
    mockElement.dispatchEvent(new MouseEvent('mouseend'));
    mockElement.dispatchEvent(new MouseEvent('mousemove'));
    expect(stateEl.text()).toBe('done');
    expect(posYEl.text()).toBe('0');
    expect(posXEl.text()).toBe('0');

    wrapper.unmount();
  });
});

describe("useSwipe 옵션추가 테스트", () => {
  it('start event target이 options에 추가한 ignore 엘리먼트거나 포함되있다면 이벤트를 차단한다.', () => {
    const wrapper = mount(<MockComponent options={{ignoreElement: mockElement}}/>);
    
    mockElement.dispatchEvent(new MouseEvent('mousedown', {clientY: 1,  clientX: 1}));
    mockElement.dispatchEvent(new MouseEvent('mousemove', {clientY: 100,  clientX: 100}));
    expect(wrapper.find('.state').text()).toBe('done');
    expect(wrapper.find('.y').text()).toBe('0');
    expect(wrapper.find('.x').text()).toBe('0');

    wrapper.unmount();
  });

  const scope = {
    x: [100, 200],
    y: [100, 200]
  };

  it('start포지션이 options에서 지정한 scope에 벗어난다면 이벤트를 차단한다.', () => {
    const wrapper = mount(<MockComponent options={{scope} as UseSwipeOption}/>);
    mockElement.dispatchEvent(new MouseEvent('mousedown', {clientY: 150,  clientX: 1}));
    mockElement.dispatchEvent(new MouseEvent('mousemove', {clientY: 150, clientX: 1}));

    expect(wrapper.find('.state').text()).toBe('done');
    expect(wrapper.find('.x').text()).toBe('0');
    expect(wrapper.find('.y').text()).toBe('0');

    wrapper.unmount();
  });

  it("[모바일] start포지션이 options에서 지정한 scope에 벗어난다면 이벤트를 차단한다.", () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value: 'iPhone',
      writable: true
    });
    Object.defineProperties(mockElement, {
      'scrollY': {value: -1},
      'scrillX': {value: -1}
    })

    const wrapper = mount(<MockComponent options={{scope} as UseSwipeOption}/>);
    //@ts-ignore
    mockElement.dispatchEvent(new TouchEvent('mousedown', {targetTouches: [{screenY: 50, screenX: 50}]}));
    //@ts-ignore
    mockElement.dispatchEvent(new MouseEvent('mousemove', {targetTouches: [{screenY: 150, screenX: 150}]}));

    expect(wrapper.find('.state').text()).toBe('done');
    expect(wrapper.find('.x').text()).toBe('0');
    expect(wrapper.find('.y').text()).toBe('0');

    wrapper.unmount();
  })
});