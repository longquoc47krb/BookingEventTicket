import { Client } from "stompjs";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
const WebSocketUtils = {};

WebSocketUtils.initializeWebSocketConnection = (topic, callback) => {
  const socket = new SockJS("http://localhost:8080/eventStatusSocket"); // Replace with your WebSocket endpoint URL
  const stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    stompClient.subscribe(topic, (message) => {
      if (callback) {
        callback(message.body);
      }
    });
  });

  WebSocketUtils.stompClient = stompClient;
};

WebSocketUtils.disconnectWebSocket = () => {
  if (WebSocketUtils.stompClient) {
    WebSocketUtils.stompClient.disconnect();
  }
};

export default WebSocketUtils;
