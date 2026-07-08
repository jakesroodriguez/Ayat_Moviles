import { useEffect, useRef } from "react";

export default function BackgroundShader({ isDarkMode = false }: { isDarkMode?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_position * 0.5 + 0.5;
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform float u_is_dark;

      void main() {
        vec2 uv = v_texCoord;
        float noise = sin(uv.x * 3.0 + u_time * 0.5) * 0.5 + 0.5;
        noise += sin(uv.y * 4.0 - u_time * 0.3) * 0.5 + 0.5;
        
        vec3 lightColor1 = vec3(0.85, 0.85, 0.88);
        vec3 lightColor2 = vec3(0.96, 0.96, 0.98);
        vec3 lightColor3 = vec3(0.91, 0.91, 0.94);
        
        vec3 darkColor1 = vec3(0.05, 0.05, 0.1);
        vec3 darkColor2 = vec3(0.1, 0.1, 0.15);
        vec3 darkColor3 = vec3(0.07, 0.07, 0.12);

        vec3 color1 = mix(lightColor1, darkColor1, u_is_dark);
        vec3 color2 = mix(lightColor2, darkColor2, u_is_dark);
        vec3 color3 = mix(lightColor3, darkColor3, u_is_dark);

        vec3 finalColor = mix(color1, color2, noise * 0.3);
        finalColor = mix(finalColor, color3, sin(u_time * 0.2) * 0.2 + 0.2);
        
        float dist = distance(uv, vec2(0.5));
        finalColor *= 1.0 - dist * 0.2;
        gl_FragColor = vec4(finalColor, 0.05);
      }
    `;

    function createShader(
      glInstance: WebGLRenderingContext,
      type: number,
      source: string
    ) {
      const shader = glInstance.createShader(type);
      if (!shader) return null;
      glInstance.shaderSource(shader, source);
      glInstance.compileShader(shader);
      if (!glInstance.getShaderParameter(shader, glInstance.COMPILE_STATUS)) {
        console.error("Shader compile error:", glInstance.getShaderInfoLog(shader));
        glInstance.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0, 
       1.0, -1.0, 
      -1.0,  1.0, 
      -1.0,  1.0, 
       1.0, -1.0, 
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const isDarkLocation = gl.getUniformLocation(program, "u_is_dark");

    let animationFrameId: number;

    function resizeCanvas() {
      if (!canvas || !gl) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Use a ref to keep track of the current prop value inside the animation loop
    let currentIsDark = isDarkMode;

    function render(time: number) {
      if (!gl || !program) return;
      const timeSeconds = time * 0.001;
      gl.useProgram(program);
      gl.uniform1f(timeLocation, timeSeconds);
      // Determine the target value: 1.0 for dark, 0.0 for light
      const targetDark = currentIsDark ? 1.0 : 0.0;
      gl.uniform1f(isDarkLocation, targetDark);

      if (canvas) {
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);
    
    // Create an update function attached to the canvas element for the useEffect to call
    (canvas as any).updateIsDark = (newVal: boolean) => {
      currentIsDark = newVal;
    };

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Only run once on mount

  // Update the uniform value dynamically when prop changes
  useEffect(() => {
    if (canvasRef.current) {
      (canvasRef.current as any).updateIsDark?.(isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed inset-0 w-screen h-screen z-[-1] opacity-30 pointer-events-none"
    />
  );
}
