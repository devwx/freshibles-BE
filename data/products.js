const products = [
  {
    name: "Spinach",
    description: "Freshly sourced Spinach",
    category: "vegetable",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714940798/francis-store/vegetable/edmcvqvdvdi2s1fuco0b.jpg",
    new_price: 7.99,
  },
  {
    name: "Brocoli",
    discription: "Chilly preserved Brocoli",
    category: "vegetable",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714940786/francis-store/vegetable/cq9fl8yqliwxurn3urf6.jpg",
    new_price: 4.99,
  },

  {
    name: "Tomato",
    discription: "Local Tomato Cloves",
    category: "vegetable",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714940800/francis-store/vegetable/dpoyt8oanuksls94wekc.jpg",
    new_price: 2.99,
  },
  {
    name: "Potatoes",
    discription: "Preserved North Potato",
    category: "vegetable",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714940802/francis-store/vegetable/wfzvefdamhmkgkt9eapm.jpg",
    new_price: 11.99,
  },
  {
    name: "Carrot",
    discription: "Fresh Carrots",
    category: "vegetable",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714940804/francis-store/vegetable/hqx1mvnnokpgkzs3ojov.jpg",
    new_price: 4.99,
  },
  // ************************************************
  {
    name: "Oranges",
    discription: "Sweet Oranges",
    category: "fruit",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942522/francis-store/best/lw1rozmpmyznzlsaaobw.jpg",
    new_price: 4.99,
  },
  {
    name: "Apple",
    discription: "Red & Green Apples",
    category: "fruit",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942534/francis-store/best/wanppzx7iwkgtez74xlm.jpg",
    new_price: 10,
  },
  {
    name: "Banana",
    discription: "Single Long Banana",
    category: "fruit",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942526/francis-store/best/cwaybb4v7dwu6r5ol22i.jpg",
    new_price: 8.5,
  },
  {
    name: "Strawberry",
    discription: "South coast berries",
    category: "fruit",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942524/francis-store/best/punx4ftco93znplljy9t.jpg",
    new_price: 5.99,
  },
  {
    name: "Grapes",
    discription: "Freshly picked Grapes",
    category: "fruit",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942531/francis-store/best/qnul94uhb5lawfv8y6kk.jpg",
    new_price: 99,
  },
  // ************************************************************

  {
    name: "White Bread",
    discription: "Soft White Bread",
    category: "bread",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941081/francis-store/bread/lvlxyldsdx65n3wshalj.jpg",
    new_price: 1.4,
  },
  {
    name: "Brown Bread",
    discription: "Fresh Brown Bread",
    category: "bread",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941082/francis-store/bread/b8mwcy2n1st7wvbqo2gb.jpg",
    new_price: 2.99,
  },
  {
    name: "White Bread",
    discription: "Soft White Bread",
    category: "bread",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941081/francis-store/bread/lvlxyldsdx65n3wshalj.jpg",
    new_price: 1.4,
  },
  {
    name: "Brown Bread",
    discription: "Fresh Brown Bread",
    category: "bread",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941082/francis-store/bread/b8mwcy2n1st7wvbqo2gb.jpg",
    new_price: 2.99,
  },
  {
    name: "Brown Bread",
    discription: "Fresh Brown Bread",
    category: "bread",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941082/francis-store/bread/b8mwcy2n1st7wvbqo2gb.jpg",
    new_price: 2.99,
  },
  // ***************************************

  {
    name: "Pork",
    discription: "Freshly Skimmed Pork",
    category: "meat",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942449/francis-store/meat/ccph3zxcoxvyt2ai8lnb.jpg",
    new_price: 4.99,
  },
  {
    name: "Chicken",
    discription: "Local Sweet Chicken",
    category: "meat",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942449/francis-store/meat/i99kbyyda2zxu2jlgq63.jpg",
    new_price: 8.99,
  },
  {
    name: "Pork",
    discription: "Freshly Skimmed Pork",
    category: "meat",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942449/francis-store/meat/ccph3zxcoxvyt2ai8lnb.jpg",
    new_price: 4.99,
  },
  {
    name: "Chicken",
    discription: "Local Sweet Chicken",
    category: "meat",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942449/francis-store/meat/i99kbyyda2zxu2jlgq63.jpg",
    new_price: 8.99,
  },
  {
    name: "Pork",
    discription: "Freshly Skimmed Pork",
    category: "meat",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942449/francis-store/meat/ccph3zxcoxvyt2ai8lnb.jpg",
    new_price: 4.99,
  },
  {
    name: "Chicken",
    discription: "Local Sweet Chicken",
    category: "meat",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714942449/francis-store/meat/i99kbyyda2zxu2jlgq63.jpg",
    new_price: 8.99,
  },

  // ***********************************

  {
    name: "Cow Milk",
    discription: "Fresh Skimmed Milk",
    category: "dairy",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941168/francis-store/fruit/njjkcyk33nycqzrra0ao.jpg",
    new_price: 4.99,
  },
  {
    name: "Cheese",
    discription: "Fat Free Cheese",
    category: "dairy",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941170/francis-store/fruit/decd3snzi3epo6u2we37.jpg",
    new_price: 8.99,
  },
  {
    name: "Butter",
    discription: "Organic flat Butter",
    category: "dairy",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941172/francis-store/fruit/qlyl28wtkw9fdeyvuanx.jpg",
    new_price: 2.99,
  },
  {
    name: "Yoghurt",
    discription: "Sugar Free Yoghurt",
    category: "dairy",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941162/francis-store/fruit/qbdm9pc0nqrvxlkpsp44.jpg",
    new_price: 3.99,
  },
  {
    name: "Condensed Milk",
    discription: "Farm sourced milk",
    category: "dairy",
    image:
      "https://res.cloudinary.com/pauloski/image/upload/v1714941168/francis-store/fruit/njjkcyk33nycqzrra0ao.jpg",
    new_price: 9.99,
  },
];

export default products;
