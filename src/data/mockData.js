import c1 from '../assets/c1.jpeg';
import c2 from '../assets/c2.jpeg';
import c3 from '../assets/c3.jpeg';
import c4 from '../assets/c4.jpeg';
import c5 from '../assets/c5.jpeg';
import c6 from '../assets/c6.jpeg';
import t1 from '../assets/t1.jpeg';
import t2 from '../assets/t2.jpeg';
import t3 from '../assets/t3.jpeg';
import t4 from '../assets/t4.jpeg';
import t5 from '../assets/t5.jpeg';
import t6 from '../assets/t6.jpeg';

export const productData = {
  bicycles: [
    { id: 1,  name: 'Gear Cycles',         description: 'Premium multi-speed gear cycles for all terrains',       image: c1, price: 8500  },
    { id: 2,  name: 'Single Gear Cycles',   description: 'Reliable and easy-to-maintain single speed bikes',       image: c2, price: 4500  },
    { id: 3,  name: 'Kids Cycles',          description: 'Safe and colorful bicycles for children',                image: c3, price: 3200  },
    { id: 4,  name: 'Sports Bikes',         description: 'High-performance bikes for sports enthusiasts',          image: c4, price: 12000 },
    { id: 5,  name: 'Family Cycles',        description: 'Comfortable bikes for family outings',                   image: c5, price: 6800  },
    { id: 6,  name: 'Mountain Bikes',       description: 'Rugged bikes built for adventure',                       image: c6, price: 15000 },
    { id: 7,  name: 'City Commuter Bikes',  description: 'Lightweight bikes perfect for daily city commutes',      image: c1, price: 7200  },
    { id: 8,  name: 'BMX Bikes',            description: 'Sturdy BMX bikes for tricks and off-road riding',        image: c2, price: 9500  },
    { id: 9,  name: 'Folding Bikes',        description: 'Compact folding bikes easy to carry and store',          image: c3, price: 11000 },
    { id: 10, name: 'Electric Cycles',      description: 'Eco-friendly electric-assisted bicycles for all ages',   image: c4, price: 28000 },
  ],
  toys: [
    { id: 1,  name: 'Battery Operated Cars',  description: 'Exciting electric ride-on cars for kids',              image: t1, price: 4200  },
    { id: 2,  name: 'Ride-On Toys',           description: 'Fun jeeps, bikes, and ride-on vehicles',               image: t2, price: 3800  },
    { id: 3,  name: 'Tricycles',              description: 'Sturdy tricycles for toddlers',                         image: t3, price: 2500  },
    { id: 4,  name: 'Educational Toys',       description: 'Learning toys for child development',                   image: t4, price: 1200  },
    { id: 5,  name: 'Baby Walkers',           description: 'Safe walkers to help babies learn to walk',             image: t5, price: 1800  },
    { id: 6,  name: 'Outdoor Play',           description: 'Swings, slides, and outdoor play equipment',           image: t6, price: 5500  },
    { id: 7,  name: 'Remote Control Cars',    description: 'High-speed remote controlled cars for all ages',       image: t1, price: 2800  },
    { id: 8,  name: 'Building Blocks',        description: 'Creative building block sets to boost imagination',    image: t2, price: 950   },
    { id: 9,  name: 'Soft Toys',             description: 'Adorable stuffed animals and plush toys',               image: t3, price: 650   },
    { id: 10, name: 'Sports Toys',           description: 'Cricket sets, footballs, and outdoor sport kits',      image: t4, price: 1500  },
  ],
};

export const reviewsData = [
  { id: 1, author: 'Rajesh Kumar',     rating: 5, text: 'Super service, low price and home delivery. Giving 5 star. Highly recommended for anyone looking for quality bicycles!', date: '2 weeks ago' },
  { id: 2, author: 'Priya Menon',      rating: 5, text: 'Variety collection of bicycles in affordable prices. Bought a gear cycle for my son and he absolutely loves it!',        date: '1 month ago' },
  { id: 3, author: 'Anil Thomas',      rating: 5, text: 'Highly professional and good collections and options. The staff was very helpful in choosing the right bicycle.',          date: '3 weeks ago' },
  { id: 4, author: 'Lakshmi Nair',     rating: 5, text: 'Best place for kids toys and bicycles in Mukkam. Great quality products at reasonable prices. Very happy!',              date: '1 week ago'  },
  { id: 5, author: 'Mohammed Basheer', rating: 5, text: 'Excellent customer service and wide variety of products. Home delivery service is very convenient. Highly satisfied!',    date: '2 months ago'},
  { id: 6, author: 'Divya Krishnan',   rating: 5, text: 'Bought a battery car for my daughter. She loves it! Quality is excellent and price was very reasonable. Thank you!',     date: '3 days ago'  },
];
