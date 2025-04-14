import React from 'react';

const Footer = () => {
    return (
      <footer className='w-full bg-gray-800 mt-10 relative  text-white py-10 px-6'>
        <div className='max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {footerSections.map((section, index) => (
            <div key={index} className='transition-transform duration-300 hover:scale-105 hover:bg-gray-800 p-4 rounded-lg'>
              <h2 className='text-lg font-semibold mb-3'>{section.title}</h2>
              <ul className='text-gray-400 space-y-2'>
                {section.items.map((item, i) => (
                  <li key={i} className='hover:text-gray-200 cursor-pointer transition-colors duration-200'>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    );
  };

const footerSections = [
  {
    title: 'Frequently Asked Questions (FAQ)',
    items: [
      'How to place an order?',
      'How can I track my order?',
      'What payment methods are accepted?',
      'Can I modify or cancel my order?',
      'What should I do if my order is delayed or incorrect?'
    ]
  },
  {
    title: 'Contact Support',
    items: [
      'Customer support email',
      'Phone number (if applicable)',
      'Live chat option (if available)',
      'Social media links for support'
    ]
  },
  {
    title: 'Order Issues & Refunds',
    items: [
      'Steps to report a missing/wrong item',
      'Refund & cancellation policy',
      'How long does it take to get a refund?'
    ]
  },
  {
    title: 'Account & Login Help',
    items: [
      'How to reset your password',
      'How to change account details (email, phone number, address)',
      'How to delete your account'
    ]
  },
  {
    title: 'Delivery & Pickup Information',
    items: [
      'Estimated delivery times',
      'Areas covered for delivery',
      'How to schedule a pickup order'
    ]
  },
  {
    title: 'Accessibility Support',
    items: [
      'Features that help users with disabilities',
      'Screen reader-friendly navigation',
      'How to enable accessibility settings'
    ]
  },
  {
    title: 'Special Requests & Custom Orders',
    items: [
      'How to add special instructions to an order',
      'Dietary preferences & allergy information'
    ]
  }
];

export default Footer;
