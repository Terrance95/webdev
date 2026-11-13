export const IPL_MATCHES = [
  {
    id: "csk-mi-che",
    teams: "CSK vs MI",
    team1: { name: "Chennai Super Kings", short: "CSK", color: "#f9cd05", textDark: true },
    team2: { name: "Mumbai Indians", short: "MI", color: "#004ba0", textDark: false },
    venue: "M. A. Chidambaram Stadium",
    city: "Chennai",
    date: "29 April 2027",
    time: "7:30 PM IST",
    matchType: "El Clásico of IPL",
    status: "Selling Fast",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Loud crowd, great pitch angle" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Pavilion view, complimentary snack box" },
    ],
  },
  {
    id: "rcb-kkr-blr",
    teams: "RCB vs KKR",
    team1: { name: "Royal Challengers Bengaluru", short: "RCB", color: "#d71920", textDark: false },
    team2: { name: "Kolkata Knight Riders", short: "KKR", color: "#3a225d", textDark: false },
    venue: "M. Chinnaswamy Stadium",
    city: "Bengaluru",
    date: "02 May 2027",
    time: "7:30 PM IST",
    matchType: "High Octane Rivalry",
    status: "Filling Fast",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "High energy, boundary line view" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Grandstand seating, beverage voucher" },
    ],
  },
  {
    id: "mi-rcb-mum",
    teams: "MI vs RCB",
    team1: { name: "Mumbai Indians", short: "MI", color: "#004ba0", textDark: false },
    team2: { name: "Royal Challengers Bengaluru", short: "RCB", color: "#d71920", textDark: false },
    venue: "Wankhede Stadium",
    city: "Mumbai",
    date: "06 May 2027",
    time: "7:30 PM IST",
    matchType: "Mega Blockbuster",
    status: "Hot Fixture",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Iconic ocean breeze, electric crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Sunken pavilion, fast-track gate entry" },
    ],
  },
  {
    id: "gt-rr-ahm",
    teams: "GT vs RR",
    team1: { name: "Gujarat Titans", short: "GT", color: "#1c2c52", textDark: false },
    team2: { name: "Rajasthan Royals", short: "RR", color: "#ea1a85", textDark: false },
    venue: "Narendra Modi Stadium",
    city: "Ahmedabad",
    date: "10 May 2027",
    time: "7:30 PM IST",
    matchType: "Title Contenders Battle",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Massive 100K arena atmosphere" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Level 2 club terrace, parking pass" },
    ],
  },
  {
    id: "srh-dc-hyd",
    teams: "SRH vs DC",
    team1: { name: "Sunrisers Hyderabad", short: "SRH", color: "#f26522", textDark: false },
    team2: { name: "Delhi Capitals", short: "DC", color: "#0078bc", textDark: false },
    venue: "Rajiv Gandhi Intl Stadium",
    city: "Hyderabad",
    date: "14 May 2027",
    time: "3:30 PM IST",
    matchType: "Afternoon Showdown",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Canopy shade, sixes hitting zone" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Air-cooled pavilion, hospitality kit" },
    ],
  },
  {
    id: "lsg-pbks-lko",
    teams: "LSG vs PBKS",
    team1: { name: "Lucknow Super Giants", short: "LSG", color: "#0057b8", textDark: false },
    team2: { name: "Punjab Kings", short: "PBKS", color: "#dd1f2d", textDark: false },
    venue: "BRSABV Ekana Stadium",
    city: "Lucknow",
    date: "18 May 2027",
    time: "7:30 PM IST",
    matchType: "Northern Derby",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Mid-wicket view, family section" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Club lounge access, priority exit" },
    ],
  },

  // Additional 20 dummy fixtures
  {
    id: "match-7",
    teams: "CSK vs RCB",
    team1: { name: "Chennai Super Kings", short: "CSK", color: "#f9cd05", textDark: true },
    team2: { name: "Royal Challengers Bengaluru", short: "RCB", color: "#d71920", textDark: false },
    venue: "M. A. Chidambaram Stadium",
    city: "Chennai",
    date: "22 May 2027",
    time: "7:30 PM IST",
    matchType: "Exciting Clash",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Loud crowd, great pitch angle" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Pavilion view, complimentary snack box" }
    ]
  },
  {
    id: "match-8",
    teams: "MI vs KKR",
    team1: { name: "Mumbai Indians", short: "MI", color: "#004ba0", textDark: false },
    team2: { name: "Kolkata Knight Riders", short: "KKR", color: "#3a225d", textDark: false },
    venue: "Wankhede Stadium",
    city: "Mumbai",
    date: "25 May 2027",
    time: "7:30 PM IST",
    matchType: "High Octane Rivalry",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "High energy, boundary line view" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Grandstand seating, beverage voucher" }
    ]
  },
  {
    id: "match-9",
    teams: "RR vs SRH",
    team1: { name: "Rajasthan Royals", short: "RR", color: "#ea1a85", textDark: false },
    team2: { name: "Sunrisers Hyderabad", short: "SRH", color: "#f26522", textDark: false },
    venue: "M. Chinnaswamy Stadium",
    city: "Bengaluru",
    date: "28 May 2027",
    time: "7:30 PM IST",
    matchType: "Rivalry Derby",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Crowd energy, good view" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Pavilion view, snack box" }
    ]
  },
  {
    id: "match-10",
    teams: "DC vs GT",
    team1: { name: "Delhi Capitals", short: "DC", color: "#0078bc", textDark: false },
    team2: { name: "Gujarat Titans", short: "GT", color: "#1c2c52", textDark: false },
    venue: "Rajiv Gandhi Intl Stadium",
    city: "Hyderabad",
    date: "31 May 2027",
    time: "7:30 PM IST",
    matchType: "Championship Showdown",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Vibrant crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Premium view" }
    ]
  },
  {
    id: "match-11",
    teams: "PBKS vs LSG",
    team1: { name: "Punjab Kings", short: "PBKS", color: "#dd1f2d", textDark: false },
    team2: { name: "Lucknow Super Giants", short: "LSG", color: "#0057b8", textDark: false },
    venue: "BRSABV Ekana Stadium",
    city: "Lucknow",
    date: "03 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Northern Derby",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Family sections" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Club lounge" }
    ]
  },
  {
    id: "match-12",
    teams: "CSK vs MI",
    team1: { name: "Chennai Super Kings", short: "CSK", color: "#f9cd05", textDark: true },
    team2: { name: "Mumbai Indians", short: "MI", color: "#004ba0", textDark: false },
    venue: "M. A. Chidambaram Stadium",
    city: "Chennai",
    date: "06 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Classic",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Premium" }
    ]
  },
  {
    id: "match-13",
    teams: "RCB vs SRH",
    team1: { name: "Royal Challengers Bengaluru", short: "RCB", color: "#d71920", textDark: false },
    team2: { name: "Sunrisers Hyderabad", short: "SRH", color: "#f26522", textDark: false },
    venue: "M. Chinnaswamy Stadium",
    city: "Bengaluru",
    date: "09 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Rivalry",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Energy" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "View" }
    ]
  },
  {
    id: "match-14",
    teams: "KKR vs GT",
    team1: { name: "Kolkata Knight Riders", short: "KKR", color: "#3a225d", textDark: false },
    team2: { name: "Gujarat Titans", short: "GT", color: "#1c2c52", textDark: false },
    venue: "Eden Gardens",
    city: "Kolkata",
    date: "12 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Clash",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Premium" }
    ]
  },
  {
    id: "match-15",
    teams: "DC vs LSG",
    team1: { name: "Delhi Capitals", short: "DC", color: "#0078bc", textDark: false },
    team2: { name: "Lucknow Super Giants", short: "LSG", color: "#0057b8", textDark: false },
    venue: "Feroz Shah Kotla",
    city: "Delhi",
    date: "15 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Showdown",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Energy" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "View" }
    ]
  },
  {
    id: "match-16",
    teams: "PBKS vs SRH",
    team1: { name: "Punjab Kings", short: "PBKS", color: "#dd1f2d", textDark: false },
    team2: { name: "Sunrisers Hyderabad", short: "SRH", color: "#f26522", textDark: false },
    venue: "Punjab Cricket Association Stadium",
    city: "Mohali",
    date: "18 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Derby",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Premium" }
    ]
  },
  {
    id: "match-17",
    teams: "RR vs DC",
    team1: { name: "Rajasthan Royals", short: "RR", color: "#ea1a85", textDark: false },
    team2: { name: "Delhi Capitals", short: "DC", color: "#0078bc", textDark: false },
    venue: "Rajiv Gandhi Intl Stadium",
    city: "Hyderabad",
    date: "21 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Clash",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Energy" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "View" }
    ]
  },
  {
    id: "match-18",
    teams: "MI vs LSG",
    team1: { name: "Mumbai Indians", short: "MI", color: "#004ba0", textDark: false },
    team2: { name: "Lucknow Super Giants", short: "LSG", color: "#0057b8", textDark: false },
    venue: "Wankhede Stadium",
    city: "Mumbai",
    date: "24 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Exciting", 
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Premium" }
    ]
  },
  {
    id: "match-19",
    teams: "GT vs RCB",
    team1: { name: "Gujarat Titans", short: "GT", color: "#1c2c52", textDark: false },
    team2: { name: "Royal Challengers Bengaluru", short: "RCB", color: "#d71920", textDark: false },
    venue: "Narendra Modi Stadium",
    city: "Ahmedabad",
    date: "27 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Showdown",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Energy" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "View" }
    ]
  },
  {
    id: "match-20",
    teams: "SRH vs KKR",
    team1: { name: "Sunrisers Hyderabad", short: "SRH", color: "#f26522", textDark: false },
    team2: { name: "Kolkata Knight Riders", short: "KKR", color: "#3a225d", textDark: false },
    venue: "Rajiv Gandhi Intl Stadium",
    city: "Hyderabad",
    date: "30 Jun 2027",
    time: "7:30 PM IST",
    matchType: "Rivalry",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Premium" }
    ]
  },
  {
    id: "match-21",
    teams: "RR vs PBKS",
    team1: { name: "Rajasthan Royals", short: "RR", color: "#ea1a85", textDark: false },
    team2: { name: "Punjab Kings", short: "PBKS", color: "#dd1f2d", textDark: false },
    venue: "M. Chinnaswamy Stadium",
    city: "Bengaluru",
    date: "03 Jul 2027",
    time: "7:30 PM IST",
    matchType: "Derby",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Energy" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "View" }
    ]
  },
  {
    id: "match-22",
    teams: "DC vs PBKS",
    team1: { name: "Delhi Capitals", short: "DC", color: "#0078bc", textDark: false },
    team2: { name: "Punjab Kings", short: "PBKS", color: "#dd1f2d", textDark: false },
    venue: "Feroz Shah Kotla",
    city: "Delhi",
    date: "06 Jul 2027",
    time: "7:30 PM IST",
    matchType: "Showdown",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Premium" }
    ]
  },
  {
    id: "match-23",
    teams: "CSK vs GT",
    team1: { name: "Chennai Super Kings", short: "CSK", color: "#f9cd05", textDark: true },
    team2: { name: "Gujarat Titans", short: "GT", color: "#1c2c52", textDark: false },
    venue: "M. A. Chidambaram Stadium",
    city: "Chennai",
    date: "09 Jul 2027",
    time: "7:30 PM IST",
    matchType: "Clash",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Energy" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "View" }
    ]
  },
  {
    id: "match-24",
    teams: "RCB vs DC",
    team1: { name: "Royal Challengers Bengaluru", short: "RCB", color: "#d71920", textDark: false },
    team2: { name: "Delhi Capitals", short: "DC", color: "#0078bc", textDark: false },
    venue: "M. Chinnaswamy Stadium",
    city: "Bengaluru",
    date: "12 Jul 2027",
    time: "7:30 PM IST",
    matchType: "Derby",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Premium" }
    ]
  },
  {
    id: "match-25",
    teams: "MI vs PBKS",
    team1: { name: "Mumbai Indians", short: "MI", color: "#004ba0", textDark: false },
    team2: { name: "Punjab Kings", short: "PBKS", color: "#dd1f2d", textDark: false },
    venue: "Wankhede Stadium",
    city: "Mumbai",
    date: "15 Jul 2027",
    time: "7:30 PM IST",
    matchType: "Exciting",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Energy" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "View" }
    ]
  },
  {
    id: "match-26",
    teams: "KKR vs LSG",
    team1: { name: "Kolkata Knight Riders", short: "KKR", color: "#3a225d", textDark: false },
    team2: { name: "Lucknow Super Giants", short: "LSG", color: "#0057b8", textDark: false },
    venue: "Eden Gardens",
    city: "Kolkata",
    date: "18 Jul 2027",
    time: "7:30 PM IST",
    matchType: "Derby",
    status: "Available",
    stands: [
      { id: "general", name: "General Stand", price: 1200, perks: "Crowd" },
      { id: "vip", name: "VIP Stand", price: 5000, perks: "Premium" }
    ]
  }
];

export const STAND_PRICES = {
  "General Stand": 1200,
  "VIP Stand": 5000,
};
