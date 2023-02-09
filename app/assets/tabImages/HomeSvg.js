import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HomeSvg(props) {
  return (
    <Svg
      width={18}
      height={20}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 8.467A3 3 0 011.158 6.1l6-4.666a3 3 0 013.684 0l6 4.666A3 3 0 0118 8.467V18a2 2 0 01-2 2H2a2 2 0 01-2-2V8.467z"
        fill={props.focused ? '#6248FF' : '#D8DEE8'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 20v-7a3 3 0 116 0v7"
        fill="#FFFFFF"
      />
    </Svg>
  );
}

export default HomeSvg;
