

function LandingBanner() {
  return (
    <div className="w-full flex flex-col items-center py-32 gap-6 bg-green-100">
        <h1 className="text-5xl font-bold">Take Control of Your Financial Future</h1>
        <h1 className="text-xl text-center px-72">Track expenses, manage budgets, and achieve your financial goals with our powerful and intuitive personal finance tracker.</h1>
        <div className="flex gap-4">
          <button className="bg-yellow-100 rounded-lg px-6 py-3">Get Started Free</button>
          <button className="bg-cyan-200 rounded-lg px-6 py-3">Watch Demo</button>
        </div>
    </div>
  )
}

export default LandingBanner
