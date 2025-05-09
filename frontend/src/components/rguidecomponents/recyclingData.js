    import { 
  FaRecycle, FaExclamationCircle, FaLeaf, FaBatteryHalf, FaWater, FaOilCan,
  FaBox, FaTrash, FaMobile, FaPrint, FaTshirt, FaPrescriptionBottleAlt
} from 'react-icons/fa';
import React from 'react';

// Modular materials organization by category
const MATERIALS_BY_CATEGORY = {
  // Plastic Materials
  plastic: {
    id: '445',
    label: 'Plastic',
    icon: FaRecycle,
    materials: [
      { 
        material_id: '445-01', 
        description: 'Plastic Bottles (PET #1)', 
        long_description: 'Used for most water and soda bottles. Empty, rinse, and replace cap before recycling. Labels can stay on.',
        recyclable: true,
        how_to_recycle: 'Empty and rinse. Replace cap. Place in curbside recycling bin.'
      },
      { 
        material_id: '445-02', 
        description: 'Milk Jugs (HDPE #2)',
        long_description: 'Used for milk, juice, and detergent containers. Rinse thoroughly before recycling.',
        recyclable: true,
        how_to_recycle: 'Rinse thoroughly. Remove cap if your local program requires it. Place in curbside recycling.'
      },
      { 
        material_id: '445-03', 
        description: 'Plastic Bags and Film',
        long_description: 'Including grocery bags, bread bags, dry cleaning bags, and other plastic films.',
        recyclable: true,
        how_to_recycle: 'Most curbside programs DO NOT accept plastic bags. Return clean, dry bags to grocery store collection bins.'
      },
      { 
        material_id: '445-04', 
        description: 'Plastic Containers (#3-#7)',
        long_description: 'Includes yogurt cups, margarine tubs, and other food containers.',
        recyclable: true,
        how_to_recycle: 'Check with your local program. Rinse thoroughly before recycling. Remove any non-recyclable lids.'
      },
      { 
        material_id: '445-05', 
        description: 'Plastic Utensils',
        long_description: 'Single-use plastic forks, knives, and spoons are difficult to recycle due to their small size and varied materials.',
        recyclable: false,
        how_to_recycle: 'Most recycling programs do not accept plastic utensils. Consider switching to reusable or compostable alternatives.'
      },
      { 
        material_id: '445-06', 
        description: 'Plastic Toys',
        long_description: 'Toys often contain mixed plastics, electronics, and other materials that are difficult to separate.',
        recyclable: false,
        how_to_recycle: 'Donate usable toys. For broken toys, check specialty recycling programs or consider upcycling projects.'
      }
    ]
  },

  // Glass Materials
  glass: {
    id: '81',
    label: 'Glass',
    icon: FaWater,
    materials: [
      { 
        material_id: '81-01', 
        description: 'Glass Bottles and Jars', 
        long_description: 'Food and beverage containers made of clear, green, or brown glass.',
        recyclable: true,
        how_to_recycle: 'Rinse thoroughly. Remove lids and caps (these can often be recycled separately). Labels can remain.'
      },
      { 
        material_id: '81-02', 
        description: 'Window Glass',
        long_description: 'Window glass has different melting points than container glass and cannot be recycled together.',
        recyclable: false,
        how_to_recycle: 'Do not place in curbside recycling. Check for specialty glass recyclers in your area.'
      },
      { 
        material_id: '81-03', 
        description: 'Drinking Glasses and Cookware',
        long_description: 'Heat-resistant glass like Pyrex and drinking glasses have different chemical compositions.',
        recyclable: false,
        how_to_recycle: 'Do not place in curbside recycling. Donate intact items. Broken items typically go in trash.'
      },
      { 
        material_id: '81-04', 
        description: 'Glass Art and Decor',
        long_description: 'Decorative glass items often contain additives that make them unsuitable for standard recycling.',
        recyclable: false,
        how_to_recycle: 'Donate usable items. For broken items, dispose in household trash or check for specialty recyclers.'
      }
    ]
  },
  
  // Paper Materials
  paper: {
    id: '431',
    label: 'Paper',
    icon: FaBox,
    materials: [
      { 
        material_id: '431-01', 
        description: 'Cardboard Boxes', 
        long_description: 'Corrugated cardboard used for shipping and packaging.',
        recyclable: true,
        how_to_recycle: 'Flatten boxes to save space. Remove any packing materials and tape if possible.'
      },
      { 
        material_id: '431-02', 
        description: 'Newspaper and Magazines',
        long_description: 'Printed publications including newspapers, magazines, and catalogs.',
        recyclable: true,
        how_to_recycle: 'Place directly in recycling bin. No need to remove staples or glossy inserts.'
      },
      { 
        material_id: '431-03', 
        description: 'Office Paper',
        long_description: 'White and colored printing paper, notepads, envelopes, and other office paper.',
        recyclable: true,
        how_to_recycle: 'Remove plastic windows from envelopes if possible. Paper clips and staples are usually OK.'
      },
      { 
        material_id: '431-04', 
        description: 'Food-Soiled Paper',
        long_description: 'Pizza boxes, napkins, paper towels, and other paper with food residue.',
        recyclable: false,
        how_to_recycle: 'Food-soiled paper typically cannot be recycled. Compost if possible or dispose in trash.'
      },
      { 
        material_id: '431-05', 
        description: 'Shredded Paper',
        long_description: 'Paper that has been run through a shredder.',
        recyclable: true,
        how_to_recycle: 'Many programs accept shredded paper, but it must be contained in a paper bag labeled "shredded paper" to prevent it from contaminating other recyclables.'
      },
      { 
        material_id: '431-06', 
        description: 'Receipts',
        long_description: 'Many receipts are printed on thermal paper containing BPA.',
        recyclable: false,
        how_to_recycle: 'Thermal receipts (shiny, smooth paper) should not be recycled as they contain BPA. Dispose in trash.'
      }
    ]
  },

  // Metal Materials
  metal: {
    id: '608',
    label: 'Metal',
    icon: FaRecycle,
    materials: [
      { 
        material_id: '608-01', 
        description: 'Aluminum Cans', 
        long_description: 'Beverage cans made from aluminum.',
        recyclable: true,
        how_to_recycle: 'Rinse and place in recycling. Can be crushed to save space, though some programs prefer uncrushed.'
      },
      { 
        material_id: '608-02', 
        description: 'Steel/Tin Cans',
        long_description: 'Food cans typically made from steel with a thin tin coating.',
        recyclable: true,
        how_to_recycle: 'Rinse thoroughly. Labels can stay on. Place lid inside can and pinch the opening to keep lid inside.'
      },
      { 
        material_id: '608-03', 
        description: 'Aluminum Foil and Trays',
        long_description: 'Clean aluminum foil and disposable baking pans.',
        recyclable: true,
        how_to_recycle: 'Must be clean of all food residue. Crumple foil into a ball at least 2" in diameter for easier processing.'
      },
      { 
        material_id: '608-04', 
        description: 'Scrap Metal',
        long_description: 'Larger metal items like hangers, pots, pans, and appliances.',
        recyclable: true,
        how_to_recycle: 'Too large for curbside recycling. Take to scrap yards or community collection events.'
      },
      { 
        material_id: '608-05', 
        description: 'Aerosol Cans',
        long_description: 'Metal spray cans that contained non-hazardous products.',
        recyclable: true,
        how_to_recycle: 'Must be completely empty (no pressure, no product). Do not puncture. Remove plastic caps.'
      }
    ]
  },

  // Electronics
  electronics: {
    id: '128',
    label: 'Electronics',
    icon: FaMobile,
    materials: [
      { 
        material_id: '128-01', 
        description: 'Computers and Laptops', 
        long_description: 'Desktop computers, laptops, and associated hardware.',
        recyclable: true,
        how_to_recycle: 'Do not place in regular recycling. Take to electronics recycling centers, retailer take-back programs, or community collection events.'
      },
      { 
        material_id: '128-02', 
        description: 'Smartphones and Tablets',
        long_description: 'Mobile devices including cell phones, smartphones, and tablets.',
        recyclable: true,
        how_to_recycle: 'Many manufacturers and retailers offer take-back or trade-in programs. Otherwise, take to an e-waste recycling center.'
      },
      { 
        material_id: '128-03', 
        description: 'Televisions and Monitors',
        long_description: 'All types of TVs and computer monitors, including CRT, LCD, LED, and plasma.',
        recyclable: true,
        how_to_recycle: 'Older CRT models contain hazardous materials. Take all TVs to specialized electronics recyclers or retailer recycling programs.'
      },
      { 
        material_id: '128-04', 
        description: 'Printers and Ink Cartridges',
        long_description: 'Computer printers, scanners, fax machines, and their ink/toner cartridges.',
        recyclable: true,
        how_to_recycle: 'Many office supply stores offer ink cartridge recycling. For printers, use e-waste collection services.'
      },
      { 
        material_id: '128-05', 
        description: 'Small Electronics',
        long_description: 'Items like digital cameras, MP3 players, e-readers, and other small gadgets.',
        recyclable: true,
        how_to_recycle: 'Take to electronics recycling centers. Some retailers have collection bins for small electronics.'
      },
      { 
        material_id: '128-06', 
        description: 'Cables and Chargers',
        long_description: 'Power cables, chargers, USB cables, and other electronic wires.',
        recyclable: true,
        how_to_recycle: 'Collect and take to e-waste recycling centers. Do not place in regular recycling bins.'
      }
    ]
  },

  // Hazardous Materials
  hazardous: {
    id: '67',
    label: 'Hazardous',
    icon: FaExclamationCircle,
    materials: [
      { 
        material_id: '67-01', 
        description: 'Batteries', 
        long_description: 'All types of batteries including alkaline, lithium-ion, button, and rechargeable.',
        recyclable: true,
        how_to_recycle: 'Never place in regular trash or recycling. Take to hazardous waste collection sites, battery recycling drop-offs, or certain retailers.'
      },
      { 
        material_id: '67-02', 
        description: 'Paint and Solvents',
        long_description: 'Latex paint, oil-based paint, stains, and painting solvents.',
        recyclable: true,
        how_to_recycle: 'Latex paint can be dried out and disposed of in regular trash in some areas. Take all paint and solvents to hazardous waste collection.'
      },
      { 
        material_id: '67-03', 
        description: 'Motor Oil and Filters',
        long_description: 'Used automotive oil and oil filters.',
        recyclable: true,
        how_to_recycle: 'Take to auto parts stores that offer recycling, service stations, or hazardous waste collection events.'
      },
      { 
        material_id: '67-04', 
        description: 'Pesticides and Fertilizers',
        long_description: 'Lawn and garden chemicals including weed killers, pest control, and fertilizers.',
        recyclable: false,
        how_to_recycle: 'Never pour down drain or place in regular trash. Take to household hazardous waste collection facilities.'
      },
      { 
        material_id: '67-05', 
        description: 'Cleaning Products',
        long_description: 'Harsh household cleaners, drain openers, oven cleaners, and similar products.',
        recyclable: false,
        how_to_recycle: 'Completely used containers can sometimes go in regular recycling. Products with remaining content should go to hazardous waste collection.'
      },
      { 
        material_id: '67-06', 
        description: 'Light Bulbs',
        long_description: 'CFLs (contain mercury), fluorescent tubes, halogen, and LED bulbs.',
        recyclable: true,
        how_to_recycle: 'CFLs and fluorescent tubes contain mercury and must go to hazardous waste collection. Many hardware stores accept them for recycling.'
      }
    ]
  },

  // Household Items
  household: {
    id: '154',
    label: 'Household',
    icon: FaTrash,
    materials: [
      { 
        material_id: '154-01', 
        description: 'Furniture', 
        long_description: 'Couches, chairs, tables, and other large furniture items.',
        recyclable: true,
        how_to_recycle: 'Donate usable items. For damaged items, check with local waste services about bulk pickup or furniture recycling programs.'
      },
      { 
        material_id: '154-02', 
        description: 'Clothing and Textiles',
        long_description: 'All types of clothing, towels, sheets, and fabric items.',
        recyclable: true,
        how_to_recycle: 'Donate usable items to charity. Many organizations also accept damaged textiles for repurposing or recycling.'
      },
      { 
        material_id: '154-03', 
        description: 'Shoes and Accessories',
        long_description: 'Footwear, belts, handbags, and other accessories.',
        recyclable: true,
        how_to_recycle: 'Donate usable items. Some specialty recycling programs exist for shoes.'
      },
      { 
        material_id: '154-04', 
        description: 'Mattresses',
        long_description: 'Full mattresses and box springs.',
        recyclable: true,
        how_to_recycle: 'Mattresses can be partially recycled at specialized facilities. Check if your area has mattress recycling programs or fees.'
      },
      { 
        material_id: '154-05', 
        description: 'Carpet and Rugs',
        long_description: 'Wall-to-wall carpet, area rugs, and carpet padding.',
        recyclable: true,
        how_to_recycle: 'Some carpet recycling programs exist. Contact carpet manufacturers or local waste management.'
      }
    ]
  },

  // Automotive Materials
  automotive: {
    id: '89',
    label: 'Automotive',
    icon: FaOilCan,
    materials: [
      { 
        material_id: '89-01', 
        description: 'Tires', 
        long_description: 'All sizes of vehicle tires.',
        recyclable: true,
        how_to_recycle: 'Most tire retailers will recycle old tires (sometimes for a fee). Never place in regular trash or recycling.'
      },
      { 
        material_id: '89-02', 
        description: 'Car Batteries',
        long_description: 'Lead-acid automotive batteries.',
        recyclable: true,
        how_to_recycle: 'Return to auto parts stores or retailers that sell them - most offer recycling programs, often with a deposit refund.'
      },
      { 
        material_id: '89-03', 
        description: 'Antifreeze',
        long_description: 'Used engine coolant/antifreeze.',
        recyclable: true,
        how_to_recycle: 'Highly toxic - never pour down drain or on ground. Take to automotive service centers that accept it or household hazardous waste collection.'
      },
      { 
        material_id: '89-04', 
        description: 'Automotive Fluids',
        long_description: 'Brake fluid, transmission fluid, power steering fluid.',
        recyclable: true,
        how_to_recycle: 'Take to auto repair shops that accept used fluids or to household hazardous waste collection.'
      }
    ]
  },

  // Yard and Garden Materials
  yard: {
    id: '893',
    label: 'Yard & Garden',
    icon: FaLeaf,
    materials: [
      { 
        material_id: '893-01', 
        description: 'Yard Trimmings', 
        long_description: 'Grass clippings, leaves, small branches, and other garden waste.',
        recyclable: true,
        how_to_recycle: 'Use curbside yard waste collection if available. Consider home composting as an alternative.'
      },
      { 
        material_id: '893-02', 
        description: 'Tree Branches and Stumps',
        long_description: 'Larger wood waste from trees and landscaping.',
        recyclable: true,
        how_to_recycle: 'Check with local waste management for special collection or drop-off locations. Can also be chipped for mulch.'
      },
      { 
        material_id: '893-03', 
        description: 'Christmas Trees',
        long_description: 'Natural Christmas trees (not artificial).',
        recyclable: true,
        how_to_recycle: 'Most communities offer special collection after holidays. Remove all decorations, tinsel, and stands.'
      },
      { 
        material_id: '893-04', 
        description: 'Soil and Dirt',
        long_description: 'Clean fill dirt and potting soil.',
        recyclable: true,
        how_to_recycle: 'Clean soil can be reused in gardens or landscaping. Some transfer stations accept clean fill dirt.'
      }
    ]
  },
  
  // Medical and Pharmaceutical
  medical: {
    id: '201',
    label: 'Medical',
    icon: FaPrescriptionBottleAlt,
    materials: [
      { 
        material_id: '201-01', 
        description: 'Medications', 
        long_description: 'Prescription and over-the-counter medications.',
        recyclable: false,
        how_to_recycle: 'Never flush or pour down drain. Use drug take-back programs or community collection events. Some pharmacies have collection bins.'
      },
      { 
        material_id: '201-02', 
        description: 'Sharps and Needles',
        long_description: 'Medical needles, lancets, and other sharps from home use.',
        recyclable: false,
        how_to_recycle: 'Never place loose in trash or recycling. Use sharps containers and dispose through medical waste collection programs.'
      },
      { 
        material_id: '201-03', 
        description: 'Medical Devices',
        long_description: 'Home medical equipment like CPAP machines, blood pressure monitors, etc.',
        recyclable: true,
        how_to_recycle: 'Some manufacturers offer take-back programs. Otherwise, handle as electronics waste.'
      },
      { 
        material_id: '201-04', 
        description: 'Prescription Bottles',
        long_description: 'Empty plastic prescription medication containers.',
        recyclable: true,
        how_to_recycle: 'Remove labels and personal information. Rinse thoroughly. Check if your local program accepts this type of plastic.'
      }
    ]
  }
};

// Generate flat material list from the categorized structure
export const FALLBACK_MATERIALS = Object.values(MATERIALS_BY_CATEGORY).reduce((acc, category) => {
  return [...acc, ...category.materials];
}, []);

// Convert categories to format needed for UI
export const MATERIAL_CATEGORIES = [
  { id: 'All', label: 'All Materials', icon: React.createElement(FaRecycle) },
  ...Object.values(MATERIALS_BY_CATEGORY).map(category => ({
    id: category.id,
    label: category.label,
    icon: React.createElement(category.icon)
  }))
];

// Export the categorized structure for more advanced usage
export const MATERIALS_CATEGORIES = MATERIALS_BY_CATEGORY;

// Fallback facilities data
export const FALLBACK_FACILITIES = (location = 'your location') => [
  { 
    location_id: '1', 
    name: 'City Recycling Center', 
    address: `Near ${location}`, 
    phone: '(555) 123-4567', 
    distance: '2.3 miles',
    materials: ['Plastic', 'Glass', 'Paper', 'Metal', 'E-Waste'],
    hours: 'Mon-Sat: 8am-5pm, Sun: Closed',
    url: 'www.cityrecycling.example'
  },
  { 
    location_id: '2', 
    name: 'County Waste Management', 
    address: `Near ${location}`, 
    phone: '(555) 765-4321', 
    distance: '4.7 miles',
    materials: ['Plastic', 'Glass', 'Paper', 'Metal', 'Hazardous', 'E-Waste'],
    hours: 'Mon-Fri: 7am-7pm, Sat-Sun: 9am-3pm',
    notes: 'Hazardous waste accepted only on the first Saturday of each month.'
  },
  {
    location_id: '3',
    name: 'Green Earth Recycling',
    address: `Near ${location}`,
    phone: '(555) 987-6543',
    distance: '6.2 miles',
    materials: ['Electronics', 'Batteries', 'Light Bulbs', 'Metal'],
    hours: 'Mon-Fri: 9am-6pm, Sat: 10am-4pm, Sun: Closed',
    url: 'www.greenearth.example',
    notes: 'Specializes in electronic waste recycling. Offers free pickup for businesses.'
  },
  {
    location_id: '4',
    name: 'MedWaste Solutions',
    address: `Near ${location}`,
    phone: '(555) 456-7890',
    distance: '8.7 miles',
    materials: ['Medications', 'Medical Waste', 'Sharps'],
    hours: 'Mon-Fri: 8am-4pm, Sat-Sun: Closed',
    url: 'www.medwastesolutions.example',
    notes: 'Specialized in safe disposal of medical and pharmaceutical waste. Requires proof of residency for household waste.'
  },
  {
    location_id: '5',
    name: 'Auto Parts Recycling',
    address: `Near ${location}`,
    phone: '(555) 789-0123',
    distance: '5.4 miles',
    materials: ['Tires', 'Car Batteries', 'Motor Oil', 'Antifreeze', 'Auto Parts'],
    hours: 'Mon-Sat: 7:30am-6pm, Sun: 9am-4pm',
    url: 'www.autorecycling.example',
    notes: 'Offers cash for some auto parts. Free recycling for batteries and motor oil.'
  }
];