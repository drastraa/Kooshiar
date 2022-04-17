// TODO: delete the empty check and slice site names
const confusingWords = [
  " | Red Dress",
  " | Free People",
  " | REVOLVE",
  " – Mura Boutique",
];
const exactType = ["bag", "bags"];
const typeSynonyms = {
  bag: [
    "cross body bag",
    "bucket bag",
    "handle bag",
    "clutch",
    "purse",
    "pouch",
    "backpack",
    "tote bag",
    "handbag",
    "messenger bag",
    "puffer bag",
    "bags",
  ],
  top: ["vest top"],
  shoe: ["boot", "heel", "sandal"],
};
const productTypes = [
  "cross body bag",
  "bucket bag",
  "handle bag",
  "clutch",
  "purse",
  "pouch",
  "backpack",
  "tote bag",
  "handbag",
  "messenger bag",
  "puffer bag",

  "shoe",
  "boot",
  "heel",
  "sandal",

  "short",
  "jean",
  "dress",
  "polo",
  "vest top",
];
const styleTypes = ["baggy", "beaded", "crossbody"];
const materials = [
  "tweed",
  "leather",
  "nylon",
  "metalic",
  "jean",
  "natural",
  "cotton",
  "polyester",
];
const colorSynonyms = {
  yellow: ["lime", "lemon", "gold", "canary"],
  tan: ["beige", "sepia"],
  orange: ["ginger", "sepia", "amber"],
  pink: ["magenta", "coral"],
  purple: ["violet", "magenta"],
  blue: ["navy", "teal", "indigo", "azure", "cyan", "aqua"],
  green: ["basil", "olive", "lime", "mint"],
  brown: ["coffee", "umber", "chocolate", "wood", "caramel"],
  grey: ["gray", "ash", "silver"],
  black: ["midnight", "coal"],
};
const colors = [
  "white",
  "chalk white",
  "black",
  "coal",
  "blue",
  "navy",
  "teal",
  "indigo",
  "grey",
  "gray",
  "ash",
  "silver",
  "red",
  "pink",
  "magenta",
  "cyan",
  "yellow",
  "purple",
  "violet",
  "orange",
  "green",
  "mint",
  "brown",
  "coffee",
  "umber",
  "chocolate",
  "wood",
  "caramel",
  "canary",
  "gold",
  "bronze",
  "copper",
  "coral",
  "cream",
  "cadet",
  "olive",
  "ginger",
  "beige",
  "sepia",
  "amber",
  "tan",
  "aqua",
  "azure",
  "lime",
  "lemon",
  "basil",
  "amber",
  "floral",
];
function productType(product) {
  let p_type = [];
  let p_styleType = [];
  let p_material = [];
  let p_colors = [];
  let processName = product["name"].toLowerCase();
  let processDescription = product["description"].toLowerCase();
  confusingWords.forEach((word) => {
    if (processName.includes(word.toLowerCase())) {
      processName = processName.replace(word.toLowerCase(), "");
    }
    if (processDescription.includes(word.toLowerCase())) {
      processDescription = processDescription.replace(word.toLowerCase(), "");
    }
  });
  let splitName = processName.split(" ");
  let splitDescription = processDescription.split(" ");
  // Type
  productTypes.forEach((word) => {
    if (processName.includes(word)) {
      p_type.push(word);
    }
  });
  if (p_type.length === 0) {
    productTypes.forEach((word) => {
      if (processDescription.includes(word)) {
        p_type.push(word);
      }
    });
  }

  if (p_type.length === 0) {
    exactType.forEach((word) => {
      if (splitName.includes(word)) {
        p_type.push(word);
      }
    });
    if (p_type.length === 0) {
      exactType.forEach((word) => {
        if (splitDescription.includes(word)) {
          p_type.push(word);
        }
      });
    }
  }

  Object.keys(typeSynonyms).forEach((key) => {
    typeSynonyms[key].forEach((word) => {
      if (!p_type.includes(key) && p_type.includes(word)) {
        p_type.push(key);
      }
    });
  });
  // Style Type
  styleTypes.forEach((word) => {
    if (processName.includes(word)) {
      p_styleType.push(word);
    }
    if (p_styleType.length === 0 && processDescription.includes(word)) {
      p_styleType.push(word);
    }
  });
  // Material
  materials.forEach((word) => {
    if (processName.includes(word)) {
      p_material.push(word);
    }
    if (p_material.length === 0 && processDescription.includes(word)) {
      p_material.push(word);
    }
  });
  // Color
  colors.forEach((word) => {
    if (processName.includes(word)) {
      p_colors.push(word);
    }
    if (p_colors.length === 0 && processDescription.includes(word)) {
      p_colors.push(word);
    }
  });
  Object.keys(colorSynonyms).forEach((key) => {
    colorSynonyms[key].forEach((word) => {
      if (!p_colors.includes(key) && p_colors.includes(word)) {
        p_colors.push(key);
      }
    });
  });

  return {
    type: p_type,
    color: p_colors,
    material: p_material,
    styleType: p_styleType,
  };
}