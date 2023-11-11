const BALL_COUNT = 1000;

const ballStateArray = new Float32Array(new SharedArrayBuffer(BALL_COUNT*4*4));
const ballStateArrayOut = new Float32Array(new SharedArrayBuffer(BALL_COUNT*4*4));


const ballRadiusArray = new Float32Array(new SharedArrayBuffer(BALL_COUNT*4));
for(let i = 0; i < BALL_COUNT*4; i++){
	ballStateArray[i] = (Math.random() * 2 - 1)/200;
	ballRadiusArray[i] = (Math.random()+0.0001)/50;
}

if(!window.Worker){
	throw new Error("no worker:(")
}
const workerPool = []
for(let i = 0; i < 8; i++){
	const worker = new Worker("worker.js")

	workerPool.push(worker)
}

let resolver = undefined
const waitPromise = (workers) => {
	if(resolver != null){
		new Error("resolver defined!")
	}
	const promise = new Promise(resolve => resolver = resolve)

	let i = 0
	for(const worker of workers){
		worker.onmessage = 	(data) => {
			i++;
			if(i === workers.length){
				resolver?.()
				resolver = undefined
			}
		}
	}
	return promise
}


let steps = 0;
async function main(){
	while(true){
		const perWorker = ballStateArray.length / workerPool.length
	
		for(let i = 0; i < 8; i++){
			if(i == workerPool.length - 1){
				workerPool[i].postMessage({
					start: i*perWorker,
					end: ballStateArray.length,
					dataIn: steps % 2 === 0 ? ballStateArray : ballStateArrayOut,
					dataOut: steps % 2 === 0 ? ballStateArrayOut : ballStateArray,
					ballRadius: ballRadiusArray
	
				})
			} else {
				workerPool[i].postMessage({
					start: i*perWorker,
					end: (i+1)*perWorker,
					dataIn: steps % 2 === 0 ? ballStateArray : ballStateArrayOut,
					dataOut: steps % 2 === 0 ? ballStateArrayOut : ballStateArray,
					ballRadius: ballRadiusArray
				})
			}
		}
		console.log("waiting")
		await waitPromise(workerPool)
		steps++;
		console.log("done")
	}
}
main()