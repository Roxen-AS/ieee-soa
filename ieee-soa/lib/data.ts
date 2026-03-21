// ── IEEE SOA — All site content. Edit here only. ──

export const SITE = {
  name: "IEEE SOA Student Branch",
  university: "Siksha 'O' Anusandhan University",
  location: "Khandagiri, Bhubaneswar — 751030, Odisha, India",
  email: "ieeesoa.sb@soa.ac.in",
  social: "@IEEESOAStudentBranch",
  branchNumber: "#STB-XXXXX",
  established: "2015",
  region: "IEEE Region 10",
};

export const DOMAINS = [
  { code:"CS — 01", title:"Computer Society",      body:"AI, software systems, cybersecurity and computational theory at the edge of the digital frontier.", tip:"IEEE CS Chapter Active" },
  { code:"PE — 02", title:"Power & Energy",         body:"Sustainable power infrastructure, renewable energy systems and smart grid modernisation." },
  { code:"COM — 03", title:"Communications",        body:"5G networks, wireless protocols, signal processing and next-gen communication systems." },
  { code:"RAS — 04", title:"Robotics & Automation", body:"Autonomous systems, intelligent control and industrial automation for tomorrow's machines." },
  { code:"EMB — 05", title:"Biomedical Engineering",body:"Medical devices, biosensors, health informatics and life-science technology intersections." },
  { code:"NTC — 06", title:"Nanotechnology",        body:"Quantum devices, atomic-scale fabrication and materials at the nanometre boundary." },
];

export const FOCUS_AREAS = [
  "Artificial Intelligence & Machine Learning",
  "Embedded Systems & IoT",
  "Cloud & Distributed Computing",
  "Cybersecurity & Network Security",
  "Robotics & Control Systems",
  "Data Science & Analytics",
  "VLSI & Semiconductor Design",
  "Signal & Image Processing",
];

export type EventType = "Workshop" | "Hackathon" | "Seminar" | "Competition";
export interface Event {
  id: number; month: string; day: string; year: string;
  type: EventType; name: string; crux: string;
}
export const EVENTS: Event[] = [
  { id:1, month:"Mar", day:"15", year:"2025", type:"Workshop",    name:"Deep Learning Bootcamp",              crux:"Two-day intensive on neural networks, CNNs and model deployment using PyTorch and TensorFlow with live coding throughout." },
  { id:2, month:"Feb", day:"08", year:"2025", type:"Hackathon",   name:"HackSOA 2.0",                         crux:"36-hour hackathon across AI/ML, Web3 and Sustainable Tech tracks. 80+ participants from 12 colleges across Odisha." },
  { id:3, month:"Jan", day:"22", year:"2025", type:"Seminar",     name:"IEEE Day Celebration 2024",           crux:"Annual celebration of IEEE's founding — keynote by industry experts, poster presentations and leadership felicitation." },
  { id:4, month:"Dec", day:"04", year:"2024", type:"Competition", name:"Circuit Mania — PCB Design Challenge", crux:"Hardware challenge testing PCB layout, analog circuit analysis and microcontroller programming under time pressure." },
];

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  photo: string | null;
  accentColor?: string;
  isFaculty?: boolean;
}

// ── SB TEAM ──
export const SB_FACULTY: TeamMember[] = [
  { initials:"RS", name:"Prof. Renu Sharma",            role:"Counselor", photo:"/team/mam1.png", isFaculty:true, accentColor:"var(--a1)" },
  { initials:"MK", name:"Dr. Manoj Kumar Debnath",      role:"Advisor",   photo:"/team/sir1.png", isFaculty:true, accentColor:"var(--a3)" },
  { initials:"BJ", name:"Dr. Bharat Jyoti Ranjan Sahu", role:"Advisor",   photo:"/team/sir2.png", isFaculty:true, accentColor:"var(--a4)" },
];

export const SB_STUDENTS: TeamMember[] = [
  { initials:"MP", name:"Manish Prakash Sahu", role:"Chairperson",     photo:"/team/9.png",  accentColor:"var(--a1)" },
  { initials:"AM", name:"Arihanta Mishra",     role:"Vice-Chairperson",photo:"/team/8.png",  accentColor:"var(--a3)" },
  { initials:"KR", name:"Khushee Ranjan",      role:"Secretary",       photo:"/team/7.png",  accentColor:"var(--a4)" },
  { initials:"AJ", name:"Akanshya Jena",       role:"Joint-Secretary", photo:"/team/11.png", accentColor:"var(--a2)" },
  { initials:"AP", name:"Ayushmaan Padhi",     role:"Treasurer",       photo:"/team/10.png", accentColor:"var(--a3)" },
  { initials:"AS", name:"Akash Sarangi",       role:"Webmaster",       photo:"/team/6.png",  accentColor:"var(--a4)" },
];

// ── CS TEAM ──
export const CS_FACULTY: TeamMember[] = [
  { initials:"DM", name:"Prof. Debahuti Mishra",         role:"Counselor", photo:"/team/mam2.png", isFaculty:true, accentColor:"var(--a1)" },
  { initials:"MK", name:"Dr. Manoj Kumar Debnath",       role:"Advisor",   photo:"/team/sir1.png", isFaculty:true, accentColor:"var(--a3)" },
  { initials:"BJ", name:"Dr. Bharat Jyoti Ranjan Sahu",  role:"Advisor",   photo:"/team/sir2.png", isFaculty:true, accentColor:"var(--a4)" },
];

export const CS_STUDENTS: TeamMember[] = [
  { initials:"MP", name:"Manish Prakash Sahu", role:"Chairperson",     photo:"/team/9.png",  accentColor:"var(--a1)" },
  { initials:"AM", name:"Arihanta Mishra",     role:"Vice-Chairperson",photo:"/team/8.png",  accentColor:"var(--a3)" },
  { initials:"KR", name:"Khushee Ranjan",      role:"Secretary",       photo:"/team/7.png",  accentColor:"var(--a4)" },
  { initials:"DS", name:"Divyansh Sahu",       role:"Treasurer",       photo:"/team/12.png", accentColor:"var(--a2)" },
  { initials:"AS", name:"Akash Sarangi",       role:"Webmaster",       photo:"/team/6.png",  accentColor:"var(--a3)" },
];

export const CS_MANDATE = [
  { num:"01", title:"Technical Excellence",    body:"Rigorous learning across software, AI, cybersecurity and systems — going far beyond the academic syllabus." },
  { num:"02", title:"Community Building",      body:"A cohort of computing engineers learning through peer review, collaboration and shared real-world projects." },
  { num:"03", title:"Certifications & Growth", body:"Access to IEEE CS publications, certifications and pathways to global computing conferences." },
];
