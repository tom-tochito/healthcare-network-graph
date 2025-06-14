import React, { useRef, useCallback, useEffect, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { NetworkNode, NetworkLink, NetworkData } from '../types/network.types';
import './NetworkGraph.css';

interface NetworkGraphProps {
  data: NetworkData;
  selectedNode: string | null;
  onNodeClick: (node: NetworkNode) => void;
  onNodeHover: (node: NetworkNode | null) => void;
  onLinkClick: (link: NetworkLink) => void;
  onLinkHover: (link: NetworkLink | null) => void;
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({
  data,
  selectedNode,
  onNodeClick,
  onNodeHover,
  onLinkClick,
  onLinkHover,
}) => {
  const graphRef = useRef<any>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredLink, setHoveredLink] = useState<NetworkLink | null>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const nodePositions = useRef<Map<string, { x: number; y: number }>>(new Map());

  useEffect(() => {
    if (graphRef.current && selectedNode) {
      // Small delay to ensure the graph has rendered and physics settled
      const timeoutId = setTimeout(() => {
        try {
          const graphInstance = graphRef.current;
          
          // First try to get position from our tracked positions
          const trackedPosition = nodePositions.current.get(selectedNode);
          if (trackedPosition) {
            graphInstance.centerAt(trackedPosition.x, trackedPosition.y, 1000);
            graphInstance.zoom(1.5, 1000);
            return;
          }
          
          // Fallback: if it's the center node, we know it's at (0, 0)
          const targetNode = data.nodes.find(n => n.id === selectedNode);
          if (targetNode && targetNode.fx === 0 && targetNode.fy === 0) {
            graphInstance.centerAt(0, 0, 1000);
            graphInstance.zoom(1.5, 1000);
          }
        } catch (error) {
          console.error('Error centering on node:', error);
        }
      }, 800);
      
      return () => clearTimeout(timeoutId);
    }
  }, [selectedNode, data.nodes]);

  const nodeCanvasObject = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    // Track node position
    if (node.x !== undefined && node.y !== undefined) {
      nodePositions.current.set(node.id, { x: node.x, y: node.y });
    }
    
    const label = node.name;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Inter, sans-serif`;
    
    const isSelected = node.id === selectedNode;
    const isHovered = node.id === hoveredNode;
    const isCenterNode = node.fx === 0 && node.fy === 0;
    
    // Node circle
    const nodeSize = isCenterNode ? 40 : 30;
    ctx.beginPath();
    ctx.arc(node.x, node.y, nodeSize, 0, 2 * Math.PI);
    
    // Node styling based on state
    if (isSelected || isCenterNode) {
      ctx.fillStyle = '#FFF';
      ctx.strokeStyle = '#FF6B4A';
      ctx.lineWidth = 3 / globalScale;
    } else if (isHovered) {
      ctx.fillStyle = '#FFF';
      ctx.strokeStyle = '#4A90FF';
      ctx.lineWidth = 2 / globalScale;
    } else {
      ctx.fillStyle = '#FFF';
      ctx.strokeStyle = '#E0E7FF';
      ctx.lineWidth = 2 / globalScale;
    }
    
    ctx.fill();
    ctx.stroke();
    
    // Profile image
    if (node.profileImage) {
      let img = imageCache.current.get(node.profileImage);
      if (!img) {
        img = new Image();
        img.src = node.profileImage;
        imageCache.current.set(node.profileImage, img);
      }
      
      if (img.complete) {
        const imgSize = nodeSize * 1.6;
        ctx.save();
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize - 3, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, node.x - imgSize / 2, node.y - imgSize / 2, imgSize, imgSize);
        ctx.restore();
      }
    }
    
    // Label
    ctx.fillStyle = '#1F2937';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const lines = label.split(' ');
    const lineHeight = fontSize * 1.2;
    const startY = node.y + nodeSize + 15;
    
    lines.forEach((line: string, i: number) => {
      ctx.fillText(line, node.x, startY + (i * lineHeight));
    });
  }, [selectedNode, hoveredNode, imageCache]);

  const linkCanvasObject = useCallback((link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const start = link.source;
    const end = link.target;
    
    if (!start || !end) return;
    
    const isHovered = hoveredLink && 
      hoveredLink.source === link.source.id && 
      hoveredLink.target === link.target.id;
    
    // Link line
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = isHovered ? '#4A90FF' : '#E0E7FF';
    ctx.lineWidth = isHovered ? 2 : 1;
    ctx.stroke();
    
    // Link label on hover
    if (isHovered && link.label) {
      const midX = (start.x + end.x) / 2;
      const midY = (start.y + end.y) / 2;
      
      ctx.font = `${10 / globalScale}px Inter, sans-serif`;
      ctx.fillStyle = '#4A90FF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Background for label
      const padding = 5;
      const textWidth = ctx.measureText(link.label).width;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillRect(
        midX - textWidth / 2 - padding,
        midY - 10 - padding,
        textWidth + padding * 2,
        20 + padding * 2
      );
      
      // Label text
      ctx.fillStyle = '#4A90FF';
      ctx.fillText(link.label, midX, midY);
    }
  }, [hoveredLink]);

  const handleNodeHover = useCallback((node: any) => {
    setHoveredNode(node ? node.id : null);
    onNodeHover(node);
  }, [onNodeHover]);

  const handleLinkHover = useCallback((link: any) => {
    if (link) {
      const linkData: NetworkLink = {
        source: link.source.id,
        target: link.target.id,
        type: link.type,
        strength: link.strength,
        label: link.label,
        publications: link.publications,
        sharedInstitution: link.sharedInstitution
      };
      setHoveredLink(linkData);
      onLinkHover(linkData);
    } else {
      setHoveredLink(null);
      onLinkHover(null);
    }
  }, [onLinkHover]);

  return (
    <div className="network-graph-container">
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        nodeId="id"
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
          ctx.fillStyle = color;
          const nodeSize = (node.fx === 0 && node.fy === 0) ? 40 : 30;
          ctx.beginPath();
          ctx.arc(node.x || 0, node.y || 0, nodeSize, 0, 2 * Math.PI);
          ctx.fill();
        }}
        linkCanvasObject={linkCanvasObject}
        onNodeClick={onNodeClick}
        onNodeHover={handleNodeHover}
        onNodeDragEnd={(node: any) => {
          node.fx = node.x;
          node.fy = node.y;
        }}
        onLinkClick={(link: any) => {
          const linkData: NetworkLink = {
            source: link.source.id,
            target: link.target.id,
            type: link.type,
            strength: link.strength,
            label: link.label,
            publications: link.publications,
            sharedInstitution: link.sharedInstitution
          };
          onLinkClick(linkData);
        }}
        onLinkHover={handleLinkHover}
        d3VelocityDecay={0.4}
        d3AlphaDecay={0.05}
        warmupTicks={50}
        cooldownTicks={0}
        cooldownTime={3000}
        enableZoomInteraction={true}
        enablePanInteraction={true}
        enableNodeDrag={true}
        linkDirectionalParticles={0}
      />
    </div>
  );
};

export default NetworkGraph;