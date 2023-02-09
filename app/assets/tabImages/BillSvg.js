import * as React from 'react';
import Svg, {Path, Circle, Rect} from 'react-native-svg';

function BillSvg(props) {
  return (
    <Svg
      width={36}
      height={19}
      viewBox="0 0 36 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M10 16V3a3 3 0 013-3h20a3 3 0 013 3v13a3 3 0 01-3 3H13a3 3 0 01-3-3z"
        fill={props.focused ? '#6248FF' : '#F0F1F4'}
      />
      <Path
        d="M30 7.571h6V11h-7a1 1 0 01-1-1V7.871a.3.3 0 01.3-.3H30z"
        fill="#F0F1F4"
      />
      <Circle
        cx={7.5}
        cy={9.5}
        r={7}
        fill={props.focused ? '#6248FF' : '#D8DEE8'}
        stroke="#F0F1F4"
      />
      <Rect x={7} y={6} width={1} height={7} rx={0.5} fill={'#F0F1F4'} />
      <Rect
        x={4}
        y={10}
        width={1}
        height={7}
        rx={0.5}
        transform="rotate(-90 4 10)"
        fill={'#F0F1F4'}
      />
    </Svg>
  );
}

export default BillSvg;
