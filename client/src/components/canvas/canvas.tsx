
import React, { useEffect, useState } from "react";
import { useAppState } from "../../hooks/useApplicationState";
import { useSocket } from "../../hooks/useSocket";
import { Button } from "../button/button";
import './canvas.css'

type Pos = {
  x: number
  y: number
}

export const Canvas = () => {
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [prevPos, setPrevPos] = useState<Pos>({ x: 0, y: 0 });

  const scale = 3
  const canvasWidth = 300 * scale
  const canvasHeight = 150 * scale
  
  const { socket } = useSocket() 
  const {leaveGame} = useAppState()
  
  const paint = (ctx, brushStart: Pos, brushEnd: Pos) => {
    ctx.beginPath();
    ctx.moveTo(brushStart.x, brushStart.y);
    ctx.lineTo(brushEnd.x, brushEnd.y);
    ctx.stroke();
  };

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

  const clearCanvas = () => {
    const context = canvasCtxRef.current
    if(context) {
      context.clearRect(0, 0, canvasWidth, canvasHeight);
    }
  }

  socket.on('clearCanvas', () => {
    clearCanvas()
  })

  socket.on('hostLeft', () => {
    alert('The host left')
    leaveGame()
  })

  const handleClear = () => {
    clearCanvas()
    socket.emit('clearCanvas')
  }

  const handleExit = () => {
    socket.emit('leaveGame')
    leaveGame()
  }


  return (
    <div className="canvas">
      <canvas
        width={`${canvasWidth}px`}
        height={`${canvasHeight}px`}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        ref={(canvas) => {
          if (canvas) canvasCtxRef.current = canvas.getContext("2d");
        }}
        className={"canvas"}
      />
      <div className="canvas-buttons">
      <Button onclick={handleClear}>Clear</Button>
      <Button onclick={handleExit}>Exit</Button>
      </div>
    </div>
  );
}
