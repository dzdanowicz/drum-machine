# Drum Machine

Drum Machine allows you to play sounds with your keyboard or mouse. You can use existing sound sets or create your own.

## How to create a sound set?

1. Open the `sets.js` file
2. Go to the last set closing bracket
3. Put this pattern after located in step 2 closing bracket:

```
  {
    title: "Name for your sound set",
    sounds: {
      Q: {
        name: "Name for a sound on Q pad",
        path: "Path to a sound on Q pad",
      },
      W: {
        name: "Name for a sound on W pad",
        path: "Path to a sound on W pad",
      },
      E: {
        name: "Name for a sound on E pad",
        path: "Path to a sound on E pad",
      },
      A: {
        name: "Name for a sound on A pad",
        path: "Path to a sound on A pad",
      },
      S: {
        name: "Name for a sound on S pad",
        path: "Path to a sound on S pad",
      },
      D: {
        name: "Name for a sound on D pad",
        path: "Path to a sound on D pad",
      },
      Z: {
        name: "Name for a sound on Z pad",
        path: "Path to a sound on Z pad",
      },
      X: {
        name: "Name for a sound on X pad",
        path: "Path to a sound on X pad",
      },
      C: {
        name: "Name for a sound on C pad",
        path: "Path to a sound on C pad",
      },
    },
  },
```

3. Put in the pattern name of your sound set, sounds names, and paths to sounds
