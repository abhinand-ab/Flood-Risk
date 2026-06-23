import API from "../services/api";

function Sidebar({ setRiskData, setUserLocation, setWeather, setShowContacts }) {

  const analyzeLocation = () => {
     
    console.log("Button clicked");

    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setUserLocation([lat, lng]);

        const weatherRes = await API.get(
          `/weather/${lat}/${lng}`
        );

        setWeather(weatherRes.data);

        try {

          const res = await API.post(
            "/zones/check-location",
            { lat, lng }
          );

          console.log(res.data);

          setRiskData(res.data);

        } catch (err) {
          console.error(err);
        }

      },
      (error) => {
        alert("Location access denied");
      }
    );
  };

  return (
   <div className="w-full lg:w-72 bg-black/30backdrop-blur-xl border-r border-white/10 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 lg:p-6">

      <h1 className="text-2xl font-bold">
       🌊 Flood Risk Intelligence System
      </h1>

      <div className="mt-8 space-y-4">

        <button
          onClick={analyzeLocation}
          className="w-full bg-blue-600 py-3 px-4 rounded-xl text-sm sm:text-base"
        >
          Analyze Location
        </button>

       <button
           onClick={() => setShowContacts(true)}
        className="w-full bg-slate-800 hover:bg-slate-700 p-4 rounded-xl transition"
       >
         Emergency Contacts
        </button>
      </div>
      <div className="absolute bottom-4 text-sm text-slate-200">
        Powered by OpenWeather • MongoDB Atlas • OpenStreetMap
    </div>
    </div>
    
  );
}

export default Sidebar;