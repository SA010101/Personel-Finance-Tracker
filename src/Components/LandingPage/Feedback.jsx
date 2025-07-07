

function Feedback() {
  return (
    <div className="w-full flex flex-col items-center py-16 gap-5 bg-amber-400">
        <h1 className="text-4xl font-bold py-5">What Our Users Say</h1>
        <div className="w-full flex gap-7 px-28">
          <div className="flex flex-col py-5 px-5 gap-5 rounded-lg bg-green-200">
            <div className="flex gap-3">
              <div className="bg-blue-400 w-12 h-12 rounded-[100%]"></div>
             <div className="flex flex-col gap-1">
                  <h1>Sarah Johnson</h1>
              <h1>Marketing Manager</h1>
             </div>
            </div>
            <h1>"This app completely changed how I manage my finances. I've saved over $3,000 in the first 6 months just by being more aware of my spending patterns."</h1>
          </div>
          
          <div className="flex flex-col py-5 px-5 gap-5 rounded-lg bg-green-200">
            <div className="flex gap-3">
              <div className="bg-pink-300 w-12 h-12 rounded-[100%]"></div>
             <div className="flex flex-col gap-1">
                  <h1>Sarah Johnson</h1>
              <h1>Marketing Manager</h1>
             </div>
            </div>
            <h1>"This app completely changed how I manage my finances. I've saved over $3,000 in the first 6 months just by being more aware of my spending patterns."</h1>
          </div>
         
        </div>
    </div>
  )
}

export default Feedback
