import React, {FunctionComponent} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Matter from 'matter-js';

interface FloorProps {
  body?: Matter.Body;
  color?: string;
}

const Floor: FunctionComponent<FloorProps> = props => {
  if (props.body === undefined || props.color === undefined) {
    return <></>;
  }
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  // const color = props.color;

  const styles = StyleSheet.create({
    floor: {
      position: 'absolute',
      left: xBody,
      top: yBody,
      width: widthBody,
      height: heightBody,
      overflow: 'hidden',
      zIndex: 100,
    },
    floorImage: {width: widthBody, height: heightBody, resizeMode: 'repeat'},
  });

  return (
    <View style={styles.floor}>
      <Image
        style={styles.floorImage}
        source={require('../assets/ground.png')}
      />
    </View>
  );
};

export default Floor;
