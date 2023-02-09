import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function ProfileSvg(props) {
  return (
    <Svg
      width={17}
      height={20}
      viewBox="0 0 17 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 20v-2.333C17 15.089 15.097 13 12.75 13h-8.5C1.903 13 0 15.09 0 17.667V20M8.5 9a4.5 4.5 0 100-9 4.5 4.5 0 000 9z"
        fill={props.focused ? '#6248FF' : '#D8DEE8'}
      />
    </Svg>
  );
}

export default ProfileSvg;
