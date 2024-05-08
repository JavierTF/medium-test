// // import { run } from '../app/mongodb';
// import { GetStaticProps } from 'next';

// interface HomeProps {
//   data: any[];
//   collection: any[];
// }

// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string.
// const uri = "<connection string uri>";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db('sample_mflix');
//     const movies = database.collection('movies');

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: 'Back to the Future' };
//     const movie = await movies.findOne(query);

//     console.log(movie);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

// export const getStaticProps: GetStaticProps<HomeProps> = async () => {
//   console.log('llegueeee\n\n\n\n')
//   try {
//     const db = await run();
//     console.log('db', db);
//     // const collection = db.collection('sample_mflix');
//     let data: any[] = [];
//     let collection: any[] = [];
//     // const data = await collection.find().toArray();

//     return {
//       props: {
//         data,
//         collection,
//       },
//     };
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return {
//       props: {
//         data: [],
//         collection: [],
//       },
//     };
//   }
// };

// const Home: React.FC<HomeProps> = ({ data, collection }) => {
  

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           XXX started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.tsx</code>
//         </p>
//       </div>
//     </main>
//   );
// };

// export default Home;