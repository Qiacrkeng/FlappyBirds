import Matter from 'matter-js';
import {InitGC} from '../types/initGameComponents';
import Pipe from '../components/Pipe';
import React from 'react';

const getPipeEntity: InitGC = (world, color, pos, size, label) => {
  const initialPipe = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label, isStatic: true},
  );
  Matter.World.add(world, initialPipe);

  return {
    body: initialPipe,
    color,
    pos,
    renderer: <Pipe />,
    label,
  };
};
export default getPipeEntity;
