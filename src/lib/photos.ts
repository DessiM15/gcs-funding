/**
 * Every photograph on the site is referenced through this file, so swapping in
 * Scott's own project photography later is a one-line change per image rather
 * than a hunt through components. Licensing is recorded in public/photos/CREDITS.md.
 */
export const photos = {
  houstonNight: {
    src: "/photos/houston-night.jpg",
    alt: "Downtown Houston skyline at night with traffic light trails on the freeway below",
  },
  houstonTower: {
    src: "/photos/houston-tower.jpg",
    alt: "A Houston high-rise tower shot from street level",
  },
  poolDusk: {
    src: "/photos/pool-dusk.jpg",
    alt: "A finished backyard swimming pool and spa at dusk with an outdoor fireplace lit",
  },
  truckNight: {
    src: "/photos/truck-night.jpg",
    alt: "A semi truck on the road at night",
  },
  kitchen: {
    src: "/photos/kitchen-remodel.jpg",
    alt: "A completed kitchen remodel with a marble island and custom cabinetry",
  },
  dental: {
    src: "/photos/dental-suite.jpg",
    alt: "A modern dental treatment room",
  },
  cardReader: {
    src: "/photos/card-reader.jpg",
    alt: "A card payment terminal on a counter in a small business",
  },
} as const;

export type Photo = (typeof photos)[keyof typeof photos];

/**
 * Photo assignment per page.
 *
 * Chosen so each image reinforces that page's argument — the trucking shot on
 * Spring where the angle is equipment, the card reader on Sugar Land where the
 * angle is processing cost. Falls back to the Houston skyline.
 */
const SERVICE_PHOTOS: Record<string, Photo> = {
  "consumer-financing": photos.kitchen,
  "business-line-of-credit": photos.houstonTower,
  "equipment-financing": photos.truckNight,
  "credit-card-processing": photos.cardReader,
  "personal-loans": photos.houstonNight,
};

const INDUSTRY_PHOTOS: Record<string, Photo> = {
  "pool-companies": photos.poolDusk,
  "hvac-contractors": photos.houstonTower,
  "roofing-companies": photos.houstonNight,
  "home-remodeling": photos.kitchen,
  "medical-and-med-spa": photos.dental,
  "dental-practices": photos.dental,
  "auto-repair-and-sales": photos.truckNight,
  "landscaping-and-outdoor-living": photos.poolDusk,
};

const LOCATION_PHOTOS: Record<string, Photo> = {
  houston: photos.houstonNight,
  cypress: photos.poolDusk,
  katy: photos.kitchen,
  "the-woodlands": photos.dental,
  "sugar-land": photos.cardReader,
  spring: photos.truckNight,
};

export const photoForService = (slug: string) =>
  SERVICE_PHOTOS[slug] ?? photos.houstonNight;
export const photoForIndustry = (slug: string) =>
  INDUSTRY_PHOTOS[slug] ?? photos.houstonNight;
export const photoForLocation = (slug: string) =>
  LOCATION_PHOTOS[slug] ?? photos.houstonNight;
