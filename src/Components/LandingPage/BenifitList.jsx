

function BenifitList() {
  return (
    <div className="w-full flex flex-col items-center py-20 gap-10">
        <h1 className="text-4xl font-bold">Everything You Need to Manage Your Money</h1>
        <div className="w-full flex justify-around px-28">
          <div className="flex flex-col items-center w-80 h-64 px-5 py-6 gap-5 rounded-lg bg-sky-600">
            <div>Icon</div>
            <h1 className="text-xl font-semibold">Expense Tracking</h1>
            <h1 className="text-center">Automatically categorize and track every transaction to understand where your money goes.</h1>
          </div>
          <div className="flex flex-col items-center w-80 h-64 px-5 py-6 gap-5 rounded-lg bg-sky-600">
            <div>Icon</div>
            <h1 className="text-xl font-semibold">Budget Management</h1>
            <h1 className="text-center">Set spending limits for different categories and get alerts when you're close to your budget.</h1>
          </div>
          <div className="flex flex-col items-center w-80 h-64 px-5 py-6 gap-5 rounded-lg bg-sky-600">
            <div>Icon</div>
            <h1 className="text-xl font-semibold">Financial Goals</h1>
            <h1 className="text-center">Set savings goals and track your progress with visual indicators and milestone celebrations.</h1>
          </div>
        </div>
    </div>
  )
}

export default BenifitList
