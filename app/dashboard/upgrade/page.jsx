'use client'
import { useState } from 'react'
import { CheckCircle, CreditCard, Star } from 'lucide-react'

const UpgradePage = () => {
  const [selectedPlan, setSelectedPlan] = useState('basic')

  const plans = [
    {
      name: 'Basic Plan',
      price: '$19/month',
      features: ['Access to basic mock interviews', 'Limited question categories', 'Basic performance tracking'],
      icon: <Star className="text-yellow-500 w-8 h-8" />
    },
    {
      name: 'Pro Plan',
      price: '$49/month',
      features: ['Unlimited mock interviews', 'All question categories', 'Advanced performance analytics'],
      icon: <CreditCard className="text-indigo-500 w-8 h-8" />
    },
    {
      name: 'Premium Plan',
      price: '$99/month',
      features: ['Personalized coaching sessions', 'Priority support', 'Exclusive premium content'],
      icon: <CheckCircle className="text-green-500 w-8 h-8" />
    }
  ]

  return (
    <div className="py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Upgrade Your Plan</h1>
      
      <div className="text-center mb-12">
        <p className="text-lg">Choose the best plan that suits your needs and unlock premium features to enhance your interview preparation.</p>
      </div>

      <div className="flex justify-center gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            onClick={() => setSelectedPlan(plan.name.toLowerCase())}
            className={`p-6 border rounded-lg cursor-pointer w-64 text-center transition-all duration-300 
            ${selectedPlan === plan.name.toLowerCase() ? 'bg-indigo-100 border-indigo-500' : 'bg-white border-gray-300'}`}
          >
            <div className="flex justify-center mb-4">{plan.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <p className="text-lg font-bold mb-4">{plan.price}</p>
            <ul className="text-left space-y-2 mb-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all duration-300">
              Upgrade Now
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 text-sm">Already have an account? <a href="/login" className="text-indigo-600 hover:underline">Log in</a> to manage your subscription.</p>
      </div>
    </div>
  )
}

export default UpgradePage
