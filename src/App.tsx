// src/App.tsx
import { useState, useRef, useEffect } from 'react';

function App() {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    // 最初に現在の通知権限を確認
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Service Workerにメッセージを送信する関数
  const postMessageToSW = () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'SHOW_NOTIFICATION',
      });
      console.log('通知リクエストを送信しました。');
    }
  };

  // 通知開始ボタンの処理
  const handleStart = async () => {
    // 1. 通知の許可をリクエスト
    if (!('Notification' in window)) {
      alert('このブラウザは通知をサポートしていません。');
      return;
    }
    const currentPermission = await Notification.requestPermission();
    setPermission(currentPermission);

    if (currentPermission !== 'granted') {
      alert('通知が許可されませんでした。');
      return;
    }

    // 2. すでにタイマーが動いていれば停止
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    // 3. 15秒おきに通知リクエストを送信するタイマーを開始
    console.log('15秒おきの通知を開始します。');
    // まずは一度すぐに実行
    postMessageToSW(); 
    // その後、15秒ごとに実行
    intervalId.current = window.setInterval(postMessageToSW, 15 * 1000);
  };
  
  // 通知停止ボタンの処理
  const handleStop = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
      console.log('通知を停止しました。');
      alert('通知を停止しました。');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PWA バックグラウンド通知テスト</h1>
        <p>現在の通知権限: <strong>{permission}</strong></p>
        <button onClick={handleStart} style={{ marginRight: '10px' }}>
          15秒おきの通知を開始
        </button>
        <button onClick={handleStop}>
          通知を停止
        </button>
        <p><small>※このタブが開いている間だけ動作します。</small></p>
      </header>
    </div>
  );
}

export default App;