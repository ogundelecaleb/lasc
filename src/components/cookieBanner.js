import posthog from 'posthog-js'
import { useState } from 'react'; // new

function CookieBanner() {
  const [showBanner, setShowBanner] = useState(true); // new
  
  const acceptCookies = () => { 
    posthog.opt_in_capturing();
    setShowBanner(false); // new
  };

  const declineCookies = () => {
    posthog.opt_out_capturing();
    setShowBanner(false); // new
  };

  return (
    <div>
      {showBanner && ( // new
        <div className='bg-[#124072] text-[white] px-6 py-4 rounded-md'>
          <p>
            We use tracking cookies to understand how you use the product 
            and help us improve it.
            Please accept cookies to help us improve.
          </p>
          <div className='flex items-center gap-5'>
          <button className='border border-[white] rounded-lg text-[white] px-3 py-2' type="button" onClick={acceptCookies}>
            Accept Cookies
          </button>
          <button className='border border-[white] rounded-lg text-[white] px-3 py-2' type="button" onClick={declineCookies}>
            Decline Cookies
          </button></div>
        </div>
      )}
    </div>
  );
}

export default CookieBanner;