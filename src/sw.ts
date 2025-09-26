// src/sw.ts

// Service Workerが自分自身を制御できるようにするために必要
/// <reference lib="WebWorker" />
declare const self: ServiceWorkerGlobalScope;

import { precacheAndRoute } from 'workbox-precaching';

// VitePWAが生成するファイルリストをプリキャッシュする
precacheAndRoute(self.__WB_MANIFEST || []);

// Reactアプリからのメッセージを受け取るリスナー
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const title = '⏰ 定期通知テスト';
    const options = {
      body: `これはService Workerからの通知です。\n${new Date().toLocaleTimeString()}`,
      icon: '/vite.svg', // publicフォルダにあるアイコンを指定
    };
    // 通知を表示する
    event.waitUntil(self.registration.showNotification(title, options));
  }
});

// インストール時に即座に有効化する
self.addEventListener('install', () => {
  self.skipWaiting();
});