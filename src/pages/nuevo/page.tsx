import { run } from '../../app/mongodb';
import { GetStaticProps } from 'next';

interface HomeProps {
  data: any[]; // Define el tipo de los datos según tu estructura
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  console.log('llegueeee')
  try {
    // Obtenemos la instancia de la base de datos
    const db = await run();
    
    // Accedemos a la colección una vez que la conexión se haya establecido
    const collection = db.collection('sample_mflix');
    
    // Obtenemos los datos de la colección
    const data = await collection.find().toArray();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: [],
      },
    };
  }
};

const Home: React.FC<HomeProps> = ({ data }) => {
  console.log('props', data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>
    </main>
  );
};

export default Home;