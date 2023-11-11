var MAX_VALUE = 1000000;

var Vector = function(a, b) {
    var self = this;
        self.x = a;
        self.y = b;
};

var vec2f = function(a, b) {
    return new Vector(a, b);
};


function normalize(v) {
	return divide(v, Math.sqrt(v.x*v.x+v.y*v.y))
}

function substract(v1, v2){
	return new Vector(v1.x-v2.x, v1.y-v2.y)
}

function multiply(v, a){
	return new Vector(v.x*a, v.y*a)
}

function divide(v, a){
	return multiply(v, 1/a)
}
/*
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
*/

const calculateNextStep = (ballStateIn, ballStateOut, ballRadius, start, end, G=0.001, dt=1/144) => {
	for(let ballNumber = start; ballNumber < end; ballNumber++){
		ballStateOut[ballNumber*4+0] = ballStateIn[ballNumber*4+0];
		ballStateOut[ballNumber*4+1] = ballStateIn[ballNumber*4+1];
		ballStateOut[ballNumber*4+2] = ballStateIn[ballNumber*4+2];
		ballStateOut[ballNumber*4+3] = ballStateIn[ballNumber*4+3];

		let pos =  vec2f(ballStateIn[ballNumber*4], ballStateIn[ballNumber*4+1]);

		for(var i = 0;i<ballStateIn.length / 4;i++)
		{
				//We dont want to calculate the force with the ball itself
				if(i==ballNumber){continue;}

				const otherPos = vec2f(ballStateIn[i*4], ballStateIn[i*4+1])

				let r = substract(otherPos, pos);

				var r_squared = r.x*r.x+r.y*r.y;

				if(r_squared < 0.001) r_squared = 0.001


				let num = G/r_squared;

				let acc = multiply(normalize(r), num * dt * ballRadius[i]);

				ballStateOut[ballNumber*4+2] += acc.x;
				ballStateOut[ballNumber*4+3] += acc.y;
			}
			/*
			var newX = ballStateOut[ballNumber*4] + ballStateOut[ballNumber*4+2] * dt;
			var newY = ballStateOut[ballNumber*4+1] + ballStateOut[ballNumber*4+3] * dt;
			
			if(newX+ballRadius[ballNumber]>=1 || newX- ballRadius[ballNumber]<=-1){
				ballStateOut[ballNumber*4+2] = -1*ballStateOut[ballNumber*4+2];
			}
			if(newY+ballRadius[ballNumber]>=1 || newY- ballRadius[ballNumber]<=-1){
				ballStateOut[ballNumber*4+3] = -1*ballStateOut[ballNumber*4+3];
			}*/
			ballStateOut[ballNumber*4] += ballStateOut[ballNumber*4+2] * dt;
			ballStateOut[ballNumber*4+1] += ballStateOut[ballNumber*4+3] * dt;	
	}
	return ballStateOut;
}

onmessage = function(e) {
	const data = e.data;
	calculateNextStep(data.dataIn, data.dataOut, data.ballRadius, data.start, data.end, 0.001, 0.02)
	this.postMessage("")
}