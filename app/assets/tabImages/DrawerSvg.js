import * as React from 'react';
import Svg, {Rect} from 'react-native-svg';

function DrawerSvg(props) {
  return (
    <Svg
      width={26}
      height={17}
      viewBox="0 0 26 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Rect width={26} height={3.9} rx={1.95} fill="#333" />
      <Rect y={6.5} width={26} height={3.9} rx={1.95} fill="#333" />
      <Rect y={13} width={26} height={3.9} rx={1.95} fill="#333" />
    </Svg>
  );
}

export default DrawerSvg;
