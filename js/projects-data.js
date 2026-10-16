// Central place to edit project content. Each project becomes one row in
// the Work list on the home page and one detail page. The list order here
// is the order on the site.
const PROJECTS = [
  {
    slug: "clodo",
    title: "Clodo AI (YC)",
    role: "Backed by Y Combinator — planet scale people sourcing",
    meta: "#1 Growth",
    // Numbered sections: an optional heading, a row of images (max 2 per
    // row), then a shared caption below the whole row.
    sections: [
      {
        images: ["assets/clodo-1.png", "assets/clodo-2.png"],
        text: [
          "Created Founder-Led content on LinkedIn for <a class=\"inline-link\" href=\"https://www.linkedin.com/in/sidharthrajaram/\" target=\"_blank\" rel=\"noopener noreferrer\">@Sidrajaram</a> and <a class=\"inline-link\" href=\"https://www.linkedin.com/in/rithvikchuppala/\" target=\"_blank\" rel=\"noopener noreferrer\">@RithvikChuppala</a>, growing from 0 to 2M+ impressions and 0 to $40k revenue."
        ]
      }
    ]
  },
  {
    slug: "girlsintovc",
    title: "Girls into VC",
    role: "Closing the gender gap in venture capital",
    meta: "Regional Lead",
    videos: [
      {
        thumbnail: "assets/girlsintovc-photo-1.jpg",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7467707389861928960/",
        text: [
          "A16z Boston Tech Week Hackathon.",
          "Partnered with Lovable & Silicon Valley Bank, 100+ signups via socials."
        ]
      },
      {
        thumbnail: "assets/girlsintovc-photo-3.jpg",
        url: "https://www.instagram.com/reels/DbL_dWmSLYs/",
        text: [
          "Creating content for community sign-ups",
          "12k+ views, 4% conversion rate."
        ]
      }
    ]
  },
  {
    slug: "whoop",
    title: "WHOOP",
    // Optional project-page header: heading, small label, one-line tagline.
    heading: "Whoop X Mass AI Coalition",
    kicker: "Community Campaign",
    tagline: "Retaining Boston's top talent in Mass",
    role: "Wearable fitness and health platform",
    meta: "Community campaign",
    // Full-width horizontal photo, clickable.
    photos: [
      {
        image: "assets/whoop.jpg",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7473116035550736384/"
      }
    ]
  },
  {
    slug: "gamma",
    title: "GAMMA",
    heading: "Gamma",
    tagline: "Vibe coding Hackathon: 3 Perspectives on creativity and communication with AI",
    role: "AI powered presentations",
    meta: "Campaign",
    photos: [
      {
        image: "assets/gamma.jpg",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7478933854884425728/"
      }
    ]
  },
  {
    slug: "sunrooof",
    title: "SUNROOOF",
    role: "Patented wellness lighting technology",
    meta: "Brand Marketing Intern",
    // Each entry is a clickable thumbnail (opens the Instagram Reel in a
    // new tab) paired with its own `text` paragraph(s), rendered right
    // next to it in a shared grid row.
    videos: [
      {
        thumbnail: "assets/sunrooof-reel-1.jpg",
        url: "https://www.instagram.com/reel/Dbx7BBmJCUR/",
        text: [
          "<strong>#1 Founder-led storytelling:</strong> We have spent decades improving artificial light, but our bodies evolved to require natural light."
        ]
      },
      {
        thumbnail: "assets/sunrooof-reel-2.jpg",
        url: "https://www.instagram.com/p/DWBnBYdkSQD/",
        text: [
          "<strong>#2 Celebrity Collaboration:</strong> Building social proof through Bollywood actress Shilpa Shetty."
        ]
      }
    ]
  }
];
