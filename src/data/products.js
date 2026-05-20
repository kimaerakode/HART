const products = [
  {
    category: "Pastry & Cake",
    favorite: true,
    title: "Cardamom Croissant",
    price: "42 DKK",
    img: "cardamom-croissant.webp",
    description:
      "Little squares of croissant dough are tossed in our special blend cardamom sugar and baked together to form our cardamom croissant. It is heady and aromatic with an intense cardamom rush.",
    allergens: "gluten, dairy, eggs",
  },
  {
    category: "Bread & Buns",
    favorite: false,
    title: "City Loaf",
    price: "59 DKK",
    img: "city-loaf.webp",
    description:
      "Our signature sourdough bread made with a mix of French and Italian wheat flours and french grey sea salt.",
  },
  {
    category: "Bread & Buns",
    favorite: true,
    title: "Sesame City Loaf",
    price: "59 DKK",
    img: "sesame-city-loaf.webp",
    time: "08:00",
    description:
      "Our signature sourdough bread topped with sesame. Made with a mix of French and Italian wheat flours and french grey sea salt.",
  },
  {
    category: "Bread & Buns",
    favorite: false,
    title: "Morning Bun",
    price: "16 DKK",
    img: "morning-bun.webp",
    time: "08:00",
    description:
      "100% sourdough buns, with a bit of wholewheat flour for some extra flavour. We have three types: mixed seeds, sesame seeds or plain buns.",
  },
  {
    category: "Bread & Buns",
    favorite: false,
    title: "Chocolate Bun",
    price: "28 DKK",
    img: "chocolate-bun.webp",
    time: "08:00",
  },
  {
    category: "Pastry & Cake",
    favorite: true,
    title: "Pain Au Chocolat",
    price: "38 DKK",
    img: "pain-au-chocolat.webp",
    time: "08:00",
    description:
      "Our classic pain au chocolat; croissant dough rolled with sticks of dark, bittersweet chocolate.",
  },
  {
    category: "Pastry & Cake",
    favorite: false,
    title: "Lemon Cake",
    price: "45 DKK",
    img: "lemon-cake.webp",
    time: "09:30",
  },
  {
    category: "Pastry & Cake",
    favorite: true,
    title: "Strawberry Choux",
    price: "48 DKK",
    img: "strawberry-choux.webp",
    time: "09:30",
  },
  {
    category: "Pastry & Cake",
    favorite: false,
    title: "Strawberry Tart",
    price: "48 DKK",
    img: "strawberry-tart.webp",
    time: "09:30",
  },
  {
    category: "Bread & Buns",
    favorite: true,
    title: "Superseed",
    price: "55 DKK",
    img: "superseed.webp",
    time: "08:00",
    description:
      "Naturally leavened 100% rye tin loaf. Made with beer, malt sirup, sesame, pumpkin, flax and sunflower seeds, it contains more seeds than flour by weight.",
  },
  {
    category: "Savory",
    favorite: false,
    title: "Beetroot Sandwich",
    price: "79 DKK",
    img: "beetroot-sandwich.webp",
    time: "09:30",
    description:
      "Sourdough sandwich with roasted beetroot, pickled red onion, fresh horseradish and a generous smear of cream cheese.",
  },
  {
    category: "Savory",
    favorite: false,
    title: "Tomato Sandwich",
    price: "79 DKK",
    img: "tomato-sandwich.webp",
    time: "09:30",
    description:
      "Sourdough sandwich with roasted beetroot, pickled red onion, fresh horseradish and a generous smear of cream cheese.",
  },

  {
    category: "Savory",
    favorite: false,
    title: "Mushroom Sandwich",
    price: "79 DKK",
    img: "mushroom-sandwich.webp",
    time: "09:30",
    description:
      "Sourdough sandwich with roasted beetroot, pickled red onion, fresh horseradish and a generous smear of cream cheese.",
  },
  {
    category: "Groceries",
    favorite: false,
    title: "Butter from Øllingegaard",
    price: "36 DKK",
    img: "butter.webp",
    description:
      "Old-fashioned danish butter. Made from organic cream. The obvious choice for all food enthusiasts.",
  },
  {
    category: "Groceries",
    favorite: false,
    title: "Spring Water",
    price: "26 DKK",
    img: "spring-water.webp",
    time: "08:00",
    description:
      "Lovely fresh spring water from Postevand.dk who are focusing on the protection of our groundwater by donating money for tree planting in Denmark.",
  },
  {
    category: "Groceries",
    favorite: false,
    title: "Bornholm Water",
    price: "30 DKK",
    img: "bornholm-water.webp",
    time: "08:00",
    description:
      "The many salts and minerals from the Bornholm underground gives it a unique taste and character, while at the same time enhancing the taste nuances in the food it is served with.",
  },
  {
    category: "Groceries",
    favorite: false,
    title: "Fritz Cola",
    price: "30 DKK",
    img: "fritz-cola.webp",
    time: "08:00",
    description:
      "One of the feistiest kolas which contains real cola nut extract and natural caffeine – an unmistakable get-me-up.",
  },
  {
    category: "Groceries",
    favorite: false,
    title: "Ebeltoft Soda Rhubarb",
    price: "39 DKK",
    img: "ebeltoft-soda-rhubarb.webp",
    time: "08:00",
    description:
      "Amazingly fresh and flavourfull sodas from Ebeltoft Farm Brewery.",
  },
  {
    category: "Groceries",
    favorite: false,
    title: "Ebeltoft Soda Raspberry",
    price: "39 DKK",
    img: "ebeltoft-soda-raspberry.webp",
    time: "08:00",
    description:
      "Amazingly fresh and flavourfull sodas from Ebeltoft Farm Brewery.",
  },
  {
    category: "Groceries",
    favorite: false,
    title: "Ebeltoft Soda Lemon & Ginger",
    price: "39 DKK",
    img: "ebeltoft-soda-gingerlemon.webp",
    time: "08:00",
  },
  {
    category: "Groceries",
    favorite: false,
    title: "Prolog Coffee Bag",
    price: "155 DKK",
    img: "prolog-coffee.webp",
    time: "08:00",
    description:
      "We store all our coffee in protecting ventilating packing that allows the oxygen from the roasted beans to leave the bags. This helps keep the durability of the coffee. ",
  },
];

export default products;
