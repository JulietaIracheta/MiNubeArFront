import React, { useCallback, useState } from "react";
import { LinePath } from "@visx/shape";
import { useDrag } from "@visx/drag";
import { curveBasis } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
function Example({ data = [], width, height }) {
  const [lines, setLines] = useState(data);
  const onDragStart = useCallback(
    (currDrag) => {
      setLines((currLines) => [
        ...currLines,
        [{ x: currDrag.x, y: currDrag.y }]
      ]);
    },
    [setLines]
  );
const reset = () => {
  setLines(data)
}

  const onDragMove = useCallback(
    (currDrag) => {
      setLines((currLines) => {
        const nextLines = [...currLines];
        const newPoint = {
          x: currDrag.x + currDrag.dx,
          y: currDrag.y + currDrag.dy
        };
        const lastIndex = nextLines.length - 1;
        nextLines[lastIndex] = [...(nextLines[lastIndex] || []), newPoint];
        return nextLines;
      });
    },
    [setLines]
  );
  const {
    x = 0,
    y = 0,
    dx,
    dy,
    isDragging,
    dragStart,
    dragEnd,
    dragMove
  } = useDrag({
    onDragStart,
    onDragMove,
    resetOnStart: true
  });
  return width < 10 ? null : (
    <div>
    <div className="DragII" style={{ touchAction: "none" }}>
      <svg width={width} height={height}>
        <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />
        <rect fill="#04002b" width={width} height={height} rx={14} />
        {lines.map((line, i) => (
          <LinePath
            key={`line-${i}`}
            fill="transparent"
            stroke="url(#stroke)"
            strokeWidth={3}
            data={line}
            curve={curveBasis}
            x={(d) => d.x}
            y={(d) => d.y}
          />
        ))}
        <g>
          {isDragging && (
            <rect
              width={width}
              height={height}
              onMouseMove={dragMove}
              onMouseUp={dragEnd}
              fill="transparent"
            />
          )}
          {isDragging && (
            <g>
              <rect
                fill="white"
                width={8}
                height={8}
                x={x + dx - 4}
                y={y + dy - 4}
                pointerEvents="none"
              />
              <circle
                cx={x}
                cy={y}
                r={4}
                fill="transparent"
                stroke="white"
                pointerEvents="none"
              />
            </g>
          )}
          <rect
            fill="transparent"
            width={width}
            height={height}
            onMouseDown={dragStart}
            onMouseUp={isDragging ? dragEnd : undefined}
            onMouseMove={isDragging ? dragMove : undefined}
            onTouchStart={dragStart}
            onTouchEnd={isDragging ? dragEnd : undefined}
            onTouchMove={isDragging ? dragMove : undefined}
          />
        </g>
      </svg>
      <style jsx>{`
        .DragII {
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        svg {
          margin: 1rem 0;
          cursor: crosshair;
        }
        .deets {
          display: flex;
          flex-direction: row;
          font-size: 12px;
        }
        .deets > div {
          margin: 0.25rem;
        }
      `}</style>
    </div>
    
    <button className="btn btn-warning mb-2" onClick={reset}>Reset</button>
    </div>

  );
}
export default function App() {
  return (
    <div className="App">
      <Example width={800} height={500} />
    </div>
  );
}