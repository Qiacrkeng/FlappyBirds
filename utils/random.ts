import {Dimensions} from 'react-native';
import {Position, Size} from '../types/initGameComponents';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

interface PipeInfo {
  pos: Position;
  size: Size;
}
// 获得一个随机数
export const getRandom = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const getPipeSizePosPair = (
  addToPosX = 0,
): {
  pipeTop: PipeInfo;
  pipeBottom: PipeInfo;
} => {
  const yPosTop = -getRandom(300, windowHeight - 100);
  // 向下的管道信息
  const pipeBottom: PipeInfo = {
    pos: {x: windowWidth + addToPosX, y: yPosTop},
    size: {width: 75, height: windowHeight * 2},
  };
  // 向上的管道信息
  const pipeTop: PipeInfo = {
    pos: {x: windowWidth + addToPosX, y: windowHeight * 2 + 200 + yPosTop},
    // 注意View高度，这样相当于只位移了yPosTop
    size: {width: 75, height: windowHeight * 2},
  };

  return {pipeTop, pipeBottom};
};
