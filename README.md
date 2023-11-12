# Junction2023 WebGPU vs WebGL, in N-body simulation

# We took part in Veikkaus's challenge and wanted to see how we could utilize the power of GPU in browser.

Firstly we had to come up with compute intensive task where we could compare the performances of CPU and GPU.
What would better suit our needs than N-body simulation? Which is N^2 in performance.

## WebGPU implementation
index.html contains the code where we setup and run WepGPU.
In WepGPU all the heavy lifting happens in compute shared labeled "N-body speed and position shader". 
This makes the calculations run very fast because compute shared's run paralel in GPU.


## WebGL with WebWorkers
webgl.html contains code where we setup WebGL for rendering cirles in positions 
which are calculated in worker.js using WebWorkers. 



