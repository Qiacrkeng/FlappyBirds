import {Dimensions} from 'react-native';
// JS 2D物理引擎
import Matter from 'matter-js';
import getBirdEntity from './getBirdEntity.tsx';
import getFloorEntity from './getFloorEntity.tsx';
import getPipeEntity from './getPipeEntitty.tsx';
import {getPipeSizePosPair} from '../utils/random.ts';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const getGameEntities = () => {
  // 先创建一个引擎的实例，引擎是管理世界更新的控制器
  const engine = Matter.Engine.create({enableSleeping: false}); // 不休眠
  // 引擎的世界模型
  const world = engine.world;
  // 重力为0.4
  engine.gravity.y = 0.4;
  // 根据两个不同的管道生成不同的位置
  const pipeSizePosLeft = getPipeSizePosPair();
  const pipeSizePosRight = getPipeSizePosPair(windowWidth * 0.9);
  // 返回的实例，除了renderer字段是渲染组件，其他是props传递的参数，最后给system属性操作逻辑
  return {
    physics: {
      engine,
      world,
    },
    Bird: getBirdEntity(
      world,
      'green',
      {x: 50, y: 300},
      {height: 40, width: 40},
    ),

    Floor: getFloorEntity(
      world,
      'green',
      {x: windowWidth / 2, y: windowHeight},
      {height: 35, width: windowWidth},
    ),

    PipeTop1: getPipeEntity(
      world,
      'green',
      pipeSizePosLeft.pipeTop.pos,
      pipeSizePosLeft.pipeTop.size,
      'PipeTop1',
    ),
    PipeBottom1: getPipeEntity(
      world,
      'green',
      pipeSizePosLeft.pipeBottom.pos,
      pipeSizePosLeft.pipeBottom.size,
      'PipeBottom1',
    ),
    PipeTop2: getPipeEntity(
      world,
      'green',
      pipeSizePosRight.pipeTop.pos,
      pipeSizePosRight.pipeTop.size,
      'PipeTop2',
    ),
    PipeBottom2: getPipeEntity(
      world,
      'green',
      pipeSizePosRight.pipeBottom.pos,
      pipeSizePosRight.pipeBottom.size,
      'PipeBottom2',
    ),
  };
};
export default getGameEntities;
