# Junction2023 WebGPU vs WebGL, in N-body simulation
(!https://victorious-pond-04b52a903.4.azurestaticapps.net/)
# We took part in Veikkaus's challenge and wanted to see how we could utilize the power of GPU in browser.

Firstly we had to come up with compute intensive task where we could compare the performances of CPU and GPU.
What would better suit our needs than N-body simulation, since its complexity is O(n^2)?

## WebGPU implementation
index.html contains the code where we setup and run WepGPU.
In WepGPU all the heavy lifting happens in a compute shader labeled "N-body speed and position shader". 
This makes the calculations run very fast because compute shader runs parallel on the GPU.


## WebGL with WebWorkers
webgl.html contains code where we setup WebGL for rendering cirles in positions, which are calculated in worker.js using WebWorkers. Position/velocities are stored with SharedArrayBuffer which allows the main thread and workers to share memory. Though this means that we must store the positions/velocities twice, since all workers read from one array and write to another. The jobs are orchestrated by the main thread using messages. Each worker modify the same arrays(they share the memory). Each worker is given start/end values, which define which portion of the out array they should calculate. For future reference, this could be done in smaller batches, because the workers might not be equally fast.



