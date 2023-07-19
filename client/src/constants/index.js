import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
  people01,
  people02,
  people03,
  facebook,
  instagram,
  linkedin,
  twitter,
  airbnb,
  binance,
  coinbase,
  dropbox,
  send,
  shield,
  prasun,
  aleesha,
  sairohan,
  star,
} from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
    route: "/",
  },
  {
    id: "About",
    title: "About Us",
    route: "/about",
  },
  {
    id: "Contact",
    title: "Contact Us",
    route: "/contact",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Donations",
    content:
      "Transfering your money directly to the person in need in no time.",
  },
  {
    id: "feature-2",
    icon: shield,
    title: "100% Secured",
    content:
      "We take proactive steps make sure your information and transactions are secure.",
  },
  {
    id: "feature-3",
    icon: send,
    title: "Campaigns",
    content:
      "Running campaigns to reach as many people to us join in our cause.",
  },
];

export const feedback = [
  {
    id: "feedback-1",
    content:
      " we have woven a vision – a vision that believes in the profound impact of even the tiniest gestures. With unwavering faith, we embrace the power of collective goodness, creating a sanctuary where healing begins and heroes emerge",
    name: "Prasun Mondal",
    title: "Founder & Leader",
    img: prasun,
  },
  {
    id: "feedback-2",
    content:
      "Our community ignites a wildfire of positive change, celebrating compassion, resilience, and transformation. Together, we inspire each other to be the heroes this world craves, threading a tapestry of strength found within vulnerability.",
    name: "Aleesha Lalit",
    title: "Founder & Leader",
    img: aleesha,
  },
  {
    id: "feedback-3",
    content:
      "In the depths of our souls, we carry the seeds of greatness, waiting to bloom and paint the world with colors of courage, kindness, and boundless possibility. United by purpose, we nurture each other's dreams, breathing life into the symphony of our collective triumphs.",
    name: "Sai Rohan",
    title: "Founder & Leader",
    img: sairohan,
  },
];

export const stats = [
  {
    id: "stats-1",
    title: "Active Users",
    value: "300+",
  },
  {
    id: "stats-2",
    title: "Campaigns",
    value: "200+",
  },
  {
    id: "stats-3",
    title: "Donations",
    value: "200+",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Content",
        link: "https://www.hoobank.com/content/",
      },
      {
        name: "How it Works",
        link: "https://www.hoobank.com/how-it-works/",
      },
      {
        name: "Create",
        link: "https://www.hoobank.com/create/",
      },
      {
        name: "Explore",
        link: "https://www.hoobank.com/explore/",
      },
      {
        name: "Terms & Services",
        link: "https://www.hoobank.com/terms-and-services/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      {
        name: "Help Center",
        link: "https://www.hoobank.com/help-center/",
      },
      {
        name: "Partners",
        link: "https://www.hoobank.com/partners/",
      },
      {
        name: "Suggestions",
        link: "https://www.hoobank.com/suggestions/",
      },
      {
        name: "Blog",
        link: "https://www.hoobank.com/blog/",
      },
      {
        name: "Newsletters",
        link: "https://www.hoobank.com/newsletters/",
      },
    ],
  },
  {
    title: "Partner",
    links: [
      {
        name: "Our Partner",
        link: "https://www.hoobank.com/our-partner/",
      },
      {
        name: "Become a Partner",
        link: "https://www.hoobank.com/become-a-partner/",
      },
    ],
  },
];

export const socialMedia = [
  {
    id: "social-media-1",
    icon: instagram,
    link: "https://www.instagram.com/rotaractiiitm/",
  },
  {
    id: "social-media-4",
    icon: linkedin,
    link: "https://www.linkedin.com/company/rotaract-club-abv-iiitm/",
  },
];

export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];

export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/home",
    done: "false",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
    done: "false",
  },
  // {
  //   name: "payment",
  //   imgUrl: payment,
  //   link: "/",
  //   disabled: true,
  // },
  // {
  //   name: "withdraw",
  //   imgUrl: withdraw,
  //   link: "/",
  //   disabled: true,
  // },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
    done: "false",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    done: "true",
  },
];
