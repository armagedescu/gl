{
let canvas = document.currentScript.parentElement;
let func = () =>
{// https://www.khronos.org/webgl/wiki/Tutorial
 //https://www.mathematik.uni-marburg.de/~thormae/lectures/graphics1/code/WebGLShaderNormalTrans/ShaderNormalTrans.html
   let gl;

   let prog = buildGlProgram(canvas);
   gl = prog.gl;

   gl.clearColor(0.5, 0.5, 0.5, 0.9);
   //gl.enable(gl.DEPTH);
   gl.enable(gl.DEPTH_TEST);
   gl.clear (gl.COLOR_BUFFER_BIT);

   let nh = 1, ns = 19, dnh = 0.2, dr = 0.6;

   let verts    = [];
   let norms    = [];
   let tgs = 0;
   for (let i = 0, ix = 0,iy = 1,iz = 2; i <= ns; i++, ix += 9,iy += 9,iz += 9)
   {
	   verts[ix] = 0.0;
	   verts[iy] = 0.0;
	   verts[iz] = 0.0;
	   verts[ix + 3] =  dr * Math.cos(2 * Math.PI * i / ns);
	   verts[iy + 3] =  dr * Math.sin(2 * Math.PI * i / ns);
	   verts[iz + 3] =  0.7;
	   verts[ix + 6] =  dr * Math.cos(2 * Math.PI * (i+1) / ns);
	   verts[iy + 6] =  dr * Math.sin(2 * Math.PI * (i+1) / ns);
	   verts[iz + 6] =  0.7;

	   norms[ix]     =  verts[ix + 3];
	   norms[iy]     =  verts[iy + 3];
	   norms[iz]     =  verts[iz + 3];
	   norms[ix + 3] =  verts[ix + 3];
	   norms[iy + 3] =  verts[iy + 3];
	   norms[iz + 3] =  verts[iz + 3];
	   norms[ix + 6] =  verts[ix + 3];
	   norms[iy + 6] =  verts[iy + 3];
	   norms[iz + 6] =  verts[iz + 3];

   }
   let vertex_buffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

   let shaderProgram = prog.shaderProgram;
   let coord = gl.getAttribLocation (shaderProgram, "coordinates");
   gl.vertexAttribPointer     (coord, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray (coord);


   let normalBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(norms), gl.STATIC_DRAW);
   let noord = gl.getAttribLocation (shaderProgram, "inputNormal");
   gl.vertexAttribPointer     (noord, 3, gl.FLOAT, false, 0, 0);
   gl.enableVertexAttribArray (noord) /*/
   
   /* ==========translation======================================*/

   //gl.drawArrays(gl.TRIANGLE_FAN, 0, ns + 2);
   gl.drawArrays(gl.TRIANGLES, 0, ns * 3);


};
document.addEventListener('DOMContentLoaded', func);
}