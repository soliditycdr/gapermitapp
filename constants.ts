import { StateConfig, Question, PricingPlan } from './types';
import { Map, Shield, BarChart3, BookOpen, Smartphone } from 'lucide-react';

export const SUPPORTED_STATES: StateConfig[] = [
  { code: 'GA', name: 'Georgia', agency: 'DDS' },
  { code: 'CA', name: 'California', agency: 'DMV', comingSoon: true },
  { code: 'TX', name: 'Texas', agency: 'DPS', comingSoon: true },
  { code: 'FL', name: 'Florida', agency: 'DHSMV', comingSoon: true },
  { code: 'NY', name: 'New York', agency: 'DMV', comingSoon: true },
];

export const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1615482671125-288251909788?q=80&w=1000&auto=format&fit=crop", 
    alt: "Happy student with car keys showing thumbs up",
    caption: "Ready for the Road"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop",
    alt: "Driving perspective on a clean road",
    caption: "Drive With Confidence"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop",
    alt: "Students studying together happily",
    caption: "Master The Rules"
  }
];

// Questions shuffled to prevent category grouping
export const MOCK_QUESTIONS: Question[] = [
  {
    id: 17,
    text: "When feeling drowsy:",
    options: [
      "Roll down windows",
      "Drink coffee only",
      "Pull over and rest",
      "Speed up"
    ],
    correctIndex: 2,
    category: "Safety & Driver Behavior",
    explanation: "Only resting is safe; drowsy driving is extremely risky."
  },
  {
    id: 3,
    text: "A red circle with a slash over a right arrow means:",
    options: [
      "Right turn allowed",
      "U-turn only",
      "No right turn",
      "Turn left only"
    ],
    correctIndex: 2,
    category: "Road Signs",
    explanation: "The red slash means a prohibition. A right turn is not allowed here.",
    image: "https://www.driversprep.com/wp-content/uploads/2023/02/prohibitory-right-turn.jpg"
  },
  {
    id: 22,
    text: "'Bridge Ices Before Road' means:",
    options: [
      "Bridge smoother",
      "Bridge freezes first",
      "Road ends",
      "Narrow path"
    ],
    correctIndex: 1,
    category: "Environment & Road Surface",
    explanation: "Bridges freeze faster due to cold air flow."
  },
  {
    id: 9,
    text: "The safe following distance is:",
    options: [
      "1 second",
      "2 seconds",
      "3 seconds or more",
      "5 seconds always"
    ],
    correctIndex: 2,
    category: "Road Rules",
    explanation: "The '3-second rule' gives enough reaction time under normal conditions."
  },
  {
    id: 14,
    text: "Penalty for a Super Speeder violation:",
    options: [
      "$50",
      "$100",
      "$200",
      "$500"
    ],
    correctIndex: 2,
    category: "Driving Laws",
    explanation: "75+ mph on 2-lane or 85+ mph anywhere = $200 fine."
  },
  {
    id: 1,
    text: "What does a STOP sign mean?",
    options: [
      "Slow down",
      "Stop completely",
      "Continue if clear",
      "Yield"
    ],
    correctIndex: 1,
    category: "Road Signs",
    explanation: "A red octagon always means STOP. You must come to a full stop before the line/crosswalk.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/STOP_sign.jpg/1200px-STOP_sign.jpg"
  },
  {
    id: 25,
    text: "In fog, you should use:",
    options: [
      "High beams",
      "Low beams",
      "No lights",
      "Speed up"
    ],
    correctIndex: 1,
    category: "Environment & Road Surface",
    explanation: "Low beams reduce glare and improve visibility."
  },
  {
    id: 6,
    text: "When making a right turn on red, you must:",
    options: [
      "Turn immediately",
      "Slow down only",
      "Stop first, then turn if clear",
      "Never turn"
    ],
    correctIndex: 2,
    category: "Road Rules",
    explanation: "Georgia allows right turn on red after a full stop unless signs prohibit it."
  },
  {
    id: 19,
    text: "In heavy rain, use:",
    options: [
      "High beams",
      "Low beams",
      "No lights",
      "Hazard lights only"
    ],
    correctIndex: 1,
    category: "Safety & Driver Behavior",
    explanation: "Low beams improve visibility; high beams reflect off rain."
  },
  {
    id: 11,
    text: "Legal BAC limit in Georgia is:",
    options: [
      "0.03%",
      "0.05%",
      "0.08%",
      "0.10%"
    ],
    correctIndex: 2,
    category: "Driving Laws",
    explanation: "BAC 0.08% or above is considered DUI."
  },
  {
    id: 4,
    text: "A yellow sign with two arrows going opposite directions means:",
    options: [
      "One-way traffic",
      "Freeway ahead",
      "Two-way traffic",
      "Detour"
    ],
    correctIndex: 2,
    category: "Road Signs",
    explanation: "Traffic flows in both directions beyond this point.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/MUTCD_W6-3.svg/1200px-MUTCD_W6-3.svg.png"
  },
  {
    id: 21,
    text: "'Slippery When Wet' means:",
    options: [
      "Normal driving",
      "Road becomes slick",
      "No passing zone",
      "Road closed"
    ],
    correctIndex: 1,
    category: "Environment & Road Surface",
    explanation: "Slow down—tires may lose traction."
  },
  {
    id: 8,
    text: "When a school bus has flashing red lights:",
    options: [
      "Stop only if children cross",
      "Stop in all directions",
      "Slow down",
      "Pass quickly"
    ],
    correctIndex: 1,
    category: "Road Rules",
    explanation: "Red flashing lights mean children are boarding/exiting. Stop completely.",
    image: "https://i.ytimg.com/vi/qY_3bW4g2cQ/maxresdefault.jpg"
  },
  {
    id: 13,
    text: "Move-Over Law requires you to:",
    options: [
      "Stop behind emergency vehicles",
      "Move one lane over or slow down",
      "Honk",
      "Stop always"
    ],
    correctIndex: 1,
    category: "Driving Laws",
    explanation: "Move over one lane OR slow down 10 mph below the limit."
  },
  {
    id: 2,
    text: "A yellow diamond sign with a curved arrow means:",
    options: [
      "Roundabout",
      "Winding road ahead",
      "Narrow bridge",
      "Two-way traffic"
    ],
    correctIndex: 1,
    category: "Road Signs",
    explanation: "This sign alerts you that several curves are ahead.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/MUTCD_W1-2L.svg/600px-MUTCD_W1-2L.svg.png"
  },
  {
    id: 24,
    text: "'Pavement Ends' means:",
    options: [
      "Road becomes gravel",
      "Two-way traffic",
      "Stop sign ahead",
      "Bridge ahead"
    ],
    correctIndex: 0,
    category: "Environment & Road Surface",
    explanation: "Adjust speed when transitioning from pavement to gravel."
  },
  {
    id: 15,
    text: "Seatbelts must be worn by:",
    options: [
      "Drivers only",
      "Front seats only",
      "All occupants",
      "No requirement"
    ],
    correctIndex: 2,
    category: "Driving Laws",
    explanation: "All passengers must wear seatbelts; children under 8 require child seats."
  },
  {
    id: 10,
    text: "At a 4-way stop, who goes first?",
    options: [
      "Fastest vehicle",
      "Vehicle that arrives first",
      "Vehicle on the left",
      "Largest vehicle"
    ],
    correctIndex: 1,
    category: "Road Rules",
    explanation: "If two arrive together, yield to the vehicle on the right."
  },
  {
    id: 20,
    text: "Hydroplaning occurs when:",
    options: [
      "Driving uphill",
      "Tires lose traction on water",
      "Engine overheats",
      "Brakes fail"
    ],
    correctIndex: 1,
    category: "Safety & Driver Behavior",
    explanation: "Reduce speed smoothly to regain control."
  },
  {
    id: 5,
    text: "A 'Deer Crossing' sign means:",
    options: [
      "Animals not allowed",
      "Wildlife may cross",
      "No parking",
      "Zoo nearby"
    ],
    correctIndex: 1,
    category: "Road Signs",
    explanation: "Wild animals may jump across the road suddenly; slow down.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/MUTCD_W11-3.svg/1200px-MUTCD_W11-3.svg.png"
  },
  {
    id: 12,
    text: "Georgia Hands-Free Law means:",
    options: [
      "Hold phone at red lights",
      "Cannot touch/hold phone",
      "Text if slow",
      "Passenger must use phone"
    ],
    correctIndex: 1,
    category: "Driving Laws",
    explanation: "Drivers may not hold, support, or physically use a phone."
  },
  {
    id: 18,
    text: "Aggressive driving includes:",
    options: [
      "Smooth lane change",
      "Tailgating or rude honking",
      "Using signals",
      "Slowing down"
    ],
    correctIndex: 1,
    category: "Safety & Driver Behavior",
    explanation: "These behaviors are dangerous and illegal."
  },
  {
    id: 7,
    text: "When approaching a yield sign, you must:",
    options: [
      "Speed up",
      "Stop always",
      "Slow down and give way",
      "Honk and go"
    ],
    correctIndex: 2,
    category: "Road Rules",
    explanation: "Yield means allow other vehicles to go first.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MUTCD_R1-2.svg/1200px-MUTCD_R1-2.svg.png"
  },
  {
    id: 23,
    text: "'Soft Shoulder' means:",
    options: [
      "Safe to drive on",
      "Road edge is unstable",
      "Highway ending",
      "Passing allowed"
    ],
    correctIndex: 1,
    category: "Environment & Road Surface",
    explanation: "Do not drive on the shoulder; it may collapse."
  },
  {
    id: 16,
    text: "If your car skids:",
    options: [
      "Brake hard",
      "Turn opposite direction",
      "Steer into the skid",
      "Accelerate"
    ],
    correctIndex: 2,
    category: "Safety & Driver Behavior",
    explanation: "Steering into the skid helps regain control."
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Starter Practice',
    price: '$0',
    features: [
      '25 Practice Questions',
      'Basic Score Result',
      'Standard Support'
    ]
  },
  {
    id: 'premium',
    name: 'Exam Mastery',
    price: '$0', // Currently Free
    originalPrice: '$4.99',
    period: '/month',
    recommended: true,
    features: [
      'Unlimited Permit Simulations',
      'AI Weakness Analysis',
      'State-Specific Manual Review',
      'Priority Email Support',
      'Ad-Free Experience'
    ]
  },
  {
    id: 'annual',
    name: 'Family Plan',
    price: '$0', // Currently Free
    originalPrice: '$11.99',
    period: '/year',
    features: [
      'Up to 3 Student Accounts',
      'Progress Tracking Dashboard',
      'All Premium Features',
      'Printable Result Sheets'
    ]
  }
];

export const FEATURES = [
  {
    title: "Founder's Success",
    description: "Built by a pass-achiever who studied the manual, not just cheatsheets.",
    icon: Shield
  },
  {
    title: "5-State Coverage",
    description: "Specialized rule sets for GA, CA, TX, FL, and NY.",
    icon: Map
  },
  {
    title: "Data-Driven Learning",
    description: "Our dashboard pinpoints your exact weaknesses so you study smarter.",
    icon: BarChart3
  }
];