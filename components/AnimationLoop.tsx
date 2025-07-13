import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export interface AnimationLoopRef {
  start: () => void;
  stop: () => void;
  isRunning: boolean;
}

interface AnimationLoopProps {
  onFrame: (deltaTime: number, totalTime: number) => void;
  targetFPS?: number;
  autoStart?: boolean;
  children?: React.ReactNode;
}

export const AnimationLoop = forwardRef<AnimationLoopRef, AnimationLoopProps>(
  ({ onFrame, targetFPS = 60, autoStart = false, children }, ref) => {
    const [isRunning, setIsRunning] = useState(autoStart);
    const animationIdRef = useRef<number | null>(null);
    const lastTimeRef = useRef<number>(0);
    const totalTimeRef = useRef<number>(0);
    const frameIntervalRef = useRef<number>(1000 / targetFPS);

    const loop = (currentTime: number) => {
      if (animationIdRef.current === null) return;

      const deltaTime = currentTime - lastTimeRef.current;
      
      // フレームレート制御
      if (deltaTime >= frameIntervalRef.current) {
        totalTimeRef.current += deltaTime;
        onFrame(deltaTime, totalTimeRef.current);
        lastTimeRef.current = currentTime;
      }
      animationIdRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (isRunning) return;
      
      setIsRunning(true);
      lastTimeRef.current = performance.now();
      animationIdRef.current = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (!isRunning) return;
      
      setIsRunning(false);
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };

    const reset = () => {
      totalTimeRef.current = 0;
      lastTimeRef.current = performance.now();
    };

    // imperativeHandle で外部に公開するメソッド
    useImperativeHandle(ref, () => ({
      start,
      stop,
      isRunning,
      reset,
    }));

    // targetFPS が変更されたときにフレーム間隔を更新
    useEffect(() => {
      frameIntervalRef.current = 1000 / targetFPS;
    }, [targetFPS]);

    // autoStart が有効な場合は自動開始
    useEffect(() => {
      if (autoStart && !isRunning) {
        start();
      }
    }, [autoStart]);

    // isRunning の変更を監視してループを制御
    useEffect(() => {
      if (isRunning && animationIdRef.current === null) {
        lastTimeRef.current = performance.now();
        animationIdRef.current = requestAnimationFrame(loop);
      } else if (!isRunning && animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    }, [isRunning]);

    // クリーンアップ
    useEffect(() => {
      return () => {
        if (animationIdRef.current !== null) {
          cancelAnimationFrame(animationIdRef.current);
        }
      };
    }, []);

    return <>{children}</>;
  }
);

AnimationLoop.displayName = 'AnimationLoop';