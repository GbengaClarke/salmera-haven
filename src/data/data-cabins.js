import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/public/room-pictures/`;

// ("https://cpdwazwtvjpogpwizqis.supabase.co/storage/v1/object/public/rooms-pictures/cabin-001.jpg");

// export const cabins = [
//   {
//     name: "001",
//     maxCapacity: 2,
//     regularPrice: 250,
//     discount: 0,
//     image: imageUrl + "cabin-001.jpg",
//     description:
//       "Experience the height of architectural serenity in Suite 101. Designed for those who appreciate the intersection of raw nature and refined luxury, this sanctuary features floor-to-ceiling glass walls that invite the forest inside. Bathe in natural light across custom marble surfaces, then retreat to the bespoke California King wrapped in 1,000-thread-count Egyptian cotton. As evening falls, the integrated smart-ambient lighting and private infinity pool offer a seamless transition into a night of absolute tranquility.",
//   },
//   {
//     name: "002",
//     maxCapacity: 2,
//     regularPrice: 350,
//     discount: 25,
//     image: imageUrl + "cabin-002.jpg",
//     description:
//       "Surrender to the modern elegance of Suite 002, a masterfully designed pavilion where refined luxury meets the whispering pines of a private forest. This secluded sanctuary offers an intimate master-suite experience, featuring hand-finished timber interiors, a minimalist stone hearth, and a gourmet kitchen tailored for quiet indulgence. Retreat to the bespoke California King wrapped in fine linens before stepping onto your expansive private deck to unwind in the sunken hot tub under a starlit canopy.",
//   },
//   {
//     name: "003",
//     maxCapacity: 4,
//     regularPrice: 300,
//     discount: 0,
//     image: imageUrl + "cabin-003.jpg",
//     description:
//       "Experience a masterclass in boutique family living within Suite 003. This sophisticated retreat pairs warm, artisanal wood craftsmanship with high-performance modern amenities. The open-plan living area and state-of-the-art kitchen serve as the heart of the suite, while the plush sleeping quarters offer a restful escape for parents and children alike. Unwind on your private terrace, where a luxury hot tub and curated seating area invite you to immerse yourselves in the serene woodland surroundings.",
//   },
//   {
//     name: "004",
//     maxCapacity: 4,
//     regularPrice: 500,
//     discount: 50,
//     image: imageUrl + "cabin-004.jpg",
//     description:
//       "Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
//   },
//   {
//     name: "005",
//     maxCapacity: 6,
//     regularPrice: 350,
//     discount: 0,
//     image: imageUrl + "cabin-005.jpg",
//     description:
//       "Enjoy a comfortable and cozy getaway with your group or family in our spacious cabin 005. Designed to accommodate up to 6 people, this cabin offers a secluded retreat in the heart of nature. Inside, the cabin features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.",
//   },
//   {
//     name: "006",
//     maxCapacity: 6,
//     regularPrice: 800,
//     discount: 100,
//     image: imageUrl + "cabin-006.jpg",
//     description:
//       "Experience the epitome of luxury with your group or family in our spacious wooden cabin 006. Designed to comfortably accommodate up to 6 people, this cabin offers a lavish retreat in the heart of nature. Inside, the cabin features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
//   },
//   {
//     name: "007",
//     maxCapacity: 8,
//     regularPrice: 600,
//     discount: 100,
//     image: imageUrl + "cabin-007.jpg",
//     description:
//       "Accommodate your large group or multiple families in the spacious and grand wooden cabin 007. Designed to comfortably fit up to 8 people, this cabin offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the cabin features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
//   },
//   {
//     name: "008",
//     maxCapacity: 10,
//     regularPrice: 1400,
//     discount: 0,
//     image: imageUrl + "cabin-008.jpg",
//     description:
//       "Experience the epitome of luxury and grandeur with your large group or multiple families in our grand cabin 008. This cabin offers a lavish retreat that caters to all your needs and desires. The cabin features an opulent design and boasts of high-end finishes, intricate details and the finest quality wood throughout. Inside, the cabin features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef's dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
//   },
// ];

export const cabins = [
  {
    name: "001",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image: imageUrl + "cabin-001.jpg",
    description:
      "Experience the height of architectural serenity in Suite 001. Designed for those who appreciate the intersection of raw nature and refined luxury, this sanctuary features floor-to-ceiling glass walls that invite the forest inside. Bathe in natural light across custom marble surfaces, then retreat to the bespoke California King wrapped in 1,000-thread-count Egyptian cotton. As evening falls, the integrated smart-ambient lighting and private infinity pool offer a seamless transition into a night of absolute tranquility.",
  },
  {
    name: "002",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image: imageUrl + "cabin-002.jpg",
    description:
      "Surrender to the modern elegance of Suite 002, a masterfully designed pavilion where refined luxury meets the whispering pines of a private forest. This secluded sanctuary offers an intimate master-suite experience, featuring hand-finished timber interiors, a minimalist stone hearth, and a gourmet kitchen tailored for quiet indulgence. Retreat to the bespoke California King wrapped in fine linens before stepping onto your expansive private deck to unwind in the sunken hot tub under a starlit canopy.",
  },
  {
    name: "003",
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image: imageUrl + "cabin-003.jpg",
    description:
      "Experience a masterclass in boutique family living within Suite 003. This sophisticated retreat pairs warm, artisanal wood craftsmanship with high-performance modern amenities. The open-plan living area and state-of-the-art kitchen serve as the heart of the suite, while the plush sleeping quarters offer a restful escape for parents and children alike. Unwind on your private terrace, where a luxury hot tub and curated seating area invite you to immerse yourselves in the serene woodland surroundings.",
  },
  {
    name: "004",
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image: imageUrl + "cabin-004.jpg",
    description:
      "A grand timber-framed pavilion that balances communal elegance with absolute privacy. Suite 004 is a sumptuous retreat for the discerning family, boasting opulent interiors crafted from the finest heritage oak. Discover a sun-drenched lounge, a minimalist stone fireplace, and a gourmet kitchen engineered for shared moments. The experience culminates on the expansive private deck, featuring a luxury hot tub immersed in the breathtaking beauty of the surrounding forest.",
  },
  {
    name: "005",
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image: imageUrl + "cabin-005.jpg",
    description:
      "An expansive sanctuary designed for group serenity. Suite 005 offers a secluded multi-bedroom retreat in the heart of nature, featuring warm, hand-finished timber interiors and an airy open-plan living space. Whether gathering by the limestone hearth or preparing a feast in the full-service kitchen, every detail is tailored for collective comfort. Step out onto the private woodland deck to enjoy the sunken hot tub and the quiet prestige of the ancient canopy.",
  },
  {
    name: "006",
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image: imageUrl + "cabin-006.jpg",
    description:
      "The epitome of boutique grandeur for larger groups. Suite 006 is a lavish architectural statement, featuring opulent interiors crafted from premium walnut and brushed brass. This suite boasts a grand living hall with a statement fireplace, a professional-grade chef's kitchen, and masterfully appointed bedrooms with spa-like en-suites. Immerse yourself in total luxury on the private wrap-around deck, complete with a signature hot tub and panoramic forest views.",
  },
  {
    name: "007",
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image: imageUrl + "cabin-007.jpg",
    description:
      "A stately multi-family pavilion offering unparalleled scale and seclusion. Suite 007 provides a grand sanctuary across multiple levels, blending artisanal wood craftsmanship with sophisticated modern design. With expansive communal lounges, a designer kitchen, and a collection of restful master suites, it is the ultimate destination for shared prestige. The sprawling terrace features a luxury hot tub and curated outdoor lounge, perfectly positioned for forest immersion.",
  },
  {
    name: "008",
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image: imageUrl + "cabin-008.jpg",
    description:
      "The Crown Jewel of Salmera Haven. Suite 008 is a masterclass in luxury and grandeur, catering to the most discerning large groups. This palatial retreat features intricate high-end finishes, soaring vaulted ceilings, and multiple grand living galleries with limestone fireplaces. From the formal dining hall to the chef’s dream kitchen and the spa-inspired master wing, every inch is engineered for indulgence. The massive private deck offers ultimate relaxation with a bespoke hot tub and ample lounge areas overlooking the majestic mountain skyline.",
  },
];
