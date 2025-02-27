import appDownload from '../assets/appDownload.png'
import landingImage from '../assets/landing.png'

function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <div className='flex flex-col gap-5 bg-white text-center -mt-16 rounded-lg shadow-md py-8'>
        <h1 className='text-5xl font-bold tracking-tight text-orange-600'>
          Tuck into a takeway today
        </h1>
        <span className='text-xl'>Food is just a click away!</span>
      </div>
      <div className='grid md:grid-cols-2 gap-5'>
        <img className='rounded-sm' src={landingImage} />
        <div className='flex flex-col items-center justify-center gap-4 text-center'>
          <span className='font-bold text-3xl tracking-tighter'>
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App from faster ordering and personalised recommendations
          </span>
          <img src={appDownload} />
        </div>
      </div>
    </div>
  )
}

export default HomePage;