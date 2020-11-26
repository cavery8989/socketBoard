
import React, { useEffect, useState } from "react";
import "./App.css";
import { useSocket } from "./hooks/useSocket";

type Pos = {
  x: number
  y: number
}


function App() {
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [prevPos, setPrevPos] = useState<Pos>({ x: 0, y: 0 });

  const scale = 3
  
  const { socket } = useSocket() 
  
  const paint = (ctx, brushStart: Pos, brushEnd: Pos) => {
    ctx.beginPath();
    ctx.moveTo(brushStart.x, brushStart.y);
    ctx.lineTo(brushEnd.x, brushEnd.y);
    ctx.stroke();
  };

  socket.on('connect', () => {
    console.log('client connected')
    socket.emit('joinRoom', 'room1')
  })

  socket.on('drawing', (data) => {
    console.log(data)
    const ctx = canvasCtxRef.current
    if(ctx) {
      paint(ctx, data.lineStart, data.lineEnd)
    }
    
  })

  useEffect(() => {
    const ctx = canvasCtxRef.current;
    if (ctx) {
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.strokeStyle = "#00CC99";
    }
  }, []);

  const emitLine = (lineStart: Pos, lineEnd: Pos) => {
    socket.emit('drawing', {lineStart, lineEnd})
  }

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (drawing && canvasCtxRef.current) {
    
      const start = {x: prevPos.x, y: prevPos.y}
      const end = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      }
      paint(canvasCtxRef.current, start,  end);
      emitLine(start, end)
      setPrevPos({ x: end.x, y: end.y });
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    setPrevPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    setDrawing(true);
  };


  

  return (
    <div className="App">
      hat
      <canvas
        width={`${300 * scale}px`}
        height={`${150 * scale}px`}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={(canvas) => {
          if (canvas) canvasCtxRef.current = canvas.getContext("2d");
        }}
        className={"canvas"}
      />
    </div>
  );
}

export default App;
