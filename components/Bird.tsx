import React, {useMemo, useState, useEffect} from 'react';
import type {FC} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Matter from 'matter-js';

interface BirdProps {
  body?: Matter.Body;
  color?: string;
}

const Bird: FC<BirdProps> = props => {
  if (props.body === undefined || props.color === undefined) {
    return <></>;
  }
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  // const color = props.color;

  const styles = StyleSheet.create({
    bird: {
      position: 'absolute',
      // backgroundColor: color,
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
    },
    birdImage: {width: widthBody, height: heightBody, resizeMode: 'contain'},
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const path = useMemo(
    () => [
      require('../assets/bird1.png'),
      require('../assets/bird2.png'),
      require('../assets/bird3.png'),
    ],
    [],
  );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        setImageIndex(state => (state + 1) % path.length);
      } catch (e) {
        clearInterval(interval);
      }
    }, 100);
  }, [path.length]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [imageIndex, setImageIndex] = useState(0);

  return (
    <View style={styles.bird}>
      <Image style={styles.birdImage} source={path[imageIndex]} />
    </View>
  );
};
export default Bird;
