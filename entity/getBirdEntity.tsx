import Matter from 'matter-js';
import Bird from '../components/Bird';
import React from 'react';
import type {InitGC} from '../types/initGameComponents';

const getBirdEntity: InitGC = (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {label: 'Bird'}, // 选项参数
  );
  // 世界中添加鸟实体
  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird />,
  };
};
export default getBirdEntity;
