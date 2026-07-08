import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  theme: 'dark' | 'light';
}

export default function ParticleBackground({ theme }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let animationFrameId: number;
    let isTabVisible = true;

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 120,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
        ctx.fill();
      }

      update() {
        if (!canvas) return;
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }

        // Magnetized interaction around cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius + this.size) {
            const pushForce = 1.5;
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
              this.x += pushForce;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
              this.x -= pushForce;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
              this.y += pushForce;
            }
            if (mouse.y > this.y && this.y > this.size * 10) {
              this.y -= pushForce;
            }
          }
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    const initParticles = () => {
      if (!canvas) return;
      particlesArray = [];
      const density = (canvas.width * canvas.height) / 14000;
      const numberOfParticles = Math.min(Math.max(density, 25), 85);

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1;
        const x = Math.random() * (canvas.width - size * 4) + size * 2;
        const y = Math.random() * (canvas.height - size * 4) + size * 2;
        const directionX = Math.random() * 0.4 - 0.2;
        const directionY = Math.random() * 0.4 - 0.2;

        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    };

    const connectParticles = () => {
      if (!ctx) return;
      const maxDistance = 110;

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacityValue = 1 - distance / maxDistance;
            ctx.strokeStyle =
              theme === 'dark'
                ? `rgba(255, 255, 255, ${opacityValue * 0.08})`
                : `rgba(0, 0, 0, ${opacityValue * 0.04})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animateParticles = () => {
      if (!isTabVisible || !canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connectParticles();

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isTabVisible = false;
        cancelAnimationFrame(animationFrameId);
      } else {
        isTabVisible = true;
        animateParticles();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animateParticles();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: theme === 'dark' ? 'screen' : 'multiply' }}
    />
  );
}
