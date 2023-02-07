import {getPipeSizePosPair} from './random';
import Matter, {Engine} from 'matter-js';
import {Dimensions, GestureResponderEvent} from 'react-native';

const {width: windowWIdth} = Dimensions.get('window');

// 游戏的系统规则，这里称为游戏物理规则
const gamePhysics = (
  entities: {
    [key: string]: {
      point: boolean;
      body: Matter.Body;
    };
    physics: {engine: Engine; point: boolean; body: Matter.Body};
    Bird: {body: Matter.Body; point: boolean};
  },
  // time则是启动这个引擎每次调用的时间
  // touches可以监视触摸状态
  {touches, time, dispatch}: any,
) => {
  // 注意这里是Matter创建时的引擎
  const engine = entities.physics.engine;
  // 处理触摸事件
  touches
    .filter((t: GestureResponderEvent) => t.type === 'press')
    .forEach(() => {
      // 往上移动 x px
      Matter.Body.setVelocity(entities.Bird.body, {x: 0, y: -8});
    });
  // 以delta毫秒的时间更新模拟的世界（以相同的时间间隔）
  Matter.Engine.update(engine, time.delta);
  // 根据管道的位置判断
  for (let index = 1; index <= 2; index++) {
    if (
      entities[`PipeTop${index}`].body.bounds.max.x <= 50 &&
      !entities[`PipeTop${index}`].point
    ) {
      // 分数 + 1，当管道只有50px距离
      entities[`PipeTop${index}`].point = true; // 避免在生成新管道前多加分数
      dispatch({type: 'new_point'});
    }
    // 管道完全走了(超过了屏幕)
    if (entities[`PipeTop${index}`].body.bounds.max.x <= 0) {
      // 生成新的管道
      const pipeSizePos = getPipeSizePosPair(windowWIdth * 0.9);
      // 将新生成的管道位置设置，（实体操作）
      Matter.Body.setPosition(
        entities[`PipeTop${index}`].body,
        pipeSizePos.pipeTop.pos,
      );
      Matter.Body.setPosition(
        entities[`PipeBottom${index}`].body,
        pipeSizePos.pipeBottom.pos,
      );
      // 可以继续加分数了
      entities[`PipeTop${index}`].point = false;
    }
    // 管道逐步左移
    Matter.Body.translate(entities[`PipeTop${index}`].body, {x: -3, y: 0});
    Matter.Body.translate(entities[`PipeBottom${index}`].body, {x: -3, y: 0});
  }
  // 如果和任何一个Matter.Body碰撞了，则游戏结束
  Matter.Events.on(engine, 'collisionStart', () =>
    dispatch({type: 'game_over'}),
  );
  return entities;
};

export default gamePhysics;
