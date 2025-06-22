
class NeuralNetwork{
  constructor(neuroncounts){
    this.levels = []
    for(let i = 0;i<neuroncounts.length-1;i++){
      this.levels.push(new Level(neuroncounts[i],neuroncounts[i+1]))
    }
  }

  static feedForward(givenInputs,network){
    let outputs = Level.feedForward(givenInputs,network.levels[0])
    for(let i = 0;i<network.levels.length;i++){
      outputs = Level.feedForward(outputs,network.levels[i])
    }
    return outputs
  }
}


class Level {
  constructor(inputCount,outputCount) {
    this.inputs = new Array(inputCount)
    this.outputs = new Array(outputCount)
    this.biases = new Array(outputCount)

    this.weights = []
    for(let i = 0;i<inputCount;i++){
      this.weights[i] = new Array(outputCount)
    }

    Level.#randomize(this)
  }

  static #randomize(level){
    for(let i = 0;i<level.inputs.length;i++){
      for(let j = 0;j<level.outputs.length;j++){
        level.weights[i][j] = Math.random() * 2 - 1 // Random value between -1 and 1
      }
    }

    for(let i = 0;i<level.outputs.length;i++){
      level.biases[i] = Math.random() * 2 - 1 // Random value between -1 and 1
    }
  }

  static feedForward(givenInputs,level){
    for(let i = 0;i<level.inputs.length;i++){
      level.inputs[i] = givenInputs[i]
    }

    for (let i = 0;i<level.outputs.length;i++){
      let sum = 0
      for(let j = 0;j<level.inputs.length;j++){
        sum += level.inputs[j] * level.weights[j][i]
      }
      if(sum > level.biases[i]){
        level.outputs[i] = 1 // Activation function (e.g., step function)
      }else {
        level.outputs[i] = 0
      }
    }
    return level.outputs
  }
}