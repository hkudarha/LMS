import banner from "../../../../public/background-removed (2).png";

function StudentHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="flex flex-col lg:flex-row items-center justify-between py-8 px-4 lg-px-8">
        <div className="lg:w-1/2 lg:pr-12">
          <h1 className="text-3xl font-bold mb-4">Learning that gets you</h1>
          <p>Skils for your present and your future. Get started with Us.</p>
        </div>
        <div className="lg:w-full mb-8 lg:mb-0">
           <img
            src={banner}
            width={600}
            height={400}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
      <section className="py-8 px-4 lg:px-8  bg-gray-100">
        <h2 className="text-2xl font-bold mb-6 ">Course Categories</h2>
        <div  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {
                
            }
        </div>
      </section>
    </div>
  );
}

export default StudentHomePage;
