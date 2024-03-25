// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  // console.log(newStrand);
  return newStrand;
};

const pAequorFactory = (number, basesArray) => {
  return {
    specimenNum: number,
    dna: basesArray,
    mutate() {
        const currentBase = Math.floor(Math.random() * this.dna.length);
        const dnaBases = ['A', 'T', 'C', 'G'];
        let newBases = dnaBases.filter(base => base !== this.dna[currentBase]);
        // console.log(this.dna + ' /// ' + newBases);
        this.dna[currentBase] = newBases[Math.floor(Math.random() * newBases.length)];
        // console.log(this.dna + ' /// ' + newBases);
      },
    compareDNA(pAequor) {
      let identicalCounter = 0;
      let differentCounter = 0;
      for(let i = 0; i < this.dna.length; i++) {
        (this.dna[i] === pAequor.dna[i]) ? identicalCounter++ : differentCounter++;
      }
      let differencePercent = identicalCounter / this.dna.length * 100;
      // console.log(`specimen ${this.specimenNum} and specimen ${pAequor.specimenNum} have ${differencePercent.toFixed(1)}% DNA in common`);
      return differencePercent;
    },
    willLikelySurvive() {
      let containsCounter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        (this.dna[i] === 'C' || this.dna[i] === 'G') ? containsCounter++ : null;
      }
      let differencePercent = containsCounter / this.dna.length * 100;
      // console.log(containsCounter);
      return differencePercent >= 60; 
    },
    complementStrand() {
      let complement = [];
      for(let i = 0; i < this.dna.length; i++) {
        switch(this.dna[i]) {
          case 'A': 
            complement.push('T');
            break;
          case 'T':
            complement.push('A');
            break;
          case 'C':
            complement.push('G');
            break;
          case 'G':
            complement.push('C');
            break;
        };
      };
      return complement;
    }
  }
}; 

const setup30pAequor = () => {
  let pAequorArray = [];
  let i = 1;
  while (i <= 30) {
    let object = pAequorFactory(i, mockUpStrand());
    if (object.willLikelySurvive()) {
      pAequorArray.push(object);
      i++;
    };
  };
  return pAequorArray;
}

// console.log(setup30pAequor());
// setup30pAequor();

const checkComplement = () => {
  let first = pAequorFactory(0, mockUpStrand());
  console.log(first);
  console.log(first.complementStrand());
}

const mostEqual = (arrayOfDNA) => {
  let newArray = arrayOfDNA();
  let firstDNA = [];
  let secondDNA = [];
  let biggestPercent = 0;
  for (i = 0; i < newArray.length; i++) {
    for (j = i + 1; j < newArray.length; j++) {
      if (newArray[i].compareDNA(newArray[j]) > biggestPercent) {
        firstDNA = newArray[i].dna;
        secondDNA = newArray[j].dna;
        biggestPercent = newArray[i].compareDNA(newArray[j]);
      }
    }
  };
  console.log(`The most related pair of DNA's is ${firstDNA} and ${secondDNA} with ${biggestPercent.toFixed(1)}% similarity rate!`)
}

mostEqual(setup30pAequor);