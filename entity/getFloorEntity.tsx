import Matter from 'matter-js';
import {InitGC} from '../types/initGameComponents';
import Floor from '../components/Floor';
import React from 'react';

const getFloorEntity: InitGC = (world, color, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Floor', isStatic: true}, // 静态的，碰撞会被检测
  );
  Matter.World.add(world, initialFloor);

  return {body: initialFloor, color, pos, renderer: <Floor />};
};

export default getFloorEntity;
