const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected')
})

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        const camp = new Campground({
            author: '65de33f55995beb80e631464',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione velit atque, nesciunt est modi provident natus a minus expedita laudantium cupiditate omnis aliquid aperiam autem in harum sit impedit quaerat.',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images:[
              {
                url: 'https://res.cloudinary.com/dbz5oxkso/image/upload/v1709186342/YelpCamp/nbcccc6c9p40j9i4d7g2.jpg',
                filename: 'YelpCamp/nbcccc6c9p40j9i4d7g2',
              },
              {
                url: 'https://res.cloudinary.com/dbz5oxkso/image/upload/v1709186345/YelpCamp/x76cteufkszoeak9e3v6.jpg',
                filename: 'YelpCamp/x76cteufkszoeak9e3v6',
              },
              {
                url: 'https://res.cloudinary.com/dbz5oxkso/image/upload/v1709186345/YelpCamp/cwxj53e3vbuanfjf0ouc.jpg',
                filename: 'YelpCamp/cwxj53e3vbuanfjf0ouc',
              }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});