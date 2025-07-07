

function HowItWork() {
  return (
    <div className="w-full flex flex-col items-center py-16 gap-5 bg-amber-100">
        <h1 className="text-4xl font-bold">Get Started in 3 Simple Steps</h1>
        <div className="w-full flex justify-around px-28">
          <div className="flex flex-col items-center w-80 px-5 gap-5 rounded-lg">
            <div>1</div>
            <h1 className="text-xl font-semibold">Sign Up & Connect</h1>
            <h1 className="text-center">Create your account and securely connect your bank accounts or add transactions manually.</h1>
          </div>
          <div className="flex flex-col items-center w-80 px-5 gap-5 rounded-lg">
            <div>2</div>
            <h1 className="text-xl font-semibold">Set Your Budget</h1>
            <h1 className="text-center">Define your spending categories and set monthly budgets based on your financial goals.</h1>
          </div>
          <div className="flex flex-col items-center w-80 px-5 gap-5 rounded-lg">
            <div>3</div>
            <h1 className="text-xl font-semibold">Track & Achieve</h1>
            <h1 className="text-center">Monitor your spending, get insights, and watch as you achieve your financial milestones.</h1>
          </div>
        </div>
    </div>
  )
}

export default HowItWork
