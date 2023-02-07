import {View, Image, StyleSheet} from 'react-native';
import React, {FunctionComponent} from 'react';
import Matter from 'matter-js';

interface PipeProps {
  body?: Matter.Body;
  color?: string;
  label?: string;
}

const Pipe: FunctionComponent<PipeProps> = props => {
  if (
    props.body === undefined ||
    props.color === undefined ||
    props.label === undefined
  ) {
    return <></>;
  }
  const isTop = props.label.includes('Top');

  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const styles = StyleSheet.create({
    pipe: {
      width: widthBody,
      height: heightBody,
      overflow: 'hidden',
      position: 'absolute',
      left: xBody,
      top: yBody,
      // borderColor: 'red',
      // borderWidth: 1,
      // backgroundColor: 'red',
    },
    pipeImage: {
      width: widthBody,
      height: heightBody,
      resizeMode: 'stretch',
    },
  });

  return (
    <View style={styles.pipe}>
      <Image
        style={styles.pipeImage}
        source={
          isTop
            ? require('../assets/pipeTop_green.png')
            : require('../assets/pipeBottom_green.png')
        }
      />
    </View>
  );
};

export default Pipe;
