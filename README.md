# pitch-detection

With [ml5.js](https://github.com/ml5js/ml5-library), [p5.js](https://p5js.org/) using [CREPE](https://github.com/marl/crepe)

Most of it copied from here: https://github.com/ml5js/ml5-examples/tree/master/p5js/PitchDetection

Regular CRA-app with Typescript.

Currently there is a bug in p5-typings so to fix it run this after installing this: `rm node_modules/p5/lib/p5.d.ts`
which doesn't even help, ha! Instead add all the constants to the p5.d.ts and then manually fix SoundFile's constructor and amp-method. Hmm.