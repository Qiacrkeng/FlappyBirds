import React, {useState, useRef} from 'react';
import type {FC} from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';
import getGameEntities from './entity/getGameEnities.ts';
import gamePhysics from './utils/gamePhysics.ts';

const {width: windowWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'rgb(113,197,207)',
  },
  currentPoint: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    margin: 30,
    zIndex: 99,
  },
  startGameView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  startGameTouch: {
    backgroundColor: 'black',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  startGameText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30,
  },
  gameEngine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gameBackgroundCity: {
    width: windowWidth,
    position: 'absolute',
    bottom: 20,
    left: 0,
    zIndex: -10,
  },
  gameBackgroundTree: {
    width: windowWidth,
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: -8,
    resizeMode: 'repeat',
    height: 80,
  },
});

interface MyGameEngine extends GameEngine {
  swap: Function;
  stop: Function;
}

const App: FC = () => {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const gameEngine = useRef<MyGameEngine>(null);
  // 开始游戏
  const onStartGame = () => {
    // 分数归0
    setCurrentPoints(0);
    setIsRunning(true);
    if (gameEngine.current !== null) {
      // 重新启动一个游戏实体
      gameEngine.current.swap(getGameEntities());
    }
  };
  // 由dispatch函数触发的监听事件
  const onGameEvent = (event: GestureResponderEvent) => {
    if (gameEngine.current === null) {
      return;
    }
    switch (event.type) {
      case 'game_over':
        setIsRunning(false);
        gameEngine.current.stop();
        break;
      case 'new_point':
        setCurrentPoints(currentPoints + 1);
        break;
    }
  };

  return (
    // IOS内容区域（除掉刘海屏）
    // <SafeAreaView>
    <View style={styles.app}>
      <Text style={styles.currentPoint}>{currentPoints}</Text>
      {/* 游戏引擎组件 */}
      <GameEngine
        ref={gameEngine}
        style={styles.gameEngine}
        entities={getGameEntities()}
        running={isRunning}
        onEvent={onGameEvent}
        systems={[gamePhysics]}
      />
      {/* 城市贴图 */}
      <Image
        source={require('./assets/city.png')}
        style={styles.gameBackgroundCity}
      />
      {/* 树的贴图 */}
      <Image
        source={require('./assets/trees.png')}
        style={styles.gameBackgroundTree}
      />
      {/* <StatusBar hidden={true} /> */}

      {!isRunning && (
        <View style={styles.startGameView}>
          {/* 触摸时会降低不透明度 */}
          <TouchableOpacity style={styles.startGameTouch} onPress={onStartGame}>
            <Text style={styles.startGameText}>START GAME</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* <Image source={require('./src/assets/city.png')} /> */}
    </View>
    // </SafeAreaView>
  );
};

export default App;
