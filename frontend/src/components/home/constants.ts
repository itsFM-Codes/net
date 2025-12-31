export type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
};

export type Meteor = {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  dx: number;
  dy: number;
};

export type Constellation = {
  stars: { x: number; y: number }[];
  opacity: number;
  speed: number;
  pulseOffset: number;
  pulseDirection: number;
  totalLength: number;
  segmentLengths: number[];
};

export type CursorTrail = {
  id: number;
  x: number;
  y: number;
};

export type NebulaCloud = {
  id: number;
  x: string;
  y: string;
  width: string;
  height: string;
  rotation: number;
  color: string;
  duration: number;
  blur: number;
  opacity: number;
};

export const nebulaClouds: NebulaCloud[] = [
  { id: 1, x: "3%", y: "4%", width: "35vw", height: "2vw", rotation: 35, color: "purple", duration: 60, blur: 55, opacity: 15 },
  { id: 2, x: "55%", y: "8%", width: "22vw", height: "2.5vw", rotation: -15, color: "fuchsia", duration: 40, blur: 30, opacity: 5 },
  { id: 3, x: "25%", y: "15%", width: "28vw", height: "1.5vw", rotation: 50, color: "indigo", duration: 50, blur: 45, opacity: 25 },
  { id: 4, x: "70%", y: "20%", width: "18vw", height: "2vw", rotation: -40, color: "violet", duration: 55, blur: 50, opacity: 18 },
  { id: 5, x: "8%", y: "29%", width: "26vw", height: "3vw", rotation: 10, color: "pink", duration: 38, blur: 28, opacity: 4 },
  { id: 6, x: "60%", y: "35%", width: "40vw", height: "1.5vw", rotation: -60, color: "purple", duration: 65, blur: 60, opacity: 12 },
  { id: 7, x: "35%", y: "43%", width: "20vw", height: "2vw", rotation: 25, color: "indigo", duration: 48, blur: 40, opacity: 30 },
  { id: 8, x: "5%", y: "53%", width: "24vw", height: "2.5vw", rotation: -20, color: "fuchsia", duration: 42, blur: 32, opacity: 30 },
  { id: 9, x: "50%", y: "60%", width: "32vw", height: "1.5vw", rotation: 70, color: "violet", duration: 58, blur: 50, opacity: 20 },
  { id: 10, x: "75%", y: "65%", width: "15vw", height: "2vw", rotation: -25, color: "pink", duration: 70, blur: 65, opacity: 4 },
  { id: 11, x: "20%", y: "70%", width: "30vw", height: "2vw", rotation: -35, color: "purple", duration: 45, blur: 38, opacity: 32 },
  { id: 12, x: "65%", y: "78%", width: "20vw", height: "3vw", rotation: 15, color: "indigo", duration: 36, blur: 25, opacity: 25 },
  { id: 13, x: "10%", y: "85%", width: "38vw", height: "1.5vw", rotation: 80, color: "fuchsia", duration: 62, blur: 55, opacity: 15 },
  { id: 14, x: "40%", y: "93%", width: "25vw", height: "2vw", rotation: -50, color: "violet", duration: 52, blur: 42, opacity: 28 },
];

export const getNebulaColor = (color: string): string => {
  switch (color) {
    case "purple": return "rgb(168, 85, 247)";
    case "fuchsia": return "rgb(217, 70, 239)";
    case "indigo": return "rgb(99, 102, 241)";
    case "violet": return "rgb(139, 92, 246)";
    default: return "rgb(236, 72, 153)";
  }
};
