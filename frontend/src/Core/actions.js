const actions = {
  Punch: {
    icon: "👊",
    name: "Punch",
  },
  PunchUp: {
    icon: "👆👊",
    name: "Raise Punch",
  },
  PunchDown: {
    icon: "👇👊",
    name: "Lower Punch",
  },
  Block: {
    icon: "🖐️",
    name: "Block",
  },
  BlockUp: {
    icon: "👆🖐️",
    name: "Raise Block",
  },
  BlockDown: {
    icon: "👇🖐️",
    name: "Lower Block",
  },
  Nudge: {
    icon: "",
    name: "Jab",
  },
  NudgeUp: {
    icon: "",
    name: "Hook",
  },
  NudegeDown: {
    icon: "",
    name: "Uppercut",
  },
  Power: {
    icon: "💥",
    name: "Power",
  },
};

const indexActionMap = {
  0: actions.Punch,
  1: actions.PunchUp,
  2: actions.PunchDown,
  3: actions.Block,
  4: actions.BlockUp,
  5: actions.BlockDown,
  6: actions.Nudge,
  7: actions.NudgeUp,
  8: actions.NudegeDown,
  9: actions.Power,
};

export { actions, indexActionMap };
