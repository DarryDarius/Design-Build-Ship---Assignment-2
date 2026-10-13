export type Noise = "Quiet" | "Low hum" | "Lively";

export type Spot = {
  id: string;
  name: string;
  where: string;
  address: string;
  walk: number; // minutes from the main quad
  noise: Noise;
  outlets: boolean;
  wifi: boolean;
  open: number; // 24h hour, same every day
  close: number;
  seats: string;
  order: string;
  note: string;
};

// Hours and details are my own notes, not official listings.
export const spots: Spot[] = [
  {
    id: "ex-libris",
    name: "Ex Libris",
    where: "Regenstein Library, ground floor",
    address: "1100 E 57th St",
    walk: 3,
    noise: "Quiet",
    outlets: true,
    wifi: true,
    open: 8,
    close: 23,
    seats: "Long tables, ~60 seats",
    order: "Drip coffee, refill on the way back up",
    note: "The default. Grab a cup, then head upstairs for silence.",
  },
  {
    id: "grounds-of-being",
    name: "Grounds of Being",
    where: "Swift Hall, basement",
    address: "1025 E 58th St",
    walk: 2,
    noise: "Low hum",
    outlets: true,
    wifi: true,
    open: 8,
    close: 17,
    seats: "Couches and small tables",
    order: "Chai latte",
    note: "Feels like a living room. Best before noon.",
  },
  {
    id: "plein-air",
    name: "Plein Air Café",
    where: "Next to the Seminary Co-op",
    address: "5751 S Woodlawn Ave",
    walk: 6,
    noise: "Lively",
    outlets: false,
    wifi: true,
    open: 7,
    close: 19,
    seats: "Bright room, window counter",
    order: "Cortado and a scone",
    note: "For reading, not typing. Few outlets, lots of light.",
  },
  {
    id: "hallowed-grounds",
    name: "Hallowed Grounds",
    where: "Reynolds Club, 2nd floor",
    address: "5706 S University Ave",
    walk: 2,
    noise: "Lively",
    outlets: true,
    wifi: true,
    open: 9,
    close: 24,
    seats: "Booths and a pool table",
    order: "Iced latte",
    note: "Open late. Good for group work, bad for exams.",
  },
  {
    id: "cafe-logan",
    name: "Café Logan",
    where: "Logan Center for the Arts",
    address: "915 E 60th St",
    walk: 9,
    noise: "Low hum",
    outlets: true,
    wifi: true,
    open: 8,
    close: 21,
    seats: "Tall windows, big tables",
    order: "Oat flat white",
    note: "Worth the walk south. Rarely full.",
  },
  {
    id: "istria",
    name: "Istria Café",
    where: "By the 57th St Metra",
    address: "1520 E 57th St",
    walk: 14,
    noise: "Lively",
    outlets: false,
    wifi: true,
    open: 7,
    close: 18,
    seats: "Small, a few window seats",
    order: "Espresso and gelato",
    note: "A treat stop, not a study stop.",
  },
  {
    id: "medici",
    name: "Medici on 57th",
    where: "57th Street, east of campus",
    address: "1327 E 57th St",
    walk: 8,
    noise: "Lively",
    outlets: false,
    wifi: true,
    open: 8,
    close: 21,
    seats: "Carved-up wooden booths",
    order: "Hot chocolate",
    note: "Come for the booths and the history, leave the laptop.",
  },
  {
    id: "robust",
    name: "Robust Coffee Lounge",
    where: "Woodlawn, south of the Midway",
    address: "6300 S Woodlawn Ave",
    walk: 15,
    noise: "Quiet",
    outlets: true,
    wifi: true,
    open: 7,
    close: 18,
    seats: "Armchairs and a big communal table",
    order: "Honey lavender latte",
    note: "Calm, roomy, and never a fight for an outlet.",
  },
];

export function formatHour(h: number) {
  if (h === 0 || h === 24) return "midnight";
  if (h === 12) return "noon";
  return h < 12 ? `${h} am` : `${h - 12} pm`;
}

export function isOpenAt(spot: Spot, hour: number) {
  return hour >= spot.open && hour < spot.close;
}
