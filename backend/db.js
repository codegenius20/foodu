const mongoose = require('mongoose')
const mongoURI = "mongodb+srv://foodie:Rachit2003@cluster0.svlpqs0.mongodb.net/foodie?retryWrites=true&w=majority"


// const connectDB = async () => {
//     try {
//       mongoose.set("strictQuery", false);
//       mongoose.connect(mongoURI);
//       console.log("Connected to MongoDB Successfully!");
//       const fetchdata= await mongoose.connection.db.collection("food_items").find({})
//       fetchdata.toArray(function(err,data){
//         if(err) console.log(err)
//         else console.log(data)
//       })
//     } catch (error) {
//       console.log(error);
//     }
//   };
const connectDB = async () => {
  try {
      await mongoose.connect(mongoURI);

      console.log('Connected to MongoDB');

      fetchData();
      fetchData2();
  } catch (error) {
      console.error('Error connecting to MongoDB: ', error);
  }
};

 async function fetchData() {
  
    const fetched_data = await mongoose.connection.db.collection("food_items").find({});
    
    fetched_data.toArray()
      .then(data => {
        global.food_items=data;
        // const foodcategory=await mongoose.connection.db.collection("food_category").find({});
        // resolve(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // reject(error);
      });
  
}


async function fetchData2() {
  
  const fetched_data2 = await mongoose.connection.db.collection("food_category").find({});
  
  fetched_data2.toArray()
    .then(data => {
      global.food_category=data;
      // const foodcategory=await mongoose.connection.db.collection("food_category").find({});
      // resolve(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // reject(error);
    });

}

module.exports = connectDB; 