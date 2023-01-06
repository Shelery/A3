/*
 * Assignment 3: Functional Prototype
 * ----------------------------------
 * Programming 2022, Interaction Design Bacherlor, Malmö University
 *
 * This assignment is written by:
 * Name Surname
 *
 *
 * The template contains some sample code exemplifying the template code structure.
 * You should use the structure with `state`, `settings`, `setup` and `loop`.
 * `scale` and `toAbsolute` are very helpful in data processing.
 *
 * For instructions, see the Canvas assignment: https://mau.instructure.com/courses/11936/assignments/84965
 * You might want to look at the Assignment examples for more elaborate starting points.
 *
 */

// The state should contain all the "moving" parts of your program, values that change.
let state = Object.freeze({
  latestKey: undefined,
  message: ""
  /*   growing: false,
  fontWeight: 100, */
});

// The settings object contains all of the "fixed" parts of your sketch,
// like static HTMLElements, paramaters or thresholds.
const settings = Object.freeze({
  textElement: document.querySelector("#text-input"),
});

/**
 * Update the state object with the properties included in `newState`.
 * @param {Object} newState An object with the properties to update in the state object.
 */
function updateState(newState) {
  state = Object.freeze({ ...state, ...newState });
}

/**
 * Return `num` normalized to 0..1 in range min..max.
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns number
 */
/* function scale(num, min, max) {
    if (num < min) return 0;
    if (num > max) return 1;
    return (num - min) / (max - min);
} */

/**
 * Return `num` transformed from the normalised 0..1 form back to the min..max form.
 * @param {number} num
 * @param {number} min
 * @param {number} max
 * @returns number
 */
/* function toAbsolute(num, min, max) {
    if (num < 0) return min;
    if (num > 1) return max;
    return (num * (max - min)) + min;
} */

/**
 * This is where we put the code that transforms and outputs our data.
 * loop() is run every frame, assuming that we keep calling it with `window.requestAnimationFrame`.
 */
function loop() {
  /*     const { key, growing, fontWeight } = state;
    const { textElement, growthFactor } = settings;
    
    if (key) {
        textElement.innerHTML = `The latest key pressed was ${key.code} producing an ${key.key}. It was pressed ${Math.floor(key.pressed)}ms after opening the page.`;
    }

    if (growing) {
        updateState({ fontWeight: fontWeight + growthFactor });
    } else {
        updateState({ fontWeight: fontWeight - growthFactor });
    }

    if (fontWeight === 900) {
        updateState({ growing: false });
    } else if (fontWeight === 100) {
        updateState({ growing: true });
    }

    textElement.style.fontWeight = `${fontWeight}`; */
  /*  const { textElement } = settings;
  switch (state.feeling) {
    case "neutral":
      textElement.style.textDecoration = "none";
      
      break;
    case "friends":
      textElement.style.fontVariationSettings = '"CASL" .5, "slnt" -15';
      
      break;
    case "take the hint, dumbass":
      break;
    case "let's fuck":
      break;
    case "i'm drunk":
      break;
    case "incorrect":
      textElement.style.textDecoration = "line-through";
      
      break;
  } */
  window.requestAnimationFrame(loop);
  /* window.requestAnimationFrame(loop); */
}

/**
 * Setup is run once, at the start of the program. It sets everything up for us!
 */
function setup() {
  const { textElement } = settings;

  textElement.maxLength = 7;
  /* const { latestKey, message } = state; */
  textElement.addEventListener("keyup", function (e) {
    if (state.message.length === 7 && e.key !== "Backspace"){return}
    
    // Delete last character from message when hit Backspace
    if (e.key === "Backspace") {
      updateState({
        message: state.message.substring(0, state.message.length - 1),
        
      })
    } else {
      // Add character to message
      updateState({ latestKey: e.key });
      updateState({ message: state.message + state.latestKey });
    }

    console.log(state.message);

    switch (state.message) {
      case "":
      case "h":
      case "he":
        textElement.className = "";
        textElement.style.textDecoration = "none";
        
        textElement.style.fontVariationSetting =
         '"CASL"0, "wght" 500, "slnt" 0, "CRSV" 0';
        break;
      case "hey":
        textElement.className = "";
        textElement.style.textDecoration = "none";

        textElement.style.fontVariationSettings = '"CASL" .5, "slnt" -15';
        textElement.classList = "friends";
        break;
      case "heyy":
        textElement.className = "";
        textElement.style.textDecoration = "none";

        textElement.classList = "i-think-i-like-you";
        textElement.style.fontVariationSettings =
          '"CASL" 1, "slnt" 0, "wght" 300';
        updateState({ feeling: "i think i like you" });
        break;
      case "heyyy":
        textElement.className = "";
        textElement.style.textDecoration = "none";

        textElement.classList = "i-think-i-like-you";
        textElement.style.fontVariationSettings =
          '"CASL" 1, "slnt" 0, "wght" 900';
        updateState({ feeling: "take the hint, dumbass" });
        break;
      case "heyyyy":
        textElement.className = "";
        textElement.style.textDecoration = "none";

        textElement.classList = "lets-fuck";
        textElement.style.fontVariationSettings = '"CASL" 1, "CRSV" 1';
        
        break;
      case "heyyyyy":
        textElement.className = "";
        textElement.style.textDecoration = "none";

        textElement.classList = "im-drunk";
        break;
      default:
        textElement.style.textDecoration = "line-through";
        textElement.style.fontVariationSetting =
          '"CASL"0, "wght" 500, "slnt" 0, "CRSV" 0';
    }
  });

  // updateState feeling
  /*     document.addEventListener("keydown", function (event) {
        updateState({
            key: {
                code: event.code,
                key: event.key,
                pressed: performance.now()
            }
        });
    });

    document.addEventListener("keyup", function (event) {
        // Nothing!
    }); */

  loop();
}

setup(); // Always remember to call setup()!
