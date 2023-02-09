import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function HistoryRating(props) {
  return (
    <Svg
      width={26}
      height={18}
      viewBox="0 0 26 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect
        width={6}
        height={4}
        rx={2}
        fill={props.focused ? '#6248FF' : '#D8DEE8'}
      />
      <Rect
        y={7}
        width={6}
        height={4}
        rx={2}
        fill={props.focused ? '#6248FF' : '#D8DEE8'}
      />
      <Rect
        y={14}
        width={6}
        height={4}
        rx={2}
        fill={props.focused ? '#6248FF' : '#D8DEE8'}
      />
      <Rect
        x={8}
        width={18}
        height={4}
        rx={2}
        fill={props.focused ? '#6248FF' : '#D8DEE8'}
      />
      <Rect
        x={8}
        y={7}
        width={14}
        height={4}
        rx={2}
        fill={props.focused ? '#6248FF' : '#D8DEE8'}
      />
      <Rect
        x={8}
        y={14}
        width={8}
        height={4}
        rx={2}
        fill={props.focused ? '#6248FF' : '#D8DEE8'}
      />
    </Svg>
  );
}

export default HistoryRating;
