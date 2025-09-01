import { link } from "fs";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Contact", link: "#contact" },
];

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
];

export const projects = [
  {
    id: 1,
    title: "Wordle Solver",
    des: "Guess the hidden word in limited tries! Use Help for smart hints anytime.",
    img: "/Wordle.png",
    iconLists: ["/re.svg", "/ts.svg"],
    href: "https://wordlsolver.netlify.app/"
  },
  {
    id: 2,
    title: "Calorie Calculator",
    des: "Track your daily calorie needs! Enter your height, weight, and body fat for a personalized estimate.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/ts.svg"],
    href: "https://calorie-calculator-blush.vercel.app/"
  }
//   {
//     id: 3,
//     title: "AI Image SaaS - Canva Application",
//     des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
//     img: "/p3.svg",
//     iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
//     link: "/ui.aiimg.com",
//   },
//   {
//     id: 4,
//     title: "Animated Apple Iphone 3D Website",
//     des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
//     img: "/p4.svg",
//     iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
//     link: "/ui.apple.com",
//   },
];

export const workExperience = [
  {
    id: 1,
    title: "Klemsan Elektrik Elektronik | IT",
    desc: "I actively took part in the management and development of IT infrastructure. By providing user support services, I delivered fast and effective solutions to the technological needs of employees. I monitored system performance and collaborated within the team to improve the efficiency of project processes.",
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Sade Labs | Computer Programmer",
    desc: "Optimization with the sensors provided for the automotive factory and the software of these sensors working in the field. Working in the field of graphic design.",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp2.svg",
  },
  {
    id: 3,
    title: "RMA Elektrik Elektronik | Voluntary Internship",
    desc: "• Notebook, LCD, TV, monitor, tablet, PC, projector, maintenance and repair of industrial automation devices. Creating a transaction record",
    className: "md:col-span-2", // change to md:col-span-2
    thumbnail: "/exp3.svg",
  }
];

export const socialMedia = [
  {
    id: 1,
    img: "/git.svg",
    link: "https://github.com/EgehanKorkmaz"
  },
  {
    id: 2,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/egehan-korkmaz/"
  },
];
