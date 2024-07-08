import { Server as NetServer } from 'http'
import { NextApiRequest } from 'next'
import { Server as SocketIOServer } from 'socket.io'


export default function SocketHandler(req: NextApiRequest, res: any) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const httpServer: NetServer = res.socket.server as any
    const io = new SocketIOServer(httpServer, {
      path: '/api/socketio',
    })
    res.socket.server.io = io

    io.on('connection', (socket) => {
      console.log('New client connected')

      socket.on('chat-message', (msg: { user: string; text: string }) => {
        // 모든 클라이언트에게 메시지를 브로드캐스트
        io.emit('chat-message', msg)
      })
    })
  }
  res.end()
}